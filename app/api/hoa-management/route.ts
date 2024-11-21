import { NextResponse } from 'next/server';
import db from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Extract form data from the request body
        const {
            name,
            email,
            phone,
            hearAbout,
            hoaType,
            hoaAddress,
            occupancyStatus,
            numberUnits,
            unitMix,
            grossIncome,
            desiredServices,
            startDate,
            additionalInfo,
        } = body;

        // Validate required fields
        if (!name || !email || !phone) {
            return NextResponse.json(
                { message: 'Name, email, and phone are required fields.' },
                { status: 400 }
            );
        }

        // Save submission to the database
        const newSubmission = await db.management.create({
            data: {
                name,
                email,
                phone,
                hearAbout,
                hoaType,
                hoaAddress,
                occupancyStatus,
                numberUnits,
                unitMix,
                grossIncome,
                desiredServices,
                startDate,
                additionalInfo,
            },
        });

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // Use TLS
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email options
        const mailOptions = {
            from: `"HOA Form" <${process.env.SMTP_USER}>`,
            to: 'rifqihalzibrahmuhammad@gmail.com',
            subject: 'New HOA Form Submission',
            text: `You have a new HOA submission:\n
            Name: ${name}\n
            Email: ${email}\n
            Phone: ${phone}\n
            Where they heard about us: ${hearAbout || 'N/A'}\n
            HOA Type: ${hoaType || 'N/A'}\n
            HOA Address: ${hoaAddress || 'N/A'}\n
            Occupancy Status: ${occupancyStatus || 'N/A'}\n
            Number of Units: ${numberUnits || 'N/A'}\n
            Unit Mix: ${unitMix || 'N/A'}\n
            Gross Income: ${grossIncome || 'N/A'}\n
            Desired Services: ${desiredServices || 'N/A'}\n
            Start Date: ${startDate || 'N/A'}\n
            Additional Info: ${additionalInfo || 'N/A'}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond with success message
        return NextResponse.json(
            { message: 'Form submitted successfully!', data: newSubmission },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error handling form submission:', error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
