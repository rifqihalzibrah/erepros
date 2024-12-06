import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(
    req: Request,
    { params }: { params: { id: string } } // Correctly destructure params
) {
    try {
        const { id } = params; // Access id from params

        if (!id) {
            return NextResponse.json(
                { message: 'Application ID is required' },
                { status: 400 }
            );
        }

        const application = await db.application.findUnique({
            where: {
                id: parseInt(id, 10),
            },
            include: {
                references: true,
                others: true,
            },
        });

        if (!application) {
            return NextResponse.json(
                { message: 'Application not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: 'Application fetched successfully',
                data: {
                    ...application,
                    references: application.references,
                    others: application.others,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching application:', error);
        return NextResponse.json(
            { message: 'Failed to fetch application' },
            { status: 500 }
        );
    }
}
