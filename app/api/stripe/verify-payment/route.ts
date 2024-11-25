import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import db from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});

export async function POST(req: NextRequest) {
    try {
        const { sessionId } = await req.json();

        if (!sessionId) {
            return NextResponse.json(
                { error: 'Missing sessionId parameter' },
                { status: 400 }
            );
        }

        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Ensure the payment was successful
        if (session.payment_status === 'paid') {
            const applicationId = session.metadata?.applicationId;

            if (!applicationId) {
                return NextResponse.json(
                    { error: 'Application ID not found in session metadata' },
                    { status: 400 }
                );
            }

            // Update the payment status in your database
            await db.application.update({
                where: { id: parseInt(applicationId) },
                data: {
                    paymentStatus: 'paid',
                    stripePaymentId: session.payment_intent as string,
                },
            });

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { error: 'Payment not successful' },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error('Error verifying payment:', error.message);
        return NextResponse.json(
            { error: 'Unable to verify payment' },
            { status: 500 }
        );
    }
}