import { buffer } from 'micro';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import db from '@/lib/db'; // Adjust path based on your structure
import { sendThankYouEmail } from '@/lib/email'; // Utility to send emails

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

export const config = {
    api: {
        bodyParser: false, // Necessary for Stripe to correctly handle the webhook event
    },
};

export async function POST(req: Request) {
    const sig = req.headers.get('stripe-signature')!;
    const buf = await buffer(req);

    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const applicationId = session.metadata.applicationId;

        // Update application status to 'paid' in the database
        await db.application.update({
            where: { id: parseInt(applicationId) },
            data: { paymentStatus: 'paid' },
        });

        // Send thank-you email to the user
        await sendThankYouEmail(applicationId);
    }

    return NextResponse.json({ received: true });
}