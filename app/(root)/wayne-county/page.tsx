// app/wayneCountyPage.tsx
import Image from "next/image";
import Link from "next/link";

export default function WayneCountyPage() {
  return (
    <>
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 relative h-[500px]">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2FWayne.jpg?alt=media&token=b0779e24-c390-445b-ad02-033478a69c0e" // Update with the correct image path
            alt="Wayne County"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-1/2 px-6 md:px-12 py-8 text-gray-700">
          <h1 className="text-4xl md:text-5xl text-gold mb-6 text-center md:text-left">
            Wayne County
          </h1>
          <p className="mb-4 leading-relaxed text-justify">
            Located in southeastern Michigan, is the most populous county in the
            state and is home to the city of Detroit. Known for its rich
            history, diverse communities, and iconic landmarks such as the
            Detroit Institute of Arts and Belle Isle Park, Wayne County offers a
            vibrant mix of urban and suburban living.
          </p>
          <p className="leading-relaxed text-justify">
            Explore the bustling downtown area of Detroit, visit the Henry Ford
            Museum in Dearborn, or enjoy the scenic beauty of the Detroit River.
            Wayne County is a cultural and economic hub with plenty to offer
            residents and visitors alike.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white">
        {/* Right Section - Image (First on mobile, Second on laptop) */}
        <div className="w-full md:w-1/2 relative h-[500px] order-first md:order-last">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fcounty-detail%2Fwayne%2Fcity1.jpg?alt=media&token=e8af8d49-90e0-4a55-8e37-ffacccdd154d"
            alt="Detroit City"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Left Section - Content */}
        <div className="w-full md:w-1/2 px-6 md:px-12 py-8 text-gray-700">
          <h2 className="text-4xl md:text-5xl text-gold mb-6 text-center md:text-left">
            Cities We Serve:
          </h2>
          <h3 className="text-3xl md:text-4xl text-gold mb-6 text-center md:text-left">
            Detroit, MI
          </h3>
          <ul className="list-disc pl-5 mb-6 text-justify">
            <li className="mb-2">
              <strong>Affordable Real Estate:</strong> Detroit offers affordable
              real estate prices, allowing investors to acquire properties at a
              lower cost and potentially achieve higher returns.
            </li>
            <li className="mb-2">
              <strong>Urban Revitalization:</strong> The city is undergoing
              revitalization efforts, attracting new residents, businesses, and
              investors to contribute to its growth.
            </li>
            <li>
              <strong>Strong Rental Demand:</strong> Detroit has a strong rental
              market with a high demand for rental properties, driven by
              population growth and job opportunities.
            </li>
          </ul>
          <div className="w-full flex justify-center items-center">
            <Link
              href="https://detroitmi.gov/"
              target="_blank"
              className="inline-block bg-gold text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#84623e] transition"
            >
              Learn More About Detroit
            </Link>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-center bg-white">
        {/* Left Section - Content */}
        <div className="w-full md:w-1/2 px-6 md:px-12 py-8 text-gray-700 ">
          <h2 className="text-3xl md:text-4xll text-gold mb-6 text-center md:text-left">
            Dearborn, MI
          </h2>
          <ul className="list-disc pl-5 mb-6 text-justify">
            <li className="mb-2">
              <strong>Affordable Housing Options:</strong> Dearborn offers a
              range of affordable housing options, making it an attractive
              choice for families, young professionals, and real estate
              investors.
            </li>
            <li className="mb-2">
              <strong>Economic Hub:</strong> Home to the headquarters of Ford
              Motor Company, Dearborn is a significant economic hub with ample
              job opportunities and a thriving local economy.
            </li>
            <li className="mb-2">
              <strong>Educational Excellence:</strong> Dearborn boasts excellent
              schools and is home to institutions like the University of
              Michigan-Dearborn and Henry Ford College, providing top-tier
              education options.
            </li>
            <li>
              <strong>Proximity to Detroit:</strong> Located just minutes from
              downtown Detroit, Dearborn provides easy access to the amenities,
              entertainment, and job opportunities of a major city while
              maintaining its suburban charm.
            </li>
          </ul>
          <div className="w-full flex justify-center items-center">
            <Link
              href="https://cityofdearborn.org/"
              target="_blank"
              className="inline-block bg-gold text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#84623e] transition"
            >
              Learn More About Dearborn
            </Link>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 relative h-[500px] order-first md:order-last">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fcounty-detail%2Fwayne%2Fcity2.jpg?alt=media&token=122d5f43-c367-4b97-9564-cb9f9e3d68ee"
            alt="Dearborn City"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>

      {/* Section 4 */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white">
        {/* Left Section - Content */}
        <div className="w-full md:w-1/2 px-6 md:px-12 py-8 text-gray-700">
          <h2 className="text-3xl md:text-4xl text-gold mb-6 text-center md:text-left">
            Wyandotte, MI
          </h2>
          <ul className="list-disc pl-5 mb-6 text-justify">
            <li className="mb-2">
              <strong>Growing Local Economy:</strong> Wyandotte&apos;s local
              economy is on the rise, with new businesses and developments
              contributing to a vibrant and thriving community.
            </li>
            <li className="mb-2">
              <strong>Waterfront Living:</strong> Nestled along the Detroit
              River, Wyandotte offers beautiful waterfront views and
              recreational activities, enhancing the quality of life for
              residents.
            </li>
            <li className="mb-2">
              <strong>Affordable Real Estate:</strong> Wyandotte offers
              relatively affordable real estate options compared to nearby
              metropolitan areas, making it an attractive option for homebuyers
              and investors.
            </li>
            <li>
              <strong>Proximity to Major Cities:</strong> Located just a short
              drive from Detroit, Wyandotte provides easy access to the
              amenities and job opportunities of a major city while maintaining
              a small-town feel.
            </li>
          </ul>
          <div className="w-full flex justify-center items-center">
            <Link
              href="https://cityofdearborn.org/"
              target="_blank"
              className="inline-block bg-gold text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#84623e] transition"
            >
              Learn More About Dearborn
            </Link>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 relative h-[500px] order-first md:order-last">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fcounty-detail%2Fwayne%2Fcity3.jpg?alt=media&token=093ba07e-16f1-4bc4-81a4-1d2a582d2cbb"
            alt="Wyandotte City"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </>
  );
}
