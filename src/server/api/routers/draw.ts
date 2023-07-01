import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
  } from "~/server/api/trpc";

import { z } from "zod";
import { env } from "~/env.mjs";
import Replicate from 'replicate'

const replicate = new Replicate({
    auth : env.REPLICATE_API_KEY
})

const image = ''
const prompt = ''

let on = false

async function drawPrompt(prompt: string) : Promise< [string, string] | unknown > {
    const output = (await replicate.run(
        'stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478',
        {
            input : {
                image,
                scale: 7,
                prompt,
                image_resolution: '512',
                n_prompt:
                    'Cat drawn by picasso'
            }
        }
        )) as [string, string];
        return output
}


export const drawRouter = createTRPCRouter({
    drawPrompt : protectedProcedure
    .input(
        z.object({
            prompt: z.string()
        })
    )
    .mutation(async ({ ctx, input }) => {
        
    })
})