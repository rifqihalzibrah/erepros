import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const evaluations = await db.evaluation.findMany({
            orderBy: {
                createdAt: 'desc', // Order by createdAt field in descending order
            },
        });

        return NextResponse.json(
            { message: 'Evaluations fetched successfully', data: evaluations },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching evaluations:', error);
        return NextResponse.json({ message: 'Failed to fetch evaluations' }, { status: 500 });
    }
}
