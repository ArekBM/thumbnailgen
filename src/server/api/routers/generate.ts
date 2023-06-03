import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs"
import AWS from 'aws-sdk';

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { Configuration, OpenAIApi } from "openai";
import { b64Image } from "~/data/b64img";

const s3 = new AWS.S3({
    credentials: {
        accessKeyId : env.ACCESS_KEY,
        secretAccessKey: env.SECRET_ACCESS_KEY,
    },
    region: 'us-west-1'
})

const BUCKET_NAME = 'thumbnail-gen'


const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateIcon(prompt: string) : Promise< string | undefined > {
    if(env.MOCK_KEY === 'true'){
        return b64Image
    } else {
        const response = await openai.createImage({
            prompt : prompt,
            n: 1,
            size: '1024x1024',
            response_format : 'b64_json'
          });
          return response.data.data[0]?.b64_json;
    }
}


export const generateRouter = createTRPCRouter({
    generateIcon: protectedProcedure
    .input(
        z.object({
            prompt: z.string(),
            color: z.string(),
            style: z.string()
        })
    )
    .mutation(async ({ ctx, input }) => {
        const { count } = await ctx.prisma.user.updateMany({
            where: {
                id: ctx.session.user.id,
                credits: {
                    gte: 1,
                },
            },
            data: {
                credits: {
                    decrement: 1,
                },
            },
        });

        if(count <= 0){
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Not enough credits'
            });
        }

        const finalPrompt = `${input.prompt} in ${input.color}, ${input.style}`

        const b64Img = await generateIcon(finalPrompt)

        const icon = await ctx.prisma.icon.create({
            data: {
                prompt: input.prompt,
                userId: ctx.session.user.id,
            }
        })

        await s3.putObject({
            Bucket: BUCKET_NAME,
            Body: Buffer.from(b64Img!, 'base64'),
            Key: icon.id,
            ContentEncoding: 'base64',
            ContentType: 'image/gif',
        }).promise();

        return {
            imageUrl: `https://${BUCKET_NAME}.s3.us-west-1.amazonaws.com/${icon.id}`
        }

    }),
});
