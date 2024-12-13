import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link
      href="/erepros-management-control"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="flex items-center justify-center h-6 w-7 flex-shrink-0">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLogo%2FREAL-ESTATE-real-logo-2-1024x642.png?alt=media&token=c3f29aea-f715-426d-8903-1eb4dc35d483"
          alt="Company Logo"
          className="w-36 md:w-48"
          width={300}
          height={150}
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        EREPROS MANAGEMENT
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="flex items-center justify-center h-6 w-7 flex-shrink-0">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FLogo%2FREAL-ESTATE-real-logo-2-1024x642.png?alt=media&token=c3f29aea-f715-426d-8903-1eb4dc35d483"
          alt="Company Logo"
          className="w-36 md:w-48"
          width={300}
          height={150}
        />
      </div>
    </Link>
  );
};
