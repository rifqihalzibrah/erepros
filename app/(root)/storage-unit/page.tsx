"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import PropertyModal from "@/components/ui/PropertyModal";
import { Property } from "../../../types/types";
import { getAccessKey, fetchData } from "../../../services/propertywareAPI";

const faqs = [
  {
    question: "Comprehensive Management",
    answer:
      "From leasing and maintenance to costumer service and billing, we handle every aspect of storage unit management with professionalism and efficiency. our team is dedicated to maximizing the potential of your storage facilities while minimizing your workload.",
  },
  {
    question:
      "How long does it take to hear back on my application and is there a fee to fill out an application?",
    answer:
      "There is a $40 fee for anyone over the age of 18 that will be living in the rental. It is non-refundable. Generally, the application process takes 24-48 hours to process.",
  },
  {
    question: "Can I get approved if I have bad credit?",
    answer:
      "We don’t go so much by the actual score as what we find on the report. You must be able to turn utilities on in your own name.",
  },
  {
    question:
      "Does the manager and/or an owner have the right to enter into my unit at anytime?",
    answer:
      "We will always give 24-hour notice for inspections. However, in the event of an emergency the manager or owner has the right to enter the unit/home to make necessary repairs in order to stop further damage to unit or harm to tenants.",
  },
  {
    question: "Can the landlord raise my rent during the term of my lease?",
    answer:
      "If you are on a month-to-month lease, then our office will give you a 60-day notice if the rent is increasing. If you are on a year lease contract, then the terms will not change during that year’s term period. You must give a written 30-day notice either by email or regular mail. You may also give notice through your tenant portal. We must also receive keys back for the final inspection and to remit return of your security deposit.",
  },
  {
    question:
      "How do I make a maintenance request and how long does it take for someone to come out to fix my issue?",
    answer:
      "You may use your tenant portal and email in a request or call our office at (810) 715-5486. Per your lease agreement there may be a service call fee in order for us to come out. Certain repairs under $50 may be your responsibility to repair on your own. You may also be charged for the repair if negligence occurred on your part or from that of your family or guests.",
  },
  {
    question:
      "Is there an after hours emergency line and what is deemed as an emergency?",
    answer:
      "Yes, it is the office line (810) 715-5486 and someone monitors it after hours and on the weekends. An emergency is deemed as a safety or health issue such as furnace repair needed in winter, water line breaks, electrical outage issue anywhere in the home.",
  },
  {
    question: "Do you allow Pets and is there an additional fee?",
    answer:
      "This depends specifically on what the owner accepts. Typically, most owners that allow pets will charge a pet deposit of up to $200 per pet and/or an increase in rent of up to $25 per pet per month. We do allow service animals and emotional support pets.",
  },
  {
    question:
      "Can I get my deposit back if I decide I no longer want to rent the unit or I have changed my mind because I found something else?",
    answer:
      "No, you are holding a unit with that deposit that we will not be able to rent to anyone else until you move in. It is a loss of rent to an owner if you change your mind and we have to advertise the property again.",
  },
];
const StorageUnitPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  ); // For the modal

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const accessKey = await getAccessKey();
        const data = await fetchData(accessKey);

        // Filter only storage units
        const filteredData = data.filter(
          (property: Property) =>
            property.property_type.toLowerCase() === "other"
        );

        setProperties(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const openModal = (property: Property) => {
    setSelectedProperty(property);
  };

  const closeModal = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="container mx-auto pt-[136px] px-4 py-10">
      {/* Heading Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-marcellus text-gold mb-4">
          Storage Unit Management Services
        </h1>
      </section>

      {/* Section 1 */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
        {/* Text Content */}
        <div className="lg:w-1/2">
          <h2 className="text-lg font-marcellus tracking-wide text-gold uppercase mb-4">
            Efficient, Secure, and Reliable – Your Storage Solutions Partner
          </h2>
          <p className="text-gray-700 text-base text-justify leading-relaxed">
            At Elite Real Estate & Professional Management, we understand that
            managing storage units requires more than just providing space; it
            demands attention to detail, top-notch security, and exceptional
            service. Our comprehensive storage unit management solutions are
            designed to meet the diverse needs of property owners, businesses,
            and individuals, ensuring a smooth and hassle-free experience for
            all.
          </p>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center">
          <Image
            src="https://erepros.com/wp-content/uploads/2024/08/10x20-1024x1024.png"
            alt="Storage Unit Illustration"
            width={600}
            height={600}
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-12">
        <h2 className="text-center text-3xl font-marcellus tracking-wide text-gold uppercase mb-4">
          Why Choose Us
        </h2>
        <Accordion items={faqs} />
      </section>

      {/* Section 3 */}
      <section className="mb-12">
        <h2 className="text-center text-3xl font-marcellus text-gold ">
          Get Started with Us
        </h2>
        <p className="text-sm max-w-4xl mx-auto p-6">
          Partner with us for top-tier storage unit management that combines
          efficiency, security, and exceptional service. Contact us today to
          learn more about our services and how we can help optimize your
          storage property for success.
        </p>
        <div className="flex items-center justify-center mb-4">
          <button className="bg-gold text-white p-4 rounded-sm">
            GET A QUOTE
          </button>
        </div>
      </section>

      {/* Section 4: Storage Unit Listings */}
      <section>
        <h2 className="text-center text-3xl font-marcellus text-gold">
          STORAGE UNIT LISTINGS
        </h2>
        <p className="text-center text-sm max-w-4xl mx-auto p-6">
          LIMITED TIME ONLY! 50% OFF First 3 Months!
        </p>

        {/* Main Grid for Storage Units */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 animate-pulse bg-gray-200"
                >
                  <div className="h-64 bg-gray-300 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded-md"></div>
                </div>
              ))
            : properties
                .slice(0, properties.length - (properties.length % 3)) // Exclude the last row
                .map((property) => (
                  <div
                    key={property.id}
                    className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    onClick={() => openModal(property)} // Open modal on click
                  >
                    <img
                      src={
                        property.images[0]?.original_image_url ||
                        "/placeholder-image.svg"
                      }
                      alt={property.address}
                      className="w-full h-64 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-2xl font-semibold">
                      {property.address}
                    </h2>
                    <p className="text-gray-600">
                      {property.city}, {property.state} {property.zip}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      ${property.target_rent}
                    </p>
                    <p className="text-gray-500">Storage Unit</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {property.total_area} Sq Ft
                    </p>
                  </div>
                ))}
        </div>

        {/* Center the last row if it has fewer items */}
        {!loading && properties.length % 3 !== 0 && (
          <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
            {properties
              .slice(-(properties.length % 3)) // Get the last row's items
              .map((property) => (
                <div
                  key={property.id}
                  className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full sm:w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
                  onClick={() => openModal(property)} // Open modal on click
                >
                  <img
                    src={
                      property.images[0]?.original_image_url ||
                      "/placeholder-image.svg"
                    }
                    alt={property.address}
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-2xl font-semibold">{property.address}</h2>
                  <p className="text-gray-600">
                    {property.city}, {property.state} {property.zip}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ${property.target_rent}
                  </p>
                  <p className="text-gray-500">Storage Unit</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {property.total_area} Sq Ft
                  </p>
                </div>
              ))}
          </div>
        )}
        <h2 className="text-center text-3xl font-marcellus text-gold pt-8">
          <a href="https://allwayslock.com/"> Allways Lock & Mini Storage</a>
        </h2>
      </section>

      {/* Property Modal */}
      <PropertyModal
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={closeModal}
      />
    </div>
  );
};

export default StorageUnitPage;
