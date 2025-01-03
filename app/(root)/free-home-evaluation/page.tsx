"use client"; // Ensure this file runs in the client-side environment

import { useEffect, useState } from "react";
import Script from "next/script";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  consent: z.boolean().refine((val) => val, "Consent is required"),
  address: z.string().min(1, "Address is required"),
});

// Infer the type for FormValues
type FormValues = z.infer<typeof formSchema>;

const FreeHomeEvaluation = () => {
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      consent: false,
      address: "",
    },
  });

  const consent = form.watch("consent");

  useEffect(() => {
    const initializeAutocomplete = () => {
      const input = document.getElementById("autocomplete") as HTMLInputElement;
      if (!input) return;
      const autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {
        const selectedPlace = autocomplete.getPlace();
        if (!selectedPlace || !selectedPlace.geometry) {
          console.error("No details available for input");
          return;
        }
        setPlace(selectedPlace);
        form.setValue("address", selectedPlace.formatted_address || "");
      });
    };

    if (typeof google !== "undefined") {
      initializeAutocomplete();
    }
  }, [form]);

  const initializeMap = (lat: number, lng: number) => {
    const map = new google.maps.Map(
      document.getElementById("au-map") as HTMLElement,
      {
        center: { lat, lng },
        zoom: 12,
      }
    );

    new google.maps.Marker({
      position: { lat, lng },
      map,
      title: "Selected Location",
    });
  };

  const handleDialogOpen = () => {
    if (place && place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      initializeMap(lat, lng);
    } else {
      console.error("Location information is missing in the selected place.");
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/free-home-evaluation", {
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
          result.message || "Your request has been submitted successfully!",
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
    <>
      {/* Google Places API script */}
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDOK76m7BqhVMRzHrPotzSxejDellh4SMI&libraries=places"
        strategy="beforeInteractive"
      />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2F4.jpg?alt=media&token=9097aad8-5e24-4140-a725-430c75e3e481')",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // black with 50% opacity
          backgroundBlendMode: "darken",
        }}
      >
        <div className="text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-marcellus">
            HOW MUCH YOUR HOME WORTH
          </h1>
          <p className="mt-2 text-lg">
            Instant property valuation · Expert advice Sell for me
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4">
            <input
              id="autocomplete"
              type="text"
              className="w-3/4 md:w-1/2 p-3 rounded-md border focus:outline-none focus:ring-2 text-black focus:ring-[#bfaf9e]"
              placeholder="Enter your home address..."
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gold h-12 hover:bg-[#725836]">
                  GET A FREE HOME VALUATION
                </Button>
              </DialogTrigger>
              <DialogContent
                className="lg:max-w-[900px] max-h-[80vh] p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto"
                onOpenAutoFocus={handleDialogOpen}
              >
                <div className="order-2 lg:order-1">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-primary">
                      GET YOUR INSTANT HOME VALUATION
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                      Enter your details to see how much your home is worth.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4 mt-4"
                    >
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Phone"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Hidden address field */}
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="hidden">
                            <FormControl>
                              <Input type="hidden" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="consent"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-start space-x-2">
                              <FormControl>
                                <Checkbox
                                  id="consent"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor="consent"
                                className="text-sm text-muted-foreground"
                              >
                                By providing your contact information, you
                                consent to receiving marketing communications...
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter className="mt-4">
                        <Button
                          type="submit"
                          className="w-full bg-primary text-white"
                          disabled={!consent}
                        >
                          UNLOCK YOUR FREE VALUATION
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="bg-gray-50 rounded-md p-4 space-y-4">
                    <h2 className="text-lg font-semibold text-primary">
                      LUXURY PRESENCE HOME VALUE
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Property Address:{" "}
                      <strong>{place?.formatted_address || "N/A"}</strong>
                    </p>
                    <div
                      id="au-map"
                      style={{
                        width: "100%",
                        height: "200px",
                        borderRadius: "4px",
                      }}
                    ></div>
                    <a
                      href="#"
                      className="text-sm text-primary underline hover:text-primary-dark"
                    >
                      HOW WE CALCULATE YOUR ESTIMATE
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Section: What’s Your Property Worth */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-32 py-16 bg-white">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-marcellus text-[#bfaf9e] mb-6">
            WHAT&apos;S YOUR PROPERTY WORTH?
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Understanding your home&apos;s value is crucial for making informed
            decisions about your property. Whether you&apos;re planning to sell,
            refinance, or simply want to stay updated on your equity, accurate
            property valuation is key.
          </p>
          <p className="text-lg text-gray-700">
            At Elite Real Estate and Professional Management, we provide
            comprehensive home valuations to give you the insights you need to
            make smart financial choices.
          </p>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-andreaedavis-12474787-650x650.jpg?alt=media&token=06df9f81-9661-4c41-8f0d-e232d7e6b071"
            alt="Property Interior"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </div>

      {/* Section: Why Home Valuation Matters */}
      <div className="bg-white px-8 md:px-16 lg:px-32 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-marcellus text-[#bfaf9e] mb-4">
              Why a Home Valuation Matters?
            </h3>
            <p className="text-gray-700">
              A professional home valuation gives you an accurate assessment of
              your property&apos;s market value. This is crucial for real estate
              transactions and ensuring you don&apos;t over-borrow. If
              you&apos;re getting a mortgage, the home serves as collateral, and
              a thorough valuation helps protect both your interests and those
              of your lender.
            </p>
          </div>
          <div className="border rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-marcellus text-[#bfaf9e] mb-4">
              How We Determine Your Home’s Value
            </h3>
            <p className="text-gray-700">
              Our valuation process considers: Location and Neighborhood, Size
              and Condition, Recent Renovations, Comparable Sales, Current
              Market Trends. We provide a dynamic estimate that reflects local
              market conditions and buyer sentiment, unlike basic online tools.
            </p>
          </div>
          <div className="border rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-marcellus text-[#bfaf9e] mb-4">
              Online Valuation vs. Professional Appraisal
            </h3>
            <p className="text-gray-700">
              While online home valuation tools offer a helpful starting point,
              they may not capture every nuance of your property. For the most
              accurate and reliable assessment, we recommend scheduling a
              customized Comparative Market Analysis (CMA) or a professional
              appraisal with our expert team.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center bg-[#bfaf9e] py-12 rounded-md text-white">
          <h2 className="text-3xl md:text-4xl font-marcellus mb-4">
            BROWSE MARKET LISTINGS
          </h2>
          <button className="mt-4 px-6 py-3 bg-white text-[#bfaf9e] font-bold rounded-md hover:bg-gray-200">
            Learn More
          </button>
        </div>
      </div>

      {/* Vertical Alternating Timeline */}
      <div className="bg-white px-8 md:px-16 lg:px-32 py-16">
        <h2 className="text-3xl md:text-4xl font-marcellus text-center text-[#bfaf9e] mb-4">
          How Is a Home <br /> Valuation Performed?
        </h2>
        <p className="text-lg text-center text-gray-700 mb-12">
          Two Accurate Ways to Value Your Property
        </p>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-[#bfaf9e]"></div>

          <div className="space-y-12">
            {/* Timeline Item 1 */}
            <div className="relative flex items-center">
              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#bfaf9e] rounded-full"></div>
              {/* Button on Left */}
              <div className="w-1/2 pr-6 text-center">
                <button className="bg-[#bfaf9e] text-white px-6 py-3 rounded-md">
                  Market Analysis
                </button>
              </div>
              {/* Text on Right */}
              <div className="w-1/2 text-left pl-6">
                <p className="text-gray-700 text-lg">
                  Comparative Market Analysis
                </p>
                <p>
                  <br />
                </p>
                <p className="text-gray-700 text-lg">
                  A Comparative Market Analysis (CMA) is a key tool used by real
                  estate agents to determine your home&apos;s value. It involves
                  comparing your property with recently sold homes in the same
                  area. Agents analyze three to five similar properties (comps)
                  that have recently sold and adjust their prices to reflect
                  differences from your home. This method helps estimate your
                  home&apos;s market value based on recent sales data.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center">
              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#bfaf9e] rounded-full"></div>
              {/* Text on Left */}
              <div className="w-1/2 text-right pr-6">
                <p className="text-gray-700 text-lg">
                  Based on Professional&apos;s Opinion
                </p>
                <p>
                  <br />
                </p>
                <p className="text-gray-700 text-lg">
                  An appraisal provides an unbiased valuation based on a
                  professional&apos;s opinion. Typically ordered by lenders for home
                  purchases or refinances, appraisals involve a thorough
                  inspection of your home, both interior and exterior. The
                  appraiser considers recent sales of similar properties and
                  current market trends. They deliver a detailed report
                  including a building sketch, street map, photos, and a
                  breakdown of how the value was determined.
                </p>
              </div>
              {/* Button on Right */}
              <div className="w-1/2 pl-6 text-center">
                <button className="bg-[#bfaf9e] text-white px-6 py-3 rounded-md">
                  Appraisals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Alternating Timeline */}
      <div className="bg-white px-8 md:px-16 lg:px-32 py-16">
        <h2 className="text-3xl md:text-4xl font-marcellus text-center text-[#bfaf9e] mb-4">
          WHY IS A HOME VALUATION IMPORTANT?
        </h2>
        <p className="text-lg text-center text-gray-700 mb-12">
          Situations When a Home Valuation May Be Necessary
        </p>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-[#bfaf9e]"></div>

          <div className="space-y-12">
            {/* Timeline Item 1 */}
            <div className="relative flex items-center">
              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#bfaf9e] rounded-full"></div>
              {/* Text on Left */}
              <div className="w-1/2 text-right pr-6">
                <p className="text-gray-700 text-lg">
                  Planning home improvements? A valuation can help you avoid
                  over-investing in upgrades. By understanding your home&apos;s
                  current value and market position, you can make informed
                  decisions on improvements that enhance resale value.
                </p>
              </div>
              {/* Button on Right */}
              <div className="w-1/2 pl-6 text-center">
                <button className="bg-[#bfaf9e] text-white px-6 py-3 rounded-md">
                  Refinancing
                </button>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center">
              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#bfaf9e] rounded-full"></div>
              {/* Button on Left */}
              <div className="w-1/2 pr-6 text-center">
                <button className="bg-[#bfaf9e] text-white px-6 py-3 rounded-md">
                  Market Analysis
                </button>
              </div>
              {/* Text on Right */}
              <div className="w-1/2 text-left pl-6">
                <p className="text-gray-700 text-lg">
                  When refinancing, lenders base the amount of their loans on
                  the value of your property. Knowing your home&apos;s worth
                  helps you understand your equity, which can lead to better
                  refinance terms.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center">
              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#bfaf9e] rounded-full"></div>
              {/* Text on Left */}
              <div className="w-1/2 text-right pr-6">
                <p className="text-gray-700 text-lg">
                  Even if you&apos;re not currently buying, selling, or
                  refinancing, knowing your home&apos;s value is beneficial. It
                  helps with future planning, whether for unexpected expenses or
                  potential moves.
                </p>
              </div>
              {/* Button on Right */}
              <div className="w-1/2 pl-6 text-center">
                <button className="bg-[#bfaf9e] text-white px-6 py-3 rounded-md">
                  Qualifying For Credits
                </button>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative flex items-center">
              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#bfaf9e] rounded-full"></div>
              {/* Button on Left */}
              <div className="w-1/2 pr-6 text-center">
                <button className="bg-[#bfaf9e] text-white px-6 py-3 rounded-md">
                  Planning
                </button>
              </div>
              {/* Text on Right */}
              <div className="w-1/2 text-left pl-6">
                <p className="text-gray-700 text-lg">
                  Considering a HELOC? A home valuation confirms your equity
                  status and supports your credit application, ensuring you meet
                  the lender&apos;s requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreeHomeEvaluation;
