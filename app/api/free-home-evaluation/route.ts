import { NextResponse } from 'next/server';
import db from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    const { fullName, email, phone, address, consent } = await req.json();

    // Validate the required fields
    if (!fullName || !email || !phone || !address || !consent) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    try {
        // Save submission to the database
        const newSubmission = await db.Evaluation.create({
            data: {
                fullName,
                email,
                phone,
                address,
                consent,
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
            from: `"Home Evaluation Form" <${process.env.SMTP_USER}>`,
            to: 'rifqihalzibrahmuhammad@gmail.com',
            subject: 'New Home Evaluation Submission',
            text: `You have a new home evaluation submission:\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Submission successful', data: newSubmission },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Failed to submit form' }, { status: 500 });
    }
}
