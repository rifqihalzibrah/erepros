// app/GeneeseCountyPage.tsx
import Image from "next/image";
import Link from "next/link";

export default function GeneeseCountyPage() {
  return (
    <>
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 relative h-[500px]">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fcounty-detail%2Fgeneese%2FGenesee.jpg?alt=media&token=7832eb78-8f0e-474c-b091-e57d633d4d44" // Update with the correct image path
            alt="Geneese County"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-1/2 px-6 md:px-12 py-8 text-gray-700">
          <h1 className="text-4xl md:text-5xl text-gold mb-6 text-center md:text-left">
            Geneese County
          </h1>
          <p className="mb-4 leading-relaxed text-justify">
            Genesee County, situated in eastern central Michigan, boasts a blend
            of urban and rural landscapes. The county is anchored by the city of
            Flint, known for its industrial history and resilient community
            spirit.
          </p>
          <p className="leading-relaxed text-justify">
            Discover the natural beauty of Genesee County at places like
            Crossroads Village & Huckleberry Railroad or explore the arts and
            culture scene at the Flint Institute of Arts. Outdoor enthusiasts
            can enjoy activities at parks like For-Mar Nature Preserve &
            Arboretum.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white">
        {/* Right Section - Image (First on mobile, Second on laptop) */}
        <div className="w-full md:w-1/2 relative h-[500px] order-first md:order-last">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fcounty-detail%2Fgeneese%2Fcity1.jpg?alt=media&token=7f85d39c-e948-46c3-87ab-9345866d41aa"
            alt="Flint City"
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
            Flint, MI
          </h3>
          <p className="mb-4 leading-relaxed text-justify">
            Flint, MI presents an incredible opportunity for real estate
            investors with its affordable real estate prices. Compared to many
            other cities in the United States, Flint offers some of the best
            property deals, making it an attractive option for those looking to
            maximize their investment potential. The city's steady rental
            demand, bolstered by a local university, hospitals, and numerous
            employers, ensures a constant need for rental properties.
          </p>
          <p className="leading-relaxed text-justify">
            This steady demand, combined with Flint's affordable property
            prices, creates a lucrative chance for investors to achieve positive
            cash flow from their rentals. Moreover, while past trends do not
            guarantee future outcomes, there is potential for property
            appreciation as Flint continues to develop and grow.
          </p>
          <div className="w-full flex justify-center items-center">
            <Link
              href="https://www.cityofflint.com/"
              target="_blank"
              className="inline-block bg-gold text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#84623e] transition"
            >
              Learn More About Flint
            </Link>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-center bg-white">
        {/* Left Section - Content */}
        <div className="w-full md:w-1/2 px-6 md:px-12 py-8 text-gray-700 ">
          <h2 className="text-3xl md:text-4xll text-gold mb-6 text-center md:text-left">
            Clio, MI
          </h2>
          <ul className="list-disc pl-5 mb-6 text-justify">
            <li className="mb-2">
              <strong>Affordable Real Estate:</strong> Clio provides affordable
              housing options, making it an attractive location for first-time
              homebuyers and investors looking for lower-cost properties.
            </li>
            <li className="mb-2">
              <strong>Strong Sense of Community:</strong> With numerous local
              events, festivals, and community gatherings, Clio fosters a strong
              sense of community and belonging among its residents.
            </li>
            <li className="mb-2">
              <strong>Proximity to Major Cities:</strong> Clio is conveniently
              located near Flint and Saginaw, providing easy access to urban
              amenities and employment opportunities while retaining its rural
              charm.
            </li>
            <li>
              <strong>Growing Local Economy:</strong> Clio&apos;s economy is
              experiencing growth, with new businesses and developments
              contributing to the city&apos;s vitality and providing job
              opportunities for residents.
            </li>
          </ul>
          <div className="w-full flex justify-center items-center">
            <Link
              href="https://clio.govoffice.com/"
              target="_blank"
              className="inline-block bg-gold text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#84623e] transition"
            >
              Learn More About Clio
            </Link>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 relative h-[500px] order-first md:order-last">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fcounty-detail%2Fgeneese%2Fcity2.jpg?alt=media&token=b7e0eb2f-3a75-46d4-b719-df864cf3b91e"
            alt="Clio City"
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
            Flushing, MI
          </h2>
          <ul className="list-disc pl-5 mb-6 text-justify">
            <li className="mb-2">
              <strong>Charming Suburban Lifestyle:</strong> Flushing offers a
              peaceful suburban environment, making it an ideal place for
              families and individuals seeking a tranquil living experience.
            </li>
            <li className="mb-2">
              <strong>Affordable Housing:</strong> Flushing provides a range of
              affordable housing options, making it an attractive location for
              homebuyers and real estate investors alike.
            </li>
            <li className="mb-2">
              <strong>Top-Rated Schools:</strong> Flushing is known for its
              excellent schools, providing high-quality education and a variety
              of extracurricular activities for children.
            </li>
            <li>
              <strong>Abundant Recreational Opportunities:</strong> The city
              boasts numerous parks, trails, and recreational facilities,
              offering residents plenty of options for outdoor activities and
              leisure.
            </li>
            <li>
              <strong>Stable Local Economy:</strong> Flushing has a stable and
              growing economy, with new businesses and developments contributing
              to the city&apos;s prosperity and offering job opportunities for
              residents.
            </li>
          </ul>
          <div className="w-full flex justify-center items-center">
            <Link
              href="https://www.flushingcity.com/"
              target="_blank"
              className="inline-block bg-gold text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#84623e] transition"
            >
              Learn More About Flushing
            </Link>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 relative h-[500px] order-first md:order-last">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fcounty-detail%2Fgeneese%2Fcity3.jpg?alt=media&token=c5f4fee1-a9c5-4ba5-9518-86b11ea5bd1a "
            alt="Flushing City"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </>
  );
}
