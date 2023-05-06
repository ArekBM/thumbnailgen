import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs"

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export const generateRouter = createTRPCRouter({
    generateIcon: protectedProcedure
    .input(
        z.object({
            prompt: z.string(),
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

        const response = await openai.createImage({
            prompt: 'cat eating pancakes',
            n: 1,
            size: '1024x1024',
        });

        const image_url = response.data.data[0]?.url;

        return {
            imageUrl : image_url,
        };
    }),
});
