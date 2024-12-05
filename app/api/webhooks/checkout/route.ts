// // app/api/stripe/webhook/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';
// import db from '@/lib/db';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion: '2022-11-15',
// });

// export async function POST(req: NextRequest) {
//     const sig = req.headers.get('stripe-signature');
//     const body = await req.text(); // Important: Get raw body as text

//     let event: Stripe.Event;

//     try {
//         event = stripe.webhooks.constructEvent(
//             body,
//             sig!,
//             process.env.STRIPE_WEBHOOK_SECRET!
//         );
//     } catch (err: any) {
//         console.error('Webhook signature verification failed:', err.message);
//         return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
//     }

//     // Handle the event
//     switch (event.type) {
//         case 'checkout.session.completed':
//             await handleCheckoutSessionCompleted(event);
//             break;
//         // Add other event types if needed
//         default:
//             console.warn(`Unhandled event type: ${event.type}`);
//     }

//     return NextResponse.json({ received: true });
// }

// async function handleCheckoutSessionCompleted(event: Stripe.Event) {
//     const session = event.data.object as Stripe.Checkout.Session;

//     const applicationId = session.metadata?.applicationId;

//     if (!applicationId) {
//         console.error('No applicationId found in session metadata.');
//         return;
//     }

//     // Retrieve the PaymentIntent
//     const paymentIntentId = session.payment_intent as string;
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     if (paymentIntent.status === 'succeeded') {
//         // Update the application in your database
//         await db.application.update({
//             where: { id: parseInt(applicationId) },
//             data: {
//                 paymentStatus: 'paid',
//                 stripePaymentId: paymentIntentId,
//             },
//         });
//     } else {
//         console.warn(
//             `PaymentIntent ${paymentIntentId} status is ${paymentIntent.status}`
//         );
//     }
// }
