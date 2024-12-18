"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BackgroundLines } from "@/components/ui/background-lines";
import { CheckCircleIcon } from "lucide-react";

export const dynamic = "force-dynamic"; // Ensure this page is rendered dynamically

export default function Success() {
    const [countdown, setCountdown] = useState(10);
    const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const email = searchParams.get('email');
    const fullName = searchParams.get('full_name');
    const address = searchParams.get('address');
    const bedrooms = searchParams.get('bedrooms');
    const moveInDate = searchParams.get('move_in_date');
    const fee = searchParams.get('fee');
    const propertyId = searchParams.get('property_id');

    useEffect(() => {
        async function verifyPayment() {
            if (sessionId) {
                const response = await fetch('/api/stripe/verify-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId }),
                });
                const data = await response.json();

                if (response.ok) {
                    setVerificationStatus('success');

                    const emailResponse = await fetch("/api/success-email", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: email,
                            fullName: fullName,
                            address: address,
                            bedrooms: bedrooms,
                            moveInDate: moveInDate,
                            fee: fee,
                            propertyId: propertyId
                        }),
                    });

                    if (!emailResponse.ok)
                        throw new Error("Failed to send confirmation email");
                    console.log("Confirmation email sent.");
                } else {
                    console.error('Payment verification failed:', data.error);
                    setVerificationStatus('failed');
                }
            }
        }
        verifyPayment();
    }, [sessionId]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0)); // Ensure countdown stops at 0
        }, 1000);

        const timeout = setTimeout(() => {
            router.push("/");
        }, 10000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [router]);

    return (
        <BackgroundLines className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black pt-[136px]">
            <div className="absolute inset-0 bg-gradient-radial from-green-400/20 via-transparent to-transparent pointer-events-none"></div>
            <div className="relative flex flex-col items-center text-center px-6 py-12 space-y-8 max-w-2xl">
                <div className="bg-green-500/10 rounded-full p-6">
                    <CheckCircleIcon className="w-20 h-20 md:w-28 md:h-28 text-green-500" />
                </div>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white bg-clip-text bg-gradient-to-r from-green-600 to-teal-400 font-marcellus">
                    Thank You!
                </h2>

                {verificationStatus === 'success' ? (
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-prose">
                        Your payment has been confirmed! Please check your email for further details. We&apos;re excited to assist you.
                    </p>
                ) : verificationStatus === 'failed' ? (
                    <p className="text-lg md:text-xl lg:text-2xl text-red-600 dark:text-red-400 max-w-prose">
                        There was an issue confirming your payment. Please contact support.
                    </p>
                ) : (
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-prose">
                        Verifying your payment...
                    </p>
                )}

                <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400">
                    Redirecting you to the homepage in <span className="font-bold">{countdown}</span> seconds...
                </p>

                <button
                    className="mt-6 px-8 py-3 bg-gold hover:bg-[#725836] text-white font-medium rounded-lg shadow-lg transition duration-300"
                    onClick={() => router.push("/")}
                >
                    Back to Home
                </button>
            </div>
        </BackgroundLines>
    );
}
