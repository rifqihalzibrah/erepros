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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils"; // Classname utility function
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  hearAbout: z.string().min(1, "This field is required"),
  type: z.string().min(1, "Property type is required"),
  address: z.string().min(1, "Property address is required"),
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

type FormValues = z.infer<typeof formSchema>;

const Pricing = () => {
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
      const res = await fetch("/api/pricing", {
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

  return (
    <div className="pt-[136px] bg-white">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-3xl font-semibold text-gold font-marcellus uppercase mb-8">
          Property Management Pricing & Services
        </h1>

        {/* Table Header */}
        <div className="grid grid-cols-4 bg-[#9A7648] text-white font-semibold">
          <div></div>
          <div className="p-4 border-l border-[#9A7648]">Standard Fee</div>
          <div className="p-4 border-l border-[#9A7648]">Flat Fee</div>
          <div className="p-4 border-l border-[#9A7648]">Placement Only</div>
        </div>

        {/* Table Rows */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Monthly Management Fee
          </div>
          <div className="p-4 bg-white border-l border-t border-[#9A7648]">
            10% Management Fee
          </div>
          <div className="p-4 bg-white border-l border-t border-[#9A7648]">
            $100 Management Fee
          </div>
          <div className="p-4 bg-white border-l border-t border-r border-[#9A7648]">
            N/A
          </div>
        </div>

        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Tenant Placement Fee
          </div>
          <div className="p-4 bg-white border-l border-t border-[#9A7648]">
            50% of 1st Month&apos;s Rent
          </div>
          <div className="p-4 bg-white border-l border-t border-[#9A7648]">
            75% of 1st Month&apos;s Rent
          </div>
          <div className="p-4 bg-white border-l border-t border-r border-[#9A7648]">
            100% of 1st Month&apos;s Rent
          </div>
        </div>

        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Lease Renewal Fee
          </div>
          <div className="p-4 bg-white border-l border-t border-[#9A7648]">
            FREE
          </div>
          <div className="p-4 bg-white border-l border-t border-[#9A7648]">
            FREE
          </div>
          <div className="p-4 bg-white border-l border-t border-r border-[#9A7648]">
            N/A
          </div>
        </div>

        {/* Row with Checkmarks */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Rent Assessment
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>
        {/* Row for "Rent Assessment" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Rent Assessment
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>

        {/* Row for "Marketing the Property" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Marketing the Property
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>

        {/* Row for "Finding Tenants" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Finding Tenants
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>

        {/* Row for "Tenant Screening" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Tenant Screening
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>

        {/* Row for "Pet Screening" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Pet Screening
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>

        {/* Row for "Full Legal Compliance" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Full Legal Compliance
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9A7648"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
                stroke="#9A7648"
              />
            </svg>
          </div>
        </div>
        {/* Row for "Property Maintenance" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Property Maintenance
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Rent Payment and Collections" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Rent Payment and Collections
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Eviction Process Handling" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Eviction Process Handling
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Property Accounting and Reporting" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Property Accounting and Reporting
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>
        {/* Row for "Owner and Tenant Portals" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Owner and Tenant Portals
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Filter Replacement Program" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Filter Replacement Program
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Pet Guarantee" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Pet Guarantee
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Maintenance Guarantee" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Maintenance Guarantee
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Leasing Guarantee" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Leasing Guarantee
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>
        {/* Row for "Property Inspections" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Property Inspections
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Lease Renewal Included" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Lease Renewal Included
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Bill Pay - Utilities" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-[#9A7648]">
            Bill Pay - Utilities
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Row for "Bill Pay - Taxes" */}
        <div className="grid grid-cols-4 text-gray-700">
          <div className="p-4 bg-gray-100 border-l border-t border-b border-[#9A7648]">
            Bill Pay - Taxes
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-b border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <circle cx="12" cy="12" r="10" stroke="#9A7648" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-b border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
          <div className="p-4 bg-white flex justify-center items-center border-l border-t border-b border-r border-[#9A7648]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-[#9A7648]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" stroke="#9A7648" />
            </svg>
          </div>
        </div>

        {/* Add more rows as needed */}
      </div>

      <div className="justify-center flex p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gold hover:bg-[#725836]">Get Quote</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] h-[80vh]">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">
                PROPERTY MANAGEMENT QUOTE REQUEST
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
                              <SelectItem value="google-ad">Google Ad</SelectItem>
                              <SelectItem value="biggerpockets">BiggerPockets</SelectItem>
                              <SelectItem value="agent-referral">Agent Referral</SelectItem>
                              <SelectItem value="owner-referral">Owner Referral</SelectItem>
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
                  Your Rental Property Information
                </DialogDescription>

                {/* Property Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
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
                              <SelectItem value="apartment-16">
                                Apartment (16+ Units)
                              </SelectItem>
                              <SelectItem value="apartment-45">
                                Apartment (4-5 Units)
                              </SelectItem>
                              <SelectItem value="triplex">Triplex</SelectItem>
                              <SelectItem value="duplex">Duplex</SelectItem>
                              <SelectItem value="condo">Condo</SelectItem>
                              <SelectItem value="townhouse">Townhouse</SelectItem>
                              <SelectItem value="single-family-home">
                                Single Family Home
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Property Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter property address"
                          {...field}
                        />
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
                              <SelectItem value="leasing-only">Leasing Only</SelectItem>
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
                    className="px-6 py-2 bg-[#9A7648] text-white hover:bg-[#7b5c36]"
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

export default Pricing;
