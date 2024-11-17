import React from "react";

const Overview = () => {
  return (
    <>
      {/* First Section */}
      <div className="pt-[136px] bg-white">
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
            {/* Text Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left lg:pr-8">
              <h1 className="text-2xl lg:text-4xl font-marcellus text-gold mb-10 text-center">
                PROPERTY MANAGEMENT
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column Content */}
                <div>
                  <h2 className="text-xl font-thin tracking-wide text-gold font-marcellus uppercase mb-4">
                    Comprehensive Tenant Management Services:
                  </h2>
                  <p className="leading-relaxed text-justify">
                    As your dedicated property management company, we handle all
                    aspects of tenant management, including addressing tenant
                    concerns, rent collection, maintenance & repairs, city &
                    township inspections, and the careful screening and placement of
                    new tenants. Enjoy peace of mind knowing that your investment is
                    expertly managed and cared for.
                  </p>
                </div>
                {/* Right Column Content */}
                <div>
                  <h2 className="text-xl font-thin tracking-wide text-gold font-marcellus uppercase mb-4">
                    Online Account Management for Owners and Tenants:
                  </h2>
                  <p className="leading-relaxed text-justify">
                    Our user-friendly online portal serves both property owners and
                    tenants alike. Tenants benefit from convenient features such as
                    rent payments, maintenance request submissions, access to lease
                    agreements, and tracking of payment history. Meanwhile, property
                    owners have access to real-time financial data, lease
                    agreements, paid invoices, and more, ensuring transparent and
                    efficient management of their properties.
                  </p>
                </div>
              </div>
            </div>
            {/* Image Section */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <img
                src="https://erepros.com/wp-content/uploads/2024/07/pexels-thirdman-8469939-scaled.jpg"
                alt="Property Management"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Second Section */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
            {/* Text Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left lg:order-2">
              {/* ... (Your text content goes here) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column Content */}
                <div>
                  <h2 className="text-xl font-thin tracking-wide text-gold font-marcellus uppercase mb-4">
                    24/7 Maintenance Support:
                  </h2>
                  <p className="leading-relaxed text-justify">
                    We offer round-the-clock maintenance assistance for tenants,
                    ensuring prompt resolution of any issues that may arise with
                    your rental property. Through our extensive network of trusted
                    contractors, we guarantee timely and reliable maintenance
                    services in all areas.
                  </p>
                </div>
                {/* Right Column Content */}
                <div>
                  <h2 className="text-xl font-thin tracking-wide text-gold font-marcellus uppercase mb-4">
                    Expert Tenant Placement Services:
                  </h2>
                  <p className="leading-relaxed text-justify">
                    For property owners who prefer a more hands-on approach, we
                    provide tailored tenant placement services. From advertising
                    your property and conducting showings to thorough tenant
                    screening and lease creation, we handle every step of the
                    process to secure qualified tenants for your rental property.
                  </p>
                </div>
              </div>
              <div className="mt-12">
                <h2 className="text-xl font-thin tracking-wide text-gold font-marcellus uppercase mb-4">
                  Transforming Properties for Profit:
                </h2>
                <p className="leading-relaxed text-justify">
                  Our Full-Service Property Management Company Goes Beyond Just
                  Management – We’re Your Partners in Property Flipping Success! At
                  Elite Real Estate Professionals, we specialize in transforming
                  distressed properties into lucrative assets. From acquisition to
                  renovation to resale, our expert team guides you through every
                  step of the flipping process. Tap into our market insights and
                  strategic upgrades to maximize your returns. Contact us to turn
                  your flipping dreams into reality!
                </p>
              </div>
            </div>
            {/* Image Section */}
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:mr-8 lg:order-1
             mt-12 lg:mt-0">
              <img
                src="https://erepros.com/wp-content/uploads/2024/07/pexels-orlovamaria-4913437-scaled.jpg"
                alt="Maintenance Support"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Overview;
