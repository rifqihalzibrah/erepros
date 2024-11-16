"use client"

import { storage } from "@/lib/firebaseConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { loadStripe } from '@stripe/stripe-js';

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
    // Step 1: Rental Application
    property_id: z.string(),
    address: z.string(),
    bedrooms: z.string(),
    move_in_date: z.date(),
    fee: z.coerce.number(),
    transaction_method: z.string().min(1, "Transaction method is required"),
    // Step 2: Personal Information
    full_name: z.string().min(1, "Full Name is required"),
    birthday: z.date(),
    ssn: z.string().min(4, "SSN must be at least 4 characters"),
    phone: z.string().min(1, "Phone number is required"),
    license_id: z.string().min(1, "License ID is required"),
    state: z.string().min(1, "State is required"),
    email: z.string().email("Invalid email address"),
    current_address: z.string().min(1, "Current Address is required"),
    date_of_move_in: z.date(),
    rent_amount: z.coerce.number(),
    reason_for_moving: z.string().min(1, "Reason for moving is required"),
    landlord_name: z.string().min(1, "Landlord Name is required"),
    landlord_phone: z.string().min(1, "Landlord Phone is required"),
    // Step 3: Others Living in the Unit
    others: z.array(
        z.object({
            name: z.string().min(1, "Name is required"),
            birthday: z.date(),
            ssn_last4: z.string().min(1, "SSN is required"),
            relationship: z.string().min(1, "Relationship is required"),
        })
    ),
    // Step 4: Pet Information
    pets: z.array(z.string()),
    how_many_pets: z.coerce.number().optional(),
    // Step 5: Financial Information
    employer: z.string().min(1, "Employer is required"),
    job_title: z.string().min(1, "Job Title is required"),
    employer_address: z.string().min(1, "Employer Address is required"),
    contact_phone: z.string().min(1, "Contact Phone is required"),
    supervisor_name: z.string().min(1, "Supervisor Name is required"),
    start_date: z.date(),
    income: z.coerce.number(),
    assistance_received: z.enum(["Yes", "No"]),
    assistance_amount: z.coerce.number().optional(),
    additional_income: z.enum(["Yes", "No"]),
    additional_income_amount: z.coerce.number().optional(),
    // Step 6: Personal References
    references: z.array(
        z.object({
            name: z.string(),
            phone: z.string(),
            relationship: z.string(),
        })
    ),
    eviction: z.enum(["Yes", "No"]),
    refused_rent: z.enum(["Yes", "No"]),
    refused_rent_explanation: z.string().optional(),
    felony: z.enum(["Yes", "No"]),
    felony_explanation: z.string().optional(),
    judgment: z.enum(["Yes", "No"]),
    judgment_explanation: z.string().optional(),
    controlled_substance: z.enum(["Yes", "No"]),
    rented_from_elite: z.enum(["Yes", "No"]),
    elite_address: z.string().optional(),
    renters_insurance: z.enum(["Yes", "No"]),
    renters_insurance_explanation: z.string().optional(),
    cosigner: z.enum(["Yes", "No"]),
    cosigner_name: z.string().optional(),
    cosigner_phone: z.string().optional(),
    // Step 7: Emergency Contact
    emergency_name: z.string(),
    emergency_phone: z.string(),
    emergency_relationship: z.string(),
    // Step 8: Required Documents
    documents_1: z.instanceof(File),
    documents_2: z.instanceof(File),
    documents_3: z.instanceof(File),
})

