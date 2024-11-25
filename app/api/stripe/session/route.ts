import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15', // Update to your Stripe API version
});

export async function GET(req: NextRequest) {
    // Extract the sessionId from the query parameters
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
        return NextResponse.json(
            { error: 'Missing sessionId parameter' },
            { status: 400 }
        );
    }

    try {
        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Optionally, you can include additional checks or data processing here

        // Return the session data to the frontend
        return NextResponse.json({ session });
    } catch (error: any) {
        console.error('Error fetching session:', error.message);
        return NextResponse.json(
            { error: 'Unable to retrieve session' },
            { status: 500 }
        );
    }
}
