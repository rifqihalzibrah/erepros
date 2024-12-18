// app/InghamCountyPage.tsx
import Image from "next/image";
import Link from "next/link";

export default function InghamCountyPage() {
  return (
    <>
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 relative h-[500px]">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fcounty-detail%2Fingham%2FIngham.jpg?alt=media&token=cdeae684-f671-4116-8f9d-59884b0b9712" // Update with the correct image path
            alt="Ingham County"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-1/2 px-6 md:px-12 py-8 text-gray-700">
          <h1 className="text-4xl md:text-5xl text-gold mb-6 text-center md:text-left">
            Ingham County
          </h1>
          <p className="mb-4 leading-relaxed text-justify">
            Ingham County, home to the state capital of Lansing and Michigan
            State University, offers a dynamic blend of government, education,
            and culture. Explore the Michigan State Capitol building, cheer on
            the Spartans at a sporting event, or stroll along the Grand River.
          </p>
          <p className="leading-relaxed text-justify">
            Immerse yourself in the arts scene at venues like the Wharton Center
            for Performing Arts, discover the history of Old Town Lansing, or
            enjoy outdoor recreation at parks like Hawk Island Park. Ingham
            County is a diverse and vibrant community with something for
            everyone.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white">
        {/* Right Section - Image (First on mobile, Second on laptop) */}
        <div className="w-full md:w-1/2 relative h-[500px] order-first md:order-last">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fcounty-detail%2Fingham%2Fcity1.jpg?alt=media&token=107d30bc-90f3-4079-a619-216a8dcb087b"
            alt="Lansing City"
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
            Lansing, MI
          </h3>
          <ul className="list-disc pl-5 mb-6 text-justify">
            <li className="mb-2">
              <strong>Government Employment:</strong> Lansing is the capital of
              Michigan and home to many state government offices, providing a
              stable tenant base.
            </li>
            <li className="mb-2">
              <strong>Affordable Housing:</strong> Lansing offers affordable
              housing options for both renters and investors, making it a
              favorable market for real estate investments.
            </li>
            <li className="mb-2">
              <strong>Proximity to Universities:</strong> With several
              universities in the area, Lansing attracts students and faculty
              members in need of rental housing.
            </li>
          </ul>
          <div className="w-full flex justify-center items-center">
            <Link
              href="https://www.lansingmi.gov/"
              target="_blank"
              className="inline-block bg-gold text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#84623e] transition"
            >
              Learn More About lansing
            </Link>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-center bg-white">
        {/* Left Section - Content */}
        <div className="w-full md:w-1/2 px-6 md:px-12 py-8 text-gray-700 ">
          <h2 className="text-3xl md:text-4xll text-gold mb-6 text-center md:text-left">
            East Lansing, MI
          </h2>
          <ul className="list-disc pl-5 mb-6 text-justify">
            <li className="mb-2">
              <strong>Home to Michigan State University:</strong> East Lansing
              is home to Michigan State University, providing a steady demand
              for rental properties from students, faculty, and staff.
            </li>
            <li className="mb-2">
              <strong>College Town Atmosphere:</strong> The city has a vibrant
              college town atmosphere with a range of dining, entertainment, and
              cultural offerings, appealing to renters.
            </li>
            <li className="mb-2">
              <strong>Investment Potential:</strong> With a growing population
              and ongoing development projects, East Lansing offers potential
              for property appreciation and rental income growth.
            </li>
          </ul>
          <div className="w-full flex justify-center items-center">
            <Link
              href="https://www.cityofeastlansing.com/"
              target="_blank"
              className="inline-block bg-gold text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#84623e] transition"
            >
              Learn More About East Lansing
            </Link>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 relative h-[500px] order-first md:order-last">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fcounty-detail%2Fingham%2Fcity2.jpg?alt=media&token=57424ed2-708e-44f5-9c73-a5b5ddf96de6"
            alt="Lansing City"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </>
  );
}