const ApplyTenants = () => {
    const router = useRouter(); // Initialize useRouter (only if you need it for navigation)
    const searchParams = useSearchParams(); // For accessing query parameters
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 8

    // Extract query parameters from the URL
    const property_id = searchParams.get("property_id") || ""; // Default to empty string if not present
    const address = searchParams.get("address") || "";
    const bedrooms = searchParams.get("bedrooms") || "";

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    const stepFields: { [key: number]: string[] } = {
        1: [
            "property_id",
            "address",
            "bedrooms",
            "move_in_date",
            "fee",
            "transaction_method",
        ],
        2: [
            "full_name",
            "birthday",
            "ssn",
            "phone",
            "license_id",
            "state",
            "email",
            "current_address",
            "date_of_move_in",
            "rent_amount",
            "reason_for_moving",
            "landlord_name",
            "landlord_phone",
        ],
        3: ["others"], // Special handling needed for arrays
        4: ["pets", "how_many_pets"],
        5: [
            "employer",
            "job_title",
            "employer_address",
            "contact_phone",
            "supervisor_name",
            "start_date",
            "income",
            "assistance_received",
            "assistance_amount",
            "additional_income",
            "additional_income_amount",
        ],
        6: [
            "references", // Special handling needed for arrays
            "eviction",
            "refused_rent",
            "refused_rent_explanation",
            "felony",
            "felony_explanation",
            "judgment",
            "judgment_explanation",
            "controlled_substance",
            "rented_from_elite",
            "elite_address",
            "renters_insurance",
            "renters_insurance_explanation",
            "cosigner",
            "cosigner_name",
            "cosigner_phone",
        ],
        7: ["emergency_name", "emergency_phone", "emergency_relationship"],
        8: [], // File uploads handled separately
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            property_id, // Set from query parameter or default to empty string
            address,
            bedrooms,
            fee: 40,
            transaction_method: "",
            move_in_date: undefined,
            full_name: "",
            birthday: undefined,
            ssn: "",
            phone: "",
            license_id: "",
            state: "",
            email: "",
            current_address: "",
            date_of_move_in: undefined,
            rent_amount: 0,
            reason_for_moving: "",
            landlord_name: "",
            landlord_phone: "",
            others: [
                {
                    name: "",
                    birthday: undefined,
                    ssn_last4: "",
                    relationship: "",
                },
            ],
            pets: [],
            how_many_pets: 0,
            employer: "",
            job_title: "",
            employer_address: "",
            contact_phone: "",
            supervisor_name: "",
            start_date: undefined,
            income: 0,
            assistance_received: "No",
            assistance_amount: 0,
            additional_income: "No",
            additional_income_amount: 0,
            references: [
                {
                    name: "",
                    phone: "",
                    relationship: "",
                },
            ],
            eviction: "No",
            refused_rent: "No",
            refused_rent_explanation: "",
            felony: "No",
            felony_explanation: "",
            judgment: "No",
            judgment_explanation: "",
            controlled_substance: "No",
            rented_from_elite: "No",
            elite_address: "",
            renters_insurance: "No",
            renters_insurance_explanation: "",
            cosigner: "No",
            cosigner_name: "",
            cosigner_phone: "",
            emergency_name: "",
            emergency_phone: "",
            emergency_relationship: "",
            // For file uploads, you might need to handle this separately
        },
    })

    const onSubmit = async (values) => {
        try {
            // Initialize an array to hold upload promises
            const fileUploadPromises = [];

            // Loop through the documents and upload them to Firebase Storage
            for (let i = 1; i <= 3; i++) {
                const fileKey = `documents_${i}`;
                const file = values[fileKey];
                if (file) {
                    // Create a reference using the Firebase v9 modular syntax
                    const fileRef = ref(storage, `applications/${Date.now()}_${file.name}`);

                    // Upload the file to Firebase Storage
                    const uploadTask = uploadBytes(fileRef, file);

                    // Create a promise to handle the upload
                    const uploadPromise = uploadTask
                        .then((snapshot) => getDownloadURL(snapshot.ref))
                        .then((downloadURL) => ({
                            name: file.name,
                            url: downloadURL,
                        }));

                    fileUploadPromises.push(uploadPromise);
                }
            }

            // Wait for all files to be uploaded
            const uploadedFiles = await Promise.all(fileUploadPromises);

            // Prepare the data to send to the backend
            const applicationData = { ...values };
            delete applicationData.documents_1;
            delete applicationData.documents_2;
            delete applicationData.documents_3;
            applicationData.documents = uploadedFiles;

            // Send the application data to your backend
            const response = await fetch('/api/apply-tenants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(applicationData),
            });

            if (!response.ok) throw new Error('Failed to submit application');

            const result = await response.json();
            console.log('Application submitted:', result);

            // Initiate Stripe payment
            const paymentResponse = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    applicationId: result.application.id,
                    fee: values.fee,
                }),
            });

            const { sessionId } = await paymentResponse.json();

            // Redirect to Stripe Checkout
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error('Stripe checkout error:', error);
                throw new Error('Failed to initiate payment');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('There was an error submitting your application or initiating the payment. Please try again.');
        }
    };

    const nextStep = async () => {
        const fieldsToValidate = stepFields[currentStep]

        // If the step includes dynamic fields (arrays), you may need to handle them separately
        let isValid = true

        if (currentStep === 3) {
            // Validate all fields in the "others" array
            isValid = await form.trigger(
                form
                    .getValues("others")
                    .map((_, index) => [
                        `others.${index}.name`,
                        `others.${index}.birthday`,
                        `others.${index}.ssn_last4`,
                        `others.${index}.relationship`,
                    ])
                    .flat()
            )
        } else if (currentStep === 6) {
            // Validate all fields in the "references" array
            isValid = await form.trigger(
                form
                    .getValues("references")
                    .map((_, index) => [
                        `references.${index}.name`,
                        `references.${index}.phone`,
                        `references.${index}.relationship`,
                    ])
                    .flat()
            )
            // Validate other fields in step 6
            const otherFields = stepFields[6].filter(
                (field) => field !== "references"
            )
            isValid = isValid && (await form.trigger(otherFields))
        } else {
            isValid = await form.trigger(fieldsToValidate)
        }

        console.log("Form valid:", isValid)

        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    const previousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Field Arrays for dynamic fields
    const {
        fields: otherPeopleFields,
        append: appendPerson,
        remove: removePerson,
    } = useFieldArray({
        control: form.control,
        name: "others",
    })

    const {
        fields: referenceFields,
        append: appendReference,
        remove: removeReference,
    } = useFieldArray({
        control: form.control,
        name: "references",
    })

    // Watch certain fields for conditional rendering
    const watchAssistanceReceived = form.watch("assistance_received")
    const watchAdditionalIncome = form.watch("additional_income")
    const watchRefusedRent = form.watch("refused_rent")
    const watchFelony = form.watch("felony")
    const watchJudgment = form.watch("judgment")
    const watchRentedFromElite = form.watch("rented_from_elite")
    const watchRentersInsurance = form.watch("renters_insurance")
    const watchCosigner = form.watch("cosigner")
    const watchPets = form.watch("pets")

    const stepNames = [
        "Rental Application",
        "Personal Information",
        "Others in Unit",
        "Pet Info",
        "Financial Info",
        "References",
        "Emergency Contact",
        "Required Documents"
    ];

    return (
        <div className="pt-[136px] flex justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-7xl w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-8">
                        {/* Progress Bar */}
                        <div className="progress-container grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-y-4 justify-items-center mb-8">
                            {[...Array(totalSteps)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`progress-step flex flex-col items-center ${currentStep === index + 1 ? "active" : ""
                                        } ${currentStep > index + 1 ? "completed" : ""}`}
                                >
                                    <div
                                        className={`progress-step-icon w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border-2 ${currentStep >= index + 1
                                            ? "bg-[#9A7648] border-[#9A7648] text-white"
                                            : "border-gray-300 text-gray-400"
                                            }`}
                                    >
                                        {index + 1}
                                    </div>
                                    <span
                                        className={`progress-step-title mt-2 text-xs md:text-sm font-medium text-center ${currentStep >= index + 1 ? "text-[#9A7648]" : "text-gray-400"
                                            }`}
                                        style={{ whiteSpace: "break-spaces" }}
                                    >
                                        {stepNames[index]}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Render Steps */}
                        {currentStep === 1 && (
                            <div>
                                {/* Step 1: Rental Application */}
                                <h2 className="text-xl font-bold">Rental Application</h2>
                                {/* Property ID */}
                                <FormField
                                    control={form.control}
                                    name="property_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Property ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Property ID" {...field} readOnly required />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Address */}
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Address" {...field} readOnly required />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Bedrooms */}
                                <FormField
                                    control={form.control}
                                    name="bedrooms"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bedrooms</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Bedrooms" {...field} readOnly required />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Move-In Date */}
                                <FormField
                                    control={form.control}
                                    name="move_in_date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Move-In Date</FormLabel>
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
                                                            {field.value ? format(field.value, "PPP") : <span>Select Date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(date) => {
                                                            field.onChange(date); // update date
                                                            form.trigger("move_in_date"); // trigger validation
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Fee */}
                                <FormField
                                    control={form.control}
                                    name="fee"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Application Fee Paid ($)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="40" {...field} readOnly required />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Transaction Method */}
                                <FormField
                                    control={form.control}
                                    name="transaction_method"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CC or MO $</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Transaction Method"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("transaction_method"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div>
                                <h2 className="text-xl font-bold">Personal Information</h2>
                                {/* Full Name */}
                                <FormField
                                    control={form.control}
                                    name="full_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Full Name"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("full_name"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Birthday */}
                                <FormField
                                    control={form.control}
                                    name="birthday"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Birthday</FormLabel>
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
                                                            {field.value ? format(field.value, "PPP") : <span>Select Date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(date) => {
                                                            field.onChange(date); // update date
                                                            form.trigger("birthday"); // trigger validation
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* SSN */}
                                <FormField
                                    control={form.control}
                                    name="ssn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Social Security Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="SSN"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("ssn"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Phone Number */}
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("phone"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* License ID */}
                                <FormField
                                    control={form.control}
                                    name="license_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>License/ID Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="License/ID Number"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("license_id"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* State */}
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="State"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("state"); // trigger validation
                                                    }}
                                                    required
                                                />
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
                                                    placeholder="Email"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("email"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Current Address */}
                                <FormField
                                    control={form.control}
                                    name="current_address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Current Address"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("current_address"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Date of Move-In */}
                                <FormField
                                    control={form.control}
                                    name="date_of_move_in"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date of Move-In</FormLabel>
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
                                                            {field.value ? format(field.value, "PPP") : <span>Select Date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(date) => {
                                                            field.onChange(date); // update date
                                                            form.trigger("date_of_move_in"); // trigger validation
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Rent Amount */}
                                <FormField
                                    control={form.control}
                                    name="rent_amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Rent Amount</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Rent Amount"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("rent_amount"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Reason for Moving */}
                                <FormField
                                    control={form.control}
                                    name="reason_for_moving"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Reason for Moving</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Reason for Moving"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("reason_for_moving"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Landlord Name */}
                                <FormField
                                    control={form.control}
                                    name="landlord_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Landlord Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Landlord Name"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("landlord_name"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Landlord Phone */}
                                <FormField
                                    control={form.control}
                                    name="landlord_phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Landlord Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="Landlord Phone"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("landlord_phone"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div>
                                <h2 className="text-xl font-bold">Others Living in the Unit</h2>
                                {otherPeopleFields.map((item, index) => (
                                    <div key={item.id} className="border p-4 mb-4">
                                        <h3 className="text-lg font-semibold">Person {index + 1}</h3>
                                        {/* Name */}
                                        <FormField
                                            control={form.control}
                                            name={`others.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Name"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e); // update value
                                                                form.trigger(`others.${index}.name`); // trigger validation
                                                            }}
                                                            required
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Birthday */}
                                        <FormField
                                            control={form.control}
                                            name={`others.${index}.birthday`}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Birthday</FormLabel>
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
                                                                    {field.value
                                                                        ? format(field.value, "PPP")
                                                                        : "Select Date"}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={(date) => {
                                                                    field.onChange(date); // update date
                                                                    form.trigger(`others.${index}.birthday`); // trigger validation
                                                                }}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* SSN Last 4 */}
                                        <FormField
                                            control={form.control}
                                            name={`others.${index}.ssn_last4`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last 4 of SSN</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="SSN Last 4"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e); // update value
                                                                form.trigger(`others.${index}.ssn_last4`); // trigger validation
                                                            }}
                                                            required
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Relationship */}
                                        <FormField
                                            control={form.control}
                                            name={`others.${index}.relationship`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Relationship</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Relationship"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e); // update value
                                                                form.trigger(`others.${index}.relationship`); // trigger validation
                                                            }}
                                                            required
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Remove Button */}
                                        {index > 0 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={() => removePerson(index)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() =>
                                        appendPerson({
                                            name: "",
                                            birthday: undefined,
                                            ssn_last4: "",
                                            relationship: "",
                                        })
                                    }
                                >
                                    Add Another Person
                                </Button>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div>
                                <h2 className="text-xl font-bold">Pet Information</h2>
                                {/* Pets */}
                                <FormField
                                    control={form.control}
                                    name="pets"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Do you have any pets?</FormLabel>
                                            <div className="flex flex-col space-y-2">
                                                {["Dog", "Cat", "Other", "None"].map((pet) => (
                                                    <FormField
                                                        key={pet}
                                                        control={form.control}
                                                        name="pets"
                                                        render={() => (
                                                            <FormItem className="flex items-center space-x-3">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(pet)}
                                                                        onCheckedChange={(checked) => {
                                                                            checked
                                                                                ? field.onChange([...field.value, pet])
                                                                                : field.onChange(
                                                                                    field.value?.filter((value) => value !== pet)
                                                                                )
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">{pet}</FormLabel>
                                                            </FormItem>
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* How Many Pets */}
                                {watchPets.length > 0 && !watchPets.includes("None") && (
                                    <FormField
                                        control={form.control}
                                        name="how_many_pets"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>How many pets?</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={1} placeholder="Number of pets"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e); // update value
                                                            form.trigger("how_many_pets"); // trigger validation
                                                        }}
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div>
                                <h2 className="text-xl font-bold">Financial Information</h2>
                                {/* Employer */}
                                <FormField
                                    control={form.control}
                                    name="employer"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Applicant's Employer</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Employer"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("employer"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Job Title */}
                                <FormField
                                    control={form.control}
                                    name="job_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Job Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Job Title"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("job_title"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Employer Address */}
                                <FormField
                                    control={form.control}
                                    name="employer_address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Employer's Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Employer's Address"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("employer_address"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Contact Phone */}
                                <FormField
                                    control={form.control}
                                    name="contact_phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Phone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="Contact Phone"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("contact_phone"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Supervisor Name */}
                                <FormField
                                    control={form.control}
                                    name="supervisor_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Supervisor's Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Supervisor's Name"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("supervisor_name"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Start Date */}
                                <FormField
                                    control={form.control}
                                    name="start_date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Start Date</FormLabel>
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
                                                            {field.value ? format(field.value, "PPP") : <span>Select Date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(date) => {
                                                            field.onChange(date); // update date
                                                            form.trigger("start_date"); // trigger validation
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Income */}
                                <FormField
                                    control={form.control}
                                    name="income"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gross Income (Monthly)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Income"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("income"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Assistance Received */}
                                <FormField
                                    control={form.control}
                                    name="assistance_received"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Do you receive alimony, child support, or food/cash assistance?
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex space-x-4 mt-2"
                                                >
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="Yes" />
                                                        </FormControl>
                                                        <FormLabel>Yes</FormLabel>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="No" />
                                                        </FormControl>
                                                        <FormLabel>No</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Assistance Amount */}
                                {watchAssistanceReceived === "Yes" && (
                                    <FormField
                                        control={form.control}
                                        name="assistance_amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>How much?</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Amount"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e); // update value
                                                            form.trigger("assistance_amount"); // trigger validation
                                                        }}
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                {/* Additional Income */}
                                <FormField
                                    control={form.control}
                                    name="additional_income"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Do you have additional income (Section 8, SSI, DHS, etc.)?
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex space-x-4 mt-2"
                                                >
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="Yes" />
                                                        </FormControl>
                                                        <FormLabel>Yes</FormLabel>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="No" />
                                                        </FormControl>
                                                        <FormLabel>No</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Additional Income Amount */}
                                {watchAdditionalIncome === "Yes" && (
                                    <FormField
                                        control={form.control}
                                        name="additional_income_amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>How much?</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Amount"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e); // update value
                                                            form.trigger("additional_income_amount"); // trigger validation
                                                        }}
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                        )}

                        {currentStep === 6 && (
                            <div>
                                <h2 className="text-xl font-bold">Personal References</h2>
                                {referenceFields.map((item, index) => (
                                    <div key={item.id} className="border p-4 mb-4">
                                        <h3 className="text-lg font-semibold">Reference {index + 1}</h3>
                                        {/* Name */}
                                        <FormField
                                            control={form.control}
                                            name={`references.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Name"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e); // update value
                                                                form.trigger(`references.${index}.name`); // trigger validation
                                                            }}
                                                            required
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Phone */}
                                        <FormField
                                            control={form.control}
                                            name={`references.${index}.phone`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="tel"
                                                            placeholder="Phone"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e); // update value
                                                                form.trigger(`references.${index}.phone`); // trigger validation
                                                            }}
                                                            required
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Relationship */}
                                        <FormField
                                            control={form.control}
                                            name={`references.${index}.relationship`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Relationship</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Relationship"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e); // update value
                                                                form.trigger(`references.${index}.relationship`); // trigger validation
                                                            }}
                                                            required
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Remove Button */}
                                        {index > 0 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={() => removeReference(index)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() =>
                                        appendReference({
                                            name: "",
                                            phone: "",
                                            relationship: "",
                                        })
                                    }
                                >
                                    Add Another Reference
                                </Button>

                                {/* Additional Questions */}
                                {/* Eviction */}
                                <FormField
                                    control={form.control}
                                    name="eviction"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Have you ever been served an eviction and/or asked to vacate a property?
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex space-x-4 mt-2"
                                                >
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="Yes" />
                                                        </FormControl>
                                                        <FormLabel>Yes</FormLabel>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="No" />
                                                        </FormControl>
                                                        <FormLabel>No</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Refused Rent */}
                                <FormField
                                    control={form.control}
                                    name="refused_rent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Have you ever intentionally refused to pay rent?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex space-x-4 mt-2"
                                                >
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="Yes" />
                                                        </FormControl>
                                                        <FormLabel>Yes</FormLabel>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="No" />
                                                        </FormControl>
                                                        <FormLabel>No</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Refused Rent Explanation */}
                                {watchRefusedRent === "Yes" && (
                                    <FormField
                                        control={form.control}
                                        name="refused_rent_explanation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>If yes, please explain:</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Explanation"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e); // update value
                                                            form.trigger("refused_rent_explanation"); // trigger validation
                                                        }}
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                {/* Repeat similar blocks for other conditional fields */}
                                {/* Felony */}
                                <FormField
                                    control={form.control}
                                    name="felony"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Have you ever been convicted of a felony?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex space-x-4 mt-2"
                                                >
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="Yes" />
                                                        </FormControl>
                                                        <FormLabel>Yes</FormLabel>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="No" />
                                                        </FormControl>
                                                        <FormLabel>No</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {watchFelony === "Yes" && (
                                    <FormField
                                        control={form.control}
                                        name="felony_explanation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>If yes, please explain:</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Explanation"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e); // update value
                                                            form.trigger("felony_explanation"); // trigger validation
                                                        }}
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                {/* Continue with other conditional questions as per your form */}
                            </div>
                        )}

                        {currentStep === 7 && (
                            <div>
                                <h2 className="text-xl font-bold">Emergency Contact</h2>
                                {/* Emergency Name */}
                                <FormField
                                    control={form.control}
                                    name="emergency_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Name"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("emergency_name"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Emergency Phone */}
                                <FormField
                                    control={form.control}
                                    name="emergency_phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="Phone"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("emergency_phone"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Emergency Relationship */}
                                <FormField
                                    control={form.control}
                                    name="emergency_relationship"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Relationship</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Relationship"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e); // update value
                                                        form.trigger("emergency_relationship"); // trigger validation
                                                    }}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {currentStep === 8 && (
                            <div>
                                <h2 className="text-xl font-bold">Required Documents</h2>
                                <p>Please include the following documents:</p>
                                <p>
                                    Disclaimer: Please upload files in JPEG, JPG, PNG, PDF, or PSD format, with a maximum size of 5MB.
                                </p>

                                <div className="mt-4">
                                    {/* Driver's License / Photo ID */}
                                    <Controller
                                        name="documents_1"
                                        control={form.control}
                                        rules={{ required: 'This field is required' }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Driver's License / Photo ID</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.png,.jpg,.jpeg,.psd"
                                                        onChange={(e) => field.onChange(e.target.files[0])}
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Social Security Card */}
                                    <Controller
                                        name="documents_2"
                                        control={form.control}
                                        rules={{ required: 'This field is required' }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Social Security Card</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.png,.jpg,.jpeg,.psd"
                                                        onChange={(e) => field.onChange(e.target.files[0])}
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Proof of Income for the Last 30 Days */}
                                    <Controller
                                        name="documents_3"
                                        control={form.control}
                                        rules={{ required: 'This field is required' }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Proof of Income for the Last 30 Days</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.png,.jpg,.jpeg,.psd"
                                                        onChange={(e) => field.onChange(e.target.files[0])}
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between">
                            <Button
                                className="text-gold hover:text-gold"
                                type="button"
                                variant="outline"
                                onClick={previousStep}
                                disabled={currentStep === 1}
                            >
                                Previous
                            </Button>

                            {currentStep < totalSteps ? (
                                <Button asChild>
                                    <button
                                        className="bg-gold hover:bg-[#725836]"
                                        type="button"
                                        onClick={nextStep}
                                    >
                                        Next
                                    </button>
                                </Button>
                            ) : (
                                <Button
                                    className="bg-gold hover:bg-[#725836]"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default ApplyTenants
