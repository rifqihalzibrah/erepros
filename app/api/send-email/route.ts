import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // Parse incoming JSON data
    const body = await req.json();
    const { name, email, phone, message, property } = body;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // TLS for port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 1. Send Thank You Email to Submitter
    await transporter.sendMail({
      from: `"Erepros Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You for Your Application",
      text: `Hi ${name},\n\nThank you for applying for ${property.address}. We'll review it and respond soon.\n\nBest regards,\nErepros Team`,
    });

    // 2. Send Data to Billing Email
    await transporter.sendMail({
      from: `"Application Notification" <${process.env.SMTP_USER}>`,
      to: "marketing@tsusetech.com",
      subject: "New Property Application Received",
      text: `
New application received:

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}

Property Details:
- Address: ${property.address}
- Bedrooms: ${property.no_bedrooms}
- Size: ${property.total_area} Sq Ft

Erepros System`,
    });

    return NextResponse.json(
      { message: "Emails sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { message: "Failed to send emails." },
      { status: 500 }
    );
  }
}
