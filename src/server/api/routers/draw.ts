// import {
//     createTRPCRouter,
//     publicProcedure,
//     protectedProcedure,
//   } from "~/server/api/trpc";

// import { z } from "zod";
// import Replicate from 'replicate'
// import AWS from 'aws-sdk';
// import { env } from '~/env.mjs'

// const s3 = new AWS.S3({
//     credentials: {
//         accessKeyId : env.ACCESS_KEY,
//         secretAccessKey: env.SECRET_ACCESS_KEY,
//     },
//     region: 'us-west-1'
// })

// const BUCKET_NAME = 'thumbnail-gen'



// const replicate = new Replicate({
//     auth : env.REPLICATE_API_KEY
// })

// async function drawPrompt(prompt: string, image: string) {
//     const output = (await replicate.run(
//         'jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117',
//         {
//             input : {
//                 image : image,
//                 scale: 7,
//                 prompt: prompt,
//                 image_resolution: '512',
//             }
//         }
//     )
//     ) 
//     return output
// }


// export const drawRouter = createTRPCRouter({
//     drawPrompt : protectedProcedure
//     .input(
//         z.object({
//             prompt: z.string(),
//             image: z.string(),
//         })
//     )
//     .mutation(async ({ input }) => {

//         const finalPrompt = input.prompt

//         const finalImage = input.image

//         const drawing = await drawPrompt(finalPrompt, finalImage)

//         return {
//             drawing : `${drawing}`
//         }
//     })


// })