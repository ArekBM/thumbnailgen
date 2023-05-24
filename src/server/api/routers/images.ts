import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs"
import AWS from 'aws-sdk';

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


export const imagesRouter = createTRPCRouter({
    getImages: protectedProcedure

    .query( async ({ ctx }) => {
        const images = await ctx.prisma.icons.findMany({
            where: {
                userId: ctx.session.user.id,
            },
        })
        return images
        
    }),
});
