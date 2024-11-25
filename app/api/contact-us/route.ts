import { NextResponse } from 'next/server';
import db from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    try {
        // Save submission to the database
        const newSubmission = await db.mail.create({
            data: {
                firstName,
                lastName,
                email,
                message,
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
            from: `"Contact Form" <${process.env.SMTP_USER}>`,
            to: 'rifqihalzibrahmuhammad@gmail.com',
            subject: 'New Contact Form Submission',
            text: `You have a new submission:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
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
