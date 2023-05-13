import { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';
import { env } from '~/env.mjs'
import { buffer } from "micro";
import { prisma } from "~/server/db";

const stripe = new Stripe(env.NEXT_SECRET_STRIPE_KEY, {
    apiVersion: '2022-11-15'
})

export const config = {
    api: {
        bodyParser: false
    }
}

const webhook = async (request: NextApiRequest, response: NextApiResponse) => {
    if(request.method === 'POST'){
        const buf = await buffer(request)
        const sig = request.headers['stripe-signature'] as string;
        let event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            let message = 'Unkown Error'
            if(err instanceof Error ) message = err.message
            response.status(400).send(`Webhook Error: ${message}`);
            return;
        }
        switch (event.type) {
            case 'checkout.session.completed':
              const completedEvent = event.data.object as {
                id: string,
                metadata: {
                    userId: string
                }
              };
              await prisma.user.update({
                where: {
                    id: completedEvent.metadata.userId,
                },
                data: {
                    credits: {
                        increment: 100
                    }
                }
              })
              // Then define and call a function to handle the event checkout.session.completed
              break;
            // ... handle other event types
            default:
              console.log(`Unhandled event type ${event.type}`);
          }

          response.json({response: true})

    } else {
        response.setHeader('Allow', 'POST')
        response.status(405).end('Method Not Allowed')
    }
}

export default webhook