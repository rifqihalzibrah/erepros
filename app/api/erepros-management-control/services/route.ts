import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const services = await db.service.findMany({
            orderBy: {
                createdAt: 'desc', // Order by createdAt field in descending order
            },
        });

        return NextResponse.json(
            { message: 'Services fetched successfully', data: services },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ message: 'Failed to fetch services' }, { status: 500 });
    }
}
