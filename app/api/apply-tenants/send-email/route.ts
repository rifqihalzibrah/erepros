import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import axios from "axios";

// Document interface for uploaded files
interface DocumentData {
    name: string;
    url: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Parse and validate the request body
        const applicationData: Record<string, unknown> = await req.json();

        // Validate required environment variables
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            throw new Error("SMTP credentials are missing in environment variables.");
        }

        // Destructure documents from request
        const { documents, ...otherData } = applicationData;

        // Fetch files from URLs and prepare attachments
        const attachments = await Promise.all(
            (documents as DocumentData[]).map(async (doc) => {
                const response = await axios.get(doc.url, { responseType: "arraybuffer" });
                return {
                    filename: doc.name, // Original filename
                    content: Buffer.from(response.data), // Attach file content
                };
            })
        );

        // Setup nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: ["rifqihalzibrahmuhammad@gmail.com"],
            subject: "New Rental Application Submitted",
            html: `
                <h1>New Rental Application Submitted</h1>
                <p>An application has been received with the following details:</p>
                ${generateHtmlBody(otherData)}
                <p>Please find the attached documents.</p>
            `,
            attachments,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json(
            { message: "Failed to send email", error: (error as Error).message },
            { status: 500 }
        );
    }
}

// Function to generate HTML body for the email
function generateHtmlBody(data: Record<string, unknown>): string {
    return `
        <ul>
            ${Object.entries(data)
            .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
            .join("")}
        </ul>
    `;
}
