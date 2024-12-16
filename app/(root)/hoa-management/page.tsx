"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils"; // Classname utility function
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  hearAbout: z.string().min(1, "This field is required"),
  type: z.string().min(1, "HOA type is required"),
  address: z.string().min(1, "HOA address is required"),
  occupancyStatus: z.string().min(1, "Occupancy status is required"),
  numberUnits: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 1000, {
      message: "Number of units must be between 1 and 1000",
    }),
  unitMix: z.string().min(1, "Unit mix is required"),
  grossIncome: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Gross monthly income is required",
    }),
  desiredServices: z.string().min(1, "Desired services is required"),
  startDate: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Invalid date",
  }),
  additionalInfo: z.string().optional(),
});

// Infer the type for FormValues
type FormValues = z.infer<typeof formSchema>;

const HOAManagement = () => {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      hearAbout: "",
      type: "",
      address: "",
      occupancyStatus: "",
      numberUnits: 0,
      unitMix: "",
      grossIncome: 0,
      desiredServices: "",
      startDate: undefined,
      additionalInfo: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/hoa-management", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          startDate: values.startDate ? values.startDate.toISOString() : null,
        }),
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
          result.message || "Your request has been sent successfully!",
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

  // Animation state and refs
  const [isSection1Visible, setIsSection1Visible] = useState(false);
  const [isSection2Visible, setIsSection2Visible] = useState(false);
  const [isSection3Visible, setIsSection3Visible] = useState(false);

  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  const observeSection = (
    ref: React.RefObject<HTMLDivElement>,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  };

  useEffect(() => {
    const cleanup1 = observeSection(section1Ref, setIsSection1Visible);
    const cleanup2 = observeSection(section2Ref, setIsSection2Visible);
    const cleanup3 = observeSection(section3Ref, setIsSection3Visible);

    return () => {
      cleanup1();
      cleanup2();
      cleanup3();
    };
  }, []);

  return (
    <div className="pt-[136px] bg-white">
      {/* Side-by-Side Header and Content with Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Text Section */}
        <section
          ref={section1Ref}
          className={`py-6 transition-all duration-1000 transform ${
            isSection1Visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <div className="text-justify">
            <h1 className="text-4xl text-gold font-marcellus uppercase mb-4">
              HOA Management
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Elite Real Estate Professionals is dedicated to providing
              resources that promote a better understanding of townhome,
              condominium, and single-family homeowner associations throughout
              Michigan.
            </p>
            <h2 className="text-xl font-semibold text-gold mb-4">
              Why Is There A Need For Professional Association Management?
            </h2>
            <p className="text-gray-700 mb-6">
              However, the effective management of these amenities and services
              requires dedicated oversight. While HOA board members shoulder
              many responsibilities, the demands of community management can
              often exceed their available time and expertise.
            </p>
            <p className="text-gray-700 mb-6">
              Living within an HOA community offers numerous benefits. Residents
              gain access to shared amenities such as pools, clubhouses, and
              fitness centers, alongside convenient services like common area
              maintenance, trash removal, and landscaping.
            </p>
          </div>
        </section>

        {/* Image Section */}
        <section
          ref={section2Ref}
          className={`py-6 transition-all duration-1000 transform ${
            isSection2Visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-thelazyartist-1642125-scaled.jpg?alt=media&token=c8b8c80c-8de5-48c6-b39f-e028fd84c31f" // Replace with the actual image path
              alt="HOA Community"
              className="rounded-lg shadow-lg object-cover h-[600px] w-full"
            />
          </div>
        </section>
      </div>

      {/* Services Section */}
      <section
        ref={section3Ref}
        className={`py-6 transition-all duration-1000 transform ${
          isSection3Visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="text-2xl text-gold mb-6 text-left font-marcellus uppercase">
            Elite Real Estate Professionals Can Provide a Range of Essential
            Services:
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-justify">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Resolving disputes between owners</li>
              <li>Facilitating communication with residents</li>
              <li>
                Collecting dues and assessments, even pursuing unpaid balances
              </li>
              <li>Crafting and managing the association&apos;s budget</li>
              <li>Ensuring the upkeep of common areas</li>
            </ul>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Cultivating and managing vendor relationships</li>
              <li>Addressing homeowner concerns promptly</li>
              <li>Coordinating service requests and repairs</li>
              <li>
                These services streamline operations and foster a harmonious
                living environment for residents.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <div className="justify-center flex p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gold hover:bg-[#725836]">Get Quote</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] h-[80vh]">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">
                HOA MANAGEMENT QUOTE REQUEST
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4 p-4 overflow-y-auto max-h-[60vh]"
              >
                <DialogDescription className="text-center text-sm text-gray-600">
                  Your Contact Info
                </DialogDescription>

                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name (First & Last)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Where did you hear about us? */}
                <FormField
                  control={form.control}
                  name="hearAbout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Where did you hear about us?</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="-- Please select --" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="google-ad">
                                Google Ad
                              </SelectItem>
                              <SelectItem value="biggerpockets">
                                BiggerPockets
                              </SelectItem>
                              <SelectItem value="agent-referral">
                                Agent Referral
                              </SelectItem>
                              <SelectItem value="owner-referral">
                                Owner Referral
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogDescription className="text-center text-sm text-gray-600">
                  Your Rental HOA Information
                </DialogDescription>

                {/* HOA Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HOA Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="-- Please select --" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="hoa">HOA</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* HOA Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HOA Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter hoa address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Occupancy Status */}
                <FormField
                  control={form.control}
                  name="occupancyStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupancy Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="-- Please select --" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="vacant">Vacant</SelectItem>
                              <SelectItem value="occupied-by-owner">
                                Occupied by Owner
                              </SelectItem>
                              <SelectItem value="occupied-by-tenant">
                                Occupied by Tenant(s)
                              </SelectItem>
                              <SelectItem value="repositioning">
                                Multifamily, occupancy under 90% (Repositioning)
                              </SelectItem>
                              <SelectItem value="stabilized">
                                Multifamily, occupancy over 90% (Stabilized)
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Number of Units */}
                <FormField
                  control={form.control}
                  name="numberUnits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Units</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter number of units"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Unit Mix/Types */}
                <FormField
                  control={form.control}
                  name="unitMix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Mix/Types</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter unit mix/types" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gross Monthly Income */}
                <FormField
                  control={form.control}
                  name="grossIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gross Monthly Income</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter gross monthly income"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogDescription className="text-center text-sm text-gray-600">
                  Management Services
                </DialogDescription>

                {/* Desired Services */}
                <FormField
                  control={form.control}
                  name="desiredServices"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Services</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="-- Please select --" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="monthly-management">
                                Full Service
                              </SelectItem>
                              <SelectItem value="leasing-only">
                                Leasing Only
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Desired Start Date */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Desired Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select Date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              form.trigger("startDate");
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Additional Information */}
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter any additional information here"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="px-6 py-2 bg-[#bfaf9e] text-white hover:bg-[#7b5c36]"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HOAManagement;
