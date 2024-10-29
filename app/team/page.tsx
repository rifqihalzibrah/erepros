"use client";

import { useState, useEffect } from "react";

const Team = () => {
  const teamMembers = [
    {
      name: "Madison Laframboise",
      position: "Head of Maintenance",
      imageUrl:
        "https://erepros.com/wp-content/uploads/2023/01/Maddy--400x350.jpg",
    },
    {
      name: "Jaidyn Snider",
      position: "Front Desk",
      imageUrl:
        "https://erepros.com/wp-content/uploads/2023/01/Jaidyn-1-400x350.png",
    },
    {
      name: "Calista Zwerican",
      position: "Leasing Agent",
      imageUrl:
        "https://erepros.com/wp-content/uploads/2023/01/Calista-400x350.jpg",
    },
    {
      name: "Taylor Kietzman",
      position: "Head Administrator",
      imageUrl:
        "https://erepros.com/wp-content/uploads/2023/01/Taylor-400x350.jpg",
    },
    {
      name: "Tanya Asraf",
      position: "Rent Collection",
      imageUrl:
        "https://erepros.com/wp-content/uploads/2023/01/Tanya-400x350.jpg",
    },
    {
      name: "Keelie Alridge",
      position: "Real Estate Agent",
      imageUrl:
        "https://erepros.com/wp-content/uploads/2023/01/Keelie-400x350.jpg",
    },
    {
      name: "Jaiden Oliver",
      position: "Storage Unit Maneger/Billing",
      imageUrl:
        "https://erepros.com/wp-content/uploads/2023/01/Jaiden-400x350.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === teamMembers.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - 3 : prevIndex - 1
    );
  };

  return (
    <section className="text-center my-8">
      <h2 className="text-3xl font-marcellus text-[#b08d57]">Meet Our Team</h2>
      <p className="mt-4 text-lg max-w-3xl mx-auto">
        Our team is a dynamic and diverse group of professionals who are
        passionate about Elite Real Estate & Professional Management's vision
        and values. They are dedicated to delivering exceptional experiences for
        both property owners and residents while fostering growth and
        development within their teams.
      </p>

      <div className="relative flex justify-center items-center mt-10">
        <button
          onClick={prevSlide}
          className="absolute left-0 bg-transparent text-2xl p-2 focus:outline-none"
        >
          &lt;
        </button>

        <div className="flex space-x-8 overflow-hidden">
          {teamMembers
            .slice(currentIndex, currentIndex + 3)
            .map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="rounded-full object-cover"
                />
                <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-500">{member.position}</p>
              </div>
            ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 bg-transparent text-2xl p-2 focus:outline-none"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default Team;
