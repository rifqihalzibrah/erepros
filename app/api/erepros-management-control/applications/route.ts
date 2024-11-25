import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const applications = await db.application.findMany({
            orderBy: {
                createdAt: 'desc', // Order by createdAt field in descending order
            },
        });

        return NextResponse.json(
            { message: 'Applications fetched successfully', data: applications },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching applications:', error);
        return NextResponse.json({ message: 'Failed to fetch applications' }, { status: 500 });
    }
}
