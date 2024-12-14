export default function HomePage() {
  return (
    <main className="pt-[136px]">
      {/* Hero Section */}
      <div
        className="relative h-[500px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Flending1.jpg?alt=media&token=01b6a1cc-29c3-4563-976a-9ce6cf5329bc')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-white text-5xl md:text-7xl font-marcellus z-10">
          LENDING
        </h1>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Section 2 */}
      <section className="max-w-4xl mx-auto py-16 px-6 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-marcellus text-[#9A7648] mb-6">
          Affordable Home Financing <br /> with Exceptional Service
        </h2>
        <p className="text-lg leading-relaxed mb-6 text-justify">
          At Elite Real Estate & Professional Management, we understand that
          finding the perfect home is just the beginning. That’s why we’ve
          partnered with USA Mortgage to bring you low mortgage rates,
          affordable down payment options, and expert guidance to help you
          finance the home you’ve always dreamed of.
        </p>
        <div className="text-left mx-auto max-w-2xl">
          <h3 className="text-xl font-semibold mb-3">
            Why Choose Elite Real Estate & USA Mortgage?
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Competitive mortgage rates to save you money.</li>
            <li>Flexible down payment options tailored to your budget.</li>
            <li>
              Knowledgeable mortgage experts dedicated to helping you every step
              of the way.
            </li>
          </ul>
        </div>
      </section>

      {/* Section3 */}
      <section className="bg-gold text-white py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-marcellus mb-6">
          We’re Here to Help You Achieve Your Dream Home
        </h2>
        <p className="text-lg text-justify leading-relaxed max-w-4xl mx-auto">
          At Elite Real Estate & Professional Management, we’ve partnered with
          USA Mortgage to simplify your home financing journey. With USA
          Mortgage Loan Originator, Loran Trigger, you’ll receive personalized
          attention, timely updates, and customized home financing options
          tailored to fit your unique needs. Take the first step today—contact
          Loran Trigger to get pre-qualified and explore your options.
        </p>
      </section>

      {/* Section 4 */}
      <section className="py-12 px-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Flending2.png?alt=media&token=3280683f-28cc-4735-bb5e-906dd0301de3"
            alt="USA Mortgage Logo"
            className="w-62 lg:h-52"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center justify-center h-full md:space-x-12 max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="flex flex-col md:text-left mb-6 md:mb-0">
            <h2 className="text-4xl font-marcellus text-gray-900 mb-4">
              Preferred Lenders
            </h2>
            <h3 className="text-3xl font-marcellus text-gray-700 mb-4">
              Loran Trigger
            </h3>
            <p className="text-gray-800 leading-relaxed">
              Mortgage Loan Originator <br />
              <span className="font-semibold">USA Mortgage</span> <br />
              (810)625-1091 <br />
              NMLS #2525852
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Flending3.png?alt=media&token=3a9a5157-1904-4a96-ae04-03dda8d54bee"
              alt="Loran Trigger"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section
        className="relative h-[400px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Flending4.jpg?alt=media&token=4f94c2e2-234e-493f-b4de-f9436a6a1f0b')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Text */}
        <h2 className="text-white text-3xl md:text-5xl font-marcellus z-10 text-center px-4">
          Why Get Prequalified for a Mortgage?
        </h2>
      </section>

      {/* Section 6 */}
      <section className="text-center py-12 px-6">
        {/* Description Text */}
        <p className="text-gray-800 text-lg leading-relaxed max-w-3xl mx-auto mb-8 text-justify">
          Before you start searching for your dream home, it's crucial to know
          how much home you can afford. By getting pre-qualified for a mortgage,
          you'll gain a clear understanding of your home buying budget and be
          better prepared to make competitive offers. Pre-qualification helps
          you set realistic expectations, so you can confidently dream big while
          staying within your financial limits.
        </p>

        {/* Button */}
        <a
          href="https://www.usamortgage.com/mortgage-loan-originator/loran-trigger/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gold text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#B19172] transition duration-300"
        >
          Be Ready To Buy: <br /> Get Pre-Approved Now!
        </a>
      </section>
    </main>
  );
}
