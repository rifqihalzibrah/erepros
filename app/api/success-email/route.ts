import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { email, fullName, address, bedrooms, moveInDate, fee, propertyId } = await req.json();

        if (!email || !fullName || !moveInDate || !address || !bedrooms || !fee || !propertyId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Setup nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail", // Replace with your email service
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Define email options
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Application Submitted Successfully",
            html: `
                <h1>Thank You, ${fullName}!</h1>
                <p>Your application for <strong>${propertyId}</strong> has been submitted successfully.</p>
                <p>Details:</p>
                <ul>
                    <li><strong>Bedrooms:</strong> ${bedrooms}</li>
                    <li><strong>Move-in Date:</strong> ${new Date(moveInDate).toLocaleDateString()}</li>
                    <li><strong>Fee:</strong> $${fee}</li>
                </ul>
                <p>We will review your application and get back to you soon.</p>
                <p>Best Regards,<br/>The Property Management Team</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error: unknown) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { message: "Failed to send email", error: (error as Error).message },
            { status: 500 }
        );
    }
}
