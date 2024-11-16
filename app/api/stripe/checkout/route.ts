import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-10-28.acacia' });

export async function POST(req: Request) {
    try {
        const { applicationId, fee } = await req.json();

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: 'Application Fee' },
                        unit_amount: fee * 100, // Stripe expects amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
            metadata: { applicationId }, // Store application ID as metadata
        });

        // Return session ID to the frontend
        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}