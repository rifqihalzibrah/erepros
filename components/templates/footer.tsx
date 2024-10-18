import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

// components/Footer.js
const Footer = () => {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Layer 1: Logo - Left Aligned */}
        <div className="flex justify-start mb-8">
          <img
            src="https://erepros.com/wp-content/uploads/2024/08/REAL-ESTATE-real-logo-2-1024x642.png"
            alt="Company Logo"
            className="w-36 md:w-48"
          />
        </div>

        {/* Layer 2: Contact Us, Office Hours, Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-800">
          {/* Contact Us */}
          <div className="space-y-4">
            <p className="uppercase text-sm font-semibold text-[#9a7648]">
              Contact Us
            </p>
            <div className="text-sm">
              <p>5349 Fenton Rd, Grand Blanc MI 48507</p>
              <p>(810) 715-5486</p>
              <p>
                <a href="mailto:info@erepros.com" className="hover:underline">
                  info@erepros.com
                </a>
              </p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="space-y-4">
            <p className="uppercase text-sm font-semibold text-[#9a7648]">
              Office Hours
            </p>
            <ul className="text-sm space-y-1">
              <li className="flex">
                <span className="w-1/3">Monday:</span>
                <span className="w-2/3">09:00 am – 05:00 pm</span>
              </li>
              <li className="flex">
                <span className="w-1/3">Tuesday:</span>
                <span className="w-2/3">09:00 am – 05:00 pm</span>
              </li>
              <li className="flex">
                <span className="w-1/3">Wednesday:</span>
                <span className="w-2/3">09:00 am – 03:00 pm</span>
              </li>
              <li className="flex">
                <span className="w-1/3">Thursday:</span>
                <span className="w-2/3">09:00 am – 05:00 pm</span>
              </li>
              <li className="flex">
                <span className="w-1/3">Friday:</span>
                <span className="w-2/3">09:00 am – 02:00 pm</span>
              </li>
            </ul>
          </div>

          {/* Owner & Investor Quick Links */}
          <div className="space-y-4">
            <p className="uppercase text-sm font-semibold text-[#9a7648]">
              Owner & Investor Quick Links
            </p>
            <ul className="text-sm space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Owner Login
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Tenant Quick Links */}
          <div className="space-y-4">
            <p className="uppercase text-sm font-semibold text-[#9a7648]">
              Tenant Quick Links
            </p>
            <ul className="text-sm space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Tenant Login
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Move-in Checklist
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Layer 3: Get Social - Left Aligned */}
        <div className="flex items-center space-x-4 mt-8">
          <p className="uppercase text-sm font-semibold text-[#9a7648]">
            Get Social
          </p>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 border-2 border-[#9a7648] rounded-full text-[#9a7648] hover:bg-[#9a7648] hover:text-white transition duration-300 text-xl"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 border-2 border-[#9a7648] rounded-full text-[#9a7648] hover:bg-[#9a7648] hover:text-white transition duration-300 text-xl"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Layer 4: Powered by and Logos */}
        <div className="border-t mt-8 pt-6 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0">
            <p className="text-center md:text-left">
              Real Estate and Property Management Website powered by TsuseTech.
              <br />
              All information is deemed reliable but not guaranteed and should
              be independently reviewed or verified.
            </p>
            <p className="text-center md:text-right">&copy; 2024</p>
          </div>

          <div className="flex justify-center md:justify-start mt-6 space-x-8">
            <img
              src="https://erepros.com/wp-content/uploads/2024/08/resized_image_3-1024x264.png"
              alt="Realtor Logo"
              className="h-10"
            />
            <img
              src="https://erepros.com/wp-content/uploads/2024/08/equal-housing-opportunity-logo-black-1024x978.png"
              alt="Equal Housing Logo"
              className="h-10"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
