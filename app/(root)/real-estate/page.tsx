const RealEstatePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-fotoaibe-1571453-scaled.jpg?alt=media&token=4d392f26-088e-44b1-92ad-1d127e9a7e61')`,
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        {/* Text Content */}
        <div className="relative flex items-center justify-center h-full text-center">
          <h1 className="text-white font-marcellus text-5xl tracking-wider">
            REAL ESTATE
          </h1>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 px-6 md:px-12 lg:px-24 py-16 bg-white">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FPerson%2FJen-2.jpg?alt=media&token=6b4cc4f0-24ff-4e5c-b442-b2aecabac13a"
            alt="Real Estate Partner"
            className="rounded-lg shadow-lg w-full max-w-sm"
          />
        </div>

        {/* Text Section */}
        <div className="flex-grow">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-marcellus text-center md:text-left text-[#9A7648] mb-4">
            Your Trusted Real Estate Partner
          </h2>
          <p className="text-gray-700 text-justify leading-relaxed">
            We believe that real estate is more than just transactions. It’s
            about building lasting relationships, creating value, and providing
            unmatched expertise in every step of the process. Whether you’re
            buying your first home, selling a long-held property, or seeking
            professional property management, our experienced team is committed
            to delivering a seamless and rewarding experience.
          </p>
          <p className="text-gray-700 text-justify leading-relaxed mt-4">
            Let us help you navigate your real estate journey with confidence
            and peace of mind.
          </p>
        </div>
      </div>

      {/* Buyers Section */}
      <div className="bg-[#9A7648] py-6 px-6 md:px-12 lg:px-24">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-marcellus text-white">
          For Buyers: Find Your Dream Home
        </h2>
      </div>
      <div className="bg-[#F9F6F1] py-16 px-6 md:px-12 lg:px-24">
        <p className="text-gray-700 leading-relaxed mb-6">
          Buying a home is one of life’s biggest decisions, and we’re here to
          make the process smooth and stress-free. Whether you’re a first-time
          buyer or a seasoned investor, our team is dedicated to finding the
          perfect property that matches your needs, lifestyle, and budget.
        </p>

        <h3 className="text-lg font-semibold text-[#9A7648] mb-4">
          Why Buy with Us?
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <span className="font-semibold">Personalized Search:</span> We take
            the time to understand what you’re looking for and provide tailored
            property recommendations.
          </li>
          <li>
            <span className="font-semibold">Expert Market Insight:</span> With
            our deep knowledge of local real estate markets, we offer access to
            exclusive listings and insider information.
          </li>
          <li>
            <span className="font-semibold">Professional Negotiation:</span> We
            negotiate on your behalf to get you the best deal possible, ensuring
            your investment is worthwhile.
          </li>
          <li>
            <span className="font-semibold">Full-Service Support:</span> From
            property searches to securing financing, we handle every aspect of
            the buying process to make it hassle-free for you.
          </li>
        </ul>

        <p className="text-gray-700 mt-6">
          <span className="font-semibold">Ready to Start Your Search?</span>{" "}
          Check out our{" "}
          <a href="#" className="text-[#9A7648] underline hover:text-[#7A5A34]">
            current listings
          </a>{" "}
          or{" "}
          <a href="#" className="text-[#9A7648] underline hover:text-[#7A5A34]">
            contact us
          </a>{" "}
          for a personalized consultation with one of our real estate experts.
        </p>
      </div>

      {/* Buyers Section */}
      <div className="bg-[#9A7648] py-6 px-6 md:px-12 lg:px-24">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-marcellus text-white">
          For Sellers: Sell Your Property with Confidence
        </h2>
      </div>
      <div className="bg-[#F9F6F1] py-16 px-6 md:px-12 lg:px-24">
        <p className="text-gray-700 leading-relaxed mb-6">
          Selling your property is a big step, and we’re here to make sure you
          get top dollar for your home or investment. Our experienced agents
          utilize data-driven market strategies and high-quality marketing tools
          to ensure your property stands out and attracts serious buyers
          quickly.
        </p>

        <h3 className="text-lg font-semibold text-[#9A7648] mb-4">
          Why Sell with Us?
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <span className="font-semibold">Accurate Property Pricing:</span> We
            provide in-depth market analysis to ensure your home is
            competitively priced, attracting the right buyers.
          </li>
          <li>
            <span className="font-semibold">
              Advanced Marketing Strategies:
            </span>{" "}
            Using professional photography, virtual tours, and online exposure,
            we give your property the visibility it deserves.
          </li>
          <li>
            <span className="font-semibold">Seamless Transactions:</span> From
            listing to closing, we handle all aspects of the sale, making the
            process smooth and stress-free for you.
          </li>
          <li>
            <span className="font-semibold">Top-Notch Negotiation:</span> Our
            agents negotiate aggressively on your behalf to ensure you get the
            best possible terms and price for your property.
          </li>
        </ul>

        <p className="text-gray-700 mt-6">
          <span className="font-semibold">Thinking About Selling?</span> Reach
          out for a complimentary property valuation and discover how we can
          help you sell your property for maximum value.
        </p>
      </div>

      {/* Buyers Section */}
      <div className="bg-white py-16 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-pixabay-210617-2-scaled.jpg?alt=media&token=021bf41e-1edb-4789-a336-48635286f382"
              alt="Find My Dream Home"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center transition-opacity duration-300 group-hover:bg-opacity-70">
              <h3 className="text-white text-lg font-semibold uppercase">
                Find My <br /> Dream Home
              </h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-fotoaibe-1571460-2-scaled.jpg?alt=media&token=db3e50b6-1caf-4019-8f9f-aef7852d2365"
              alt="What's My Home Worth?"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center transition-opacity duration-300 group-hover:bg-opacity-70">
              <h3 className="text-white text-lg font-semibold uppercase">
                What&apos;s My <br /> Home Worth?
              </h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-ketut-subiyanto-4246097-1-2-scaled.jpg?alt=media&token=934ebd5c-ab49-4272-9d15-73b9d09aecef"
              alt="Help Me Relocate"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center transition-opacity duration-300 group-hover:bg-opacity-70">
              <h3 className="text-white text-lg font-semibold uppercase">
                Help Me <br /> Relocate
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstatePage;
