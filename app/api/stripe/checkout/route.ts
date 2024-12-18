import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-11-20.acacia' });
export async function POST(req: Request) {
    try {
        const { applicationId, propertyId, email, fullName, address, bedrooms, moveInDate, fee } = await req.json();

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
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}&email=${email}&full_name=${fullName}&address=${address}&bedrooms=${bedrooms}&move_in_date=${moveInDate}&fee=${fee}&property_id=${propertyId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/apply-tenants?property_id=${propertyId}&address=${address}bedrooms=${bedrooms}`,
            metadata: {
                applicationId: applicationId.toString(), // Ensure it's a string
            },
            payment_intent_data: {
                metadata: {
                    applicationId: applicationId.toString(),
                },
            },
        });

        // Return session ID to the frontend
        return NextResponse.json({ sessionId: session.id });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            // Handle other types of errors
        }
    }
}