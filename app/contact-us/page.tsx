'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Image from "next/image";

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });
    const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/contact-us', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorResult = await res.json().catch(() => ({ message: 'An error occurred' }));
                toast({
                    title: "Error",
                    description: errorResult.message,
                    variant: "destructive",
                });
                return;
            }

            const result = await res.json();
            toast({
                title: "Success",
                description: result.message || "Your message has been sent successfully!",
            });
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred. Please try again later.",
                variant: "destructive",
            });
            console.error('Submission error:', error);
        }
    };

    return (
        <div className="pt-[136px] bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto">
                    {/* Left Section */}
                    <div className="w-full md:w-1/2 p-8 flex flex-col items-center md:items-start">
                        <Image
                            src="https://erepros.com/wp-content/uploads/2024/08/pexels-tatianasyrikova-3975590-1024x683.jpg"
                            alt="Contact Us Image"
                            width={400}
                            height={250}
                            priority
                        />
                        <div className="text-center md:text-left mt-6">
                            <h3 className="text-lg font-marcellus text-gold mb-2">
                                ELITE REAL ESTATE & PROFESSIONAL MANAGEMENT
                            </h3>
                            <p className="text-gray-600 mb-1">(810) 715-5486</p>
                            <p className="text-gray-600 mb-1">info@erepros.com</p>
                            <p className="text-gray-600">5349 Fenton Rd, Grand Blanc MI 48507</p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-1/2 p-8">
                        <h2 className="text-2xl font-marcellus text-gold mb-4">CONTACT US</h2>
                        <p className="text-gray-600 mb-6 text-justify">
                            Looking to buy, sell, or simply curious about real estate in Michigan? Sign up below for our monthly market updates or schedule a chat with us. We cover rentals, property management, real estate, and HOA services. We look forward to hearing from you!
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                                    rows={4}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full p-3 bg-gold text-white rounded hover:bg-[#725836] transition-colors"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
