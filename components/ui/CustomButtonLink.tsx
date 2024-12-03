// components/ui/Button.tsx
import React from "react";
import Link from "next/link";

interface ButtonProps {
  text: string;
  link: string;
}

const CustomButtonLink: React.FC<ButtonProps> = ({ text, link }) => {
  return (
    <Link
      href={link}
      className="inline-block bg-gold text-white font-bold py-2 px-6 rounded-full hover:bg-white hover:text-gold hover:border-1 hover:border-gold transition duration-300"
    >
      {text}
    </Link>
  );
};

export default CustomButtonLink;
