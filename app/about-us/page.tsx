import React from "react";

const AboutUs = () => {
  return (
    <>
      <section className="about-us-container max-w-7xl mx-auto py-16 px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between lg:min-h-[500px]">
          {/* Left Image Section with Jennifer's Name */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-center text-center lg:text-left lg:pr-12">
            <img
              src="https://erepros.com/wp-content/uploads/2024/07/IMG_8514-1024x1024.jpg"
              alt="Jennifer Oliver"
              className="rounded-lg w-full h-auto object-cover mb-4"
            />
            <div className="mt-4">
              <h3 className="text-2xl text-[#9a7648]">JENNIFER OLIVER</h3>
              <p className="text-lg text-gray-600 text-center">Founder & CEO</p>
            </div>
          </div>

          {/* Right Text Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:pl-12">
            <div className="max-w-prose">
              <h2 className="text-5xl fontbold text-[#917648] mb-6 text-center lg:text-left">
                ABOUT US
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed text-justify">
                Welcome to Elite Real Estate & Professional Management, a
                woman-owned business that has grown from humble beginnings to
                become a leading force in the Michigan real estate market.
                Founded with determination and a vision for excellence, we now
                proudly own and manage over 2,000 properties across the state.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed text-justify">
                Our story is one of resilience and ambition. Starting from
                nothing, our founder transformed a passion for real estate into
                a thriving business empire. Through hard work, dedication, and a
                commitment to integrity, we have become a trusted name in real
                estate and property management.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-vision-container max-w-7xl mx-auto py-16 px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-12">
          {/* Left Text Section */}
          <div className="w-full lg:w-1/2">
            {/* Mission Section */}
            <div className="mb-12 text-center">
              <h2 className="text-4xl  text-[#917648] mb-6 text-center">
                MISSION
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed text-justify">
                Our mission is to deliver exceptional service that goes above
                and beyond our clients' expectations. We are dedicated to
                helping you achieve your real estate goals by offering
                personalized service, expert guidance, and innovative solutions.
                Whether you are buying, selling, leasing, or need professional
                property management, we are here to support you every step of
                the way.
              </p>
            </div>

            {/* Vision Section */}
            <div className="text-center">
              <h2 className="text-4xl  text-[#917648] mb-6 text-center">
                VISION
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed text-justify">
                At the core of our business are the values of professionalism,
                integrity, and customer satisfaction. These principles guide
                every transaction and interaction, ensuring that we provide the
                highest standard of service. We believe in building long-lasting
                relationships based on trust and transparency, leading to mutual
                success.
              </p>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <img
              src="https://erepros.com/wp-content/uploads/2024/08/pexels-a-darmel-7641903-683x1024-2.jpg"
              alt="Happy Couple with Keys"
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      <section className="why-choose-us-container max-w-7xl mx-auto py-16 px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-12">
          {/* Left Image Section */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://erepros.com/wp-content/uploads/2024/08/pexels-orlovamaria-4946438-683x1024-1.jpg"
              alt="Beautiful Balcony with Flowers"
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>

          {/* Right Text Section */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <h2 className="text-4xl text-[#917648] mb-6 text-center">
              WHY CHOOSE US?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-justify mb-6">
              Choosing Elite Real Estate & Professional Management means
              partnering with a team that is dedicated to your success. Our
              reputation for excellence is built on our unwavering commitment to
              our clients and our ability to deliver results that exceed
              expectations.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-justify mb-6">
              As a women-owned business, we are proud of our journey and the
              impact we have made in the Michigan real estate market. Our story
              is a testament to the power of hard work, resilience, and a
              commitment to excellence.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-justify mb-6">
              Thank you for considering Elite Real Estate & Professional
              Management for your real estate needs. We look forward to the
              opportunity to serve you with dedication and expertise, helping
              you navigate the real estate landscape with confidence and ease.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              Discover the difference with Elite Real Estate & Professional
              Management. Let us help you turn your real estate dreams into
              reality.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
