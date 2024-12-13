"use client";
import React from "react";

import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Team = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const teamMembers = [
    {
      name: "Madison Laframboise",
      position: "Head of Maintenance",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FPerson%2FMaddy--400x350.jpg?alt=media&token=57d66d7b-e6fd-401c-a15f-183a35233350",
    },
    {
      name: "Jaidyn Snider",
      position: "Front Desk",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FPerson%2FJaidyn-1-400x350.png?alt=media&token=731641ed-0dde-47bc-a9fa-33ef4ab4ca00",
    },
    {
      name: "Calista Zwerican",
      position: "Leasing Agent",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FPerson%2FCalista-400x350.jpg?alt=media&token=95e34511-bbf7-48c6-b08a-941b1e26f847",
    },
    {
      name: "Taylor Kietzman",
      position: "Head Administrator",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FPerson%2FTaylor-400x350.jpg?alt=media&token=1e98e53e-c395-4900-8fd0-d879c49ff2eb",
    },
    {
      name: "Tanya Asraf",
      position: "Rent Collection",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FPerson%2FTanya-400x350.jpg?alt=media&token=a8a515c2-04bf-4f21-a126-9a5fe62a8307",
    },
    {
      name: "Keelie Alridge",
      position: "Real Estate Agent",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FPerson%2FKeelie-400x350.jpg?alt=media&token=5e961297-8cbf-4f94-a3b3-c686a9cd97e2",
    },
    {
      name: "Jaiden Oliver",
      position: "Storage Unit Manager/Billing",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FPerson%2FJaiden-400x350.jpg?alt=media&token=62c172f5-2fa5-402d-8799-2200e51c29fa",
    },
  ];

  return (
    <div className="pt-[136px] bg-white">
      <section className="max-w-7xl mx-auto py-16 px-8">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FPerson%2FIMG_8514-1024x1024.jpg?alt=media&token=73450beb-6b90-4483-8ae9-1c6f7574509a"
              alt="Meet Our Team"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
            <div className="text-center mt-4">
              <h2 className="text-2xl font-marcellus text-[#b08d57]">
                JENNIFER OLIVER
              </h2>
              <p className="text-gray-600 text-sm">Founder & CEO</p>
            </div>
          </div>

          {/* Text Section */}
          <div className="mt-6 lg:mt-0 lg:ml-12 lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl font-marcellus text-[#b08d57]">
              Meet Our Team
            </h1>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed text-justify">
              Our team is a dynamic and diverse group of professionals who are
              passionate about Elite Real Estate & Professional
              Management&apos;s vision and values. They are dedicated to
              delivering exceptional experiences for both property owners and
              residents while fostering growth and development within their
              teams.
            </p>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="px-8 py-8">
          <Carousel
            className="w-full"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-1">
              {teamMembers.map((member, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 sm:basis-full md:basis-1/2 lg:basis-1/2"
                >
                  <div className="p-1">
                    <Card className="w-full border-none shadow-none">
                      <CardContent className="flex flex-col items-center text-center p-4">
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="w-full h-[400px] object-cover transform transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-4">
                          <h3 className="text-lg font-serif font-medium">
                            {member.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {member.position}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Team;
