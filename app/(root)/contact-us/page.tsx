"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactUs: React.FC = () => {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorResult = await res
          .json()
          .catch(() => ({ message: "An error occurred" }));
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
        description:
          result.message || "Your message has been sent successfully!",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="pt-[136px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto">
          {/* Left Section */}
          <div className="w-full md:w-1/2 p-8 flex flex-col items-center md:items-start lg:order-1 order-2">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-tatianasyrikova-3975590-1024x683.jpg?alt=media&token=6813da01-9a30-424c-b9eb-d9c66afe4e3b"
              alt="Contact Us Image"
              width={400}
              height={250}
              priority
            />
            <div className="text-center md:text-left mt-6 ">
              <h3 className="text-lg font-marcellus text-gold mb-2">
                ELITE REAL ESTATE & PROFESSIONAL MANAGEMENT
              </h3>
              <p className="text-gray-600 mb-1">(810) 715-5486</p>
              <p className="text-gray-600 mb-1">info@erepros.com</p>
              <p className="text-gray-600">
                5349 Fenton Rd, Grand Blanc MI 48507
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 p-8 lg:order-2 order-1">
            <h2 className="text-2xl font-marcellus text-gold mb-4">
              CONTACT US
            </h2>
            <p className="text-gray-600 mb-6 text-justify">
              Looking to buy, sell, or simply curious about real estate in
              Michigan? Sign up below for our monthly market updates or schedule
              a chat with us. We cover rentals, property management, real
              estate, and HOA services. We look forward to hearing from you!
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="flex space-x-4">
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your Message"
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full p-3 bg-gold text-white rounded hover:bg-[#725836] transition-colors"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
