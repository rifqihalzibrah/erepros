import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const mails = await db.mail.findMany({
            orderBy: {
                createdAt: 'desc', // Order by createdAt field in descending order
            },
        });

        return NextResponse.json(
            { message: 'Mails fetched successfully', data: mails },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching mails:', error);
        return NextResponse.json({ message: 'Failed to fetch mails' }, { status: 500 });
    }
}
