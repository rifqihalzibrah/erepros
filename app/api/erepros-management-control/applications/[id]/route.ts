import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(
    req: Request,
    context: { params: { id: string } } // Destructure params correctly
) {
    try {
        const { id } = context.params; // Access params.id correctly

        if (!id) {
            return NextResponse.json(
                { message: 'Application ID is required' },
                { status: 400 }
            );
        }

        // Fetch the application and related tables
        const application = await db.application.findUnique({
            where: {
                id: parseInt(id, 10), // Ensure the ID is parsed as an integer
            },
            include: {
                references: true, // Include related data from 'reference' table
                others: true, // Include related data from 'other' table
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
                    references: application.references, // Related references
                    others: application.others, // Related others
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
