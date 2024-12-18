// app/ShiawasseeCountyPage.tsx
import Image from "next/image";
import Link from "next/link";

export default function ShiawasseeCountyPage() {
  return (
    <>
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 relative h-[500px]">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fcounty-detail%2Fshiawassee%2FShiawassee.jpg?alt=media&token=725b01c4-1345-46f6-b89e-e19f4dec7e16" // Update with the correct image path
            alt="Shiawassee County"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-1/2 px-6 md:px-12 py-8 text-gray-700">
          <h1 className="text-4xl md:text-5xl text-gold mb-6 text-center md:text-left">
            Shiawassee County
          </h1>
          <p className="mb-4 leading-relaxed text-justify">
            Nestled in central Michigan, Shiawassee County offers a peaceful
            retreat from the hustle and bustle of city life. With picturesque
            small towns, fertile farmland, and historic sites, the county is a
            hidden gem for those seeking a slower pace of life.
          </p>
          <p className="leading-relaxed text-justify">
            Experience the charm of Owosso&apos;s historic downtown, explore the
            trails at Curwood Castle Park, or attend events at the Shiawassee
            County Fairgrounds. Shiawassee County is a welcoming community with
            a strong sense of history and tradition.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white">
        {/* Right Section - Image (First on mobile, Second on laptop) */}
        <div className="w-full md:w-1/2 relative h-[500px] order-first md:order-last">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fcounty-detail%2Fshiawassee%2Fcity1.jpg?alt=media&token=e05d9b95-1577-49cc-a737-f08c635da38a"
            alt="Owosso City"
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
            Owosso, MI
          </h3>
          <p className="mb-4 leading-relaxed text-justify">
            Discover Owosso, Michigan—a charming city offering a blend of
            small-town charm and modern amenities. Owosso provides affordable
            real estate, making it an attractive destination for homebuyers and
            investors. The city boasts excellent schools, cultural attractions
            like the historic Steam Railroading Institute, and outdoor
            activities along the Shiawassee River.
          </p>
          <p className="leading-relaxed text-justify">
            Residents enjoy a strong sense of community with local events, a
            vibrant downtown, and diverse dining options. Conveniently located
            between Lansing and Flint, Owosso offers easy access to urban
            amenities while maintaining its welcoming, close-knit atmosphere.
          </p>
          <div className="w-full flex justify-center items-center">
            <Link
              href="https://www.ci.owosso.mi.us/"
              target="_blank"
              className="inline-block bg-gold text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#84623e] transition"
            >
              Learn More About Owosso
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
