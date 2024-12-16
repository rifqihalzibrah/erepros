// pages/TenantBenefitPackage.tsx
"use client";

import IconWithTitle from "@/components/ui/IconWithTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CustomButtonLink from "@/components/ui/CustomButtonLink";

const TenantBenefitPackage = () => {
  return (
    <main className="pt-[136px] bg-white">
      {/* Third Section */}
      <AnimatedSection>
        <section
          className={`flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-10 bg-white min-h-screen transition-opacity duration-1000 transform`}
        >
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left px-4 md:pr-10">
            <h2 className="text-4xl font-serif text-[#bfaf9e] mb-16 uppercase">
              Tenant Benefit Package
            </h2>
            <IconWithTitle
              iconSrc="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FIcons%2FMonthly-and-Annual-Accounting-Statement-Preparation-1-1024x936.png?alt=media&token=13831cb2-8fdf-4ce6-a15b-15d7b92cce4e"
              title="Online Tenant Portal"
            />
            <ul className="list-disc list-inside text-gray-600 mb-8">
              <li>
                Take at least two pictures of each item you are requesting
                service for and text them to (810) 715-5486
              </li>
              <li>Give as much of a detailed description as possible.</li>
            </ul>

            <IconWithTitle
              iconSrc="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FIcons%2FMaintenance-and-Repairs-1-1024x982.png?alt=media&token=0c128140-9210-43cc-99a5-bef423ed4cf8"
              title="24/7 Emergency Maintenance"
            />
            <p className="mb-8">
              We have staff on call after hours and weekends to service all
              emergency calls to ensure the health and safety of our tenants.
            </p>

            <IconWithTitle
              iconSrc="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FIcons%2FMonthly-and-Annual-Accounting-Statement-Preparation-1-1-1024x936.png?alt=media&token=0dafb807-0bcd-421b-aaa5-91861da14f86"
              title="Credit Reporting"
            />
            <p>
              We report your monthly payments to major credit bureaus which may
              help to increase your credit score up to 100 points!
            </p>
          </div>

          {/* Right Side: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-cottonbro-4568697-1-1024x683.jpg?alt=media&token=3d090e30-ef4e-4b3b-aec8-3ca730fee2be"
              alt="Family moving out"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </section>
      </AnimatedSection>

      {/* Fourth Section */}
      <AnimatedSection>
        <section
          className={`flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-10 bg-white min-h-screen transition-opacity duration-1000 transform`}
        >
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-cottonbro-4569340-1-1024x683.jpg?alt=media&token=f97a0d81-cda7-4c02-9146-adb72b273409"
              alt="Family key turn-in"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left md:pl-10 px-4">
            <p className="text-gray-600 mb-6 text-justify">
              All of our tenants receive these benefits for a monthly cost of
              $10/month. All Elite Real Estate & Professional Management tenants
              will be enrolled and receive the included benefits upon lease
              signing. There is currently no option to opt-out of this services
              package.
            </p>
            <div className="flex justify-center items-center w-full pt-5">
              <CustomButtonLink
                link="/available-rentals"
                text="See Available Listings"
              ></CustomButtonLink>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
};

export default TenantBenefitPackage;
