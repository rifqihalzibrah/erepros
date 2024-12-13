import React, { ReactNode } from "react";

interface ContentWithImageProps {
  children: ReactNode; // Type for children
  imageUrl: string; // Type for image URL
  imageAlt: string; // Type for image alt text
  reverse?: boolean; // Optional type for reverse layout
}

const ContentWithImage: React.FC<ContentWithImageProps> = ({
  children,
  imageUrl,
  imageAlt,
  reverse = false,
}) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-10 bg-white min-h-screen transition-opacity duration-1000">
      {/* Conditionally render content and image based on reverse prop */}
      {reverse ? (
        <>
          {/* Right Side: Image */}
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left px-4 md:pl-10">
            {children}
          </div>
        </>
      ) : (
        <>
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left px-4 md:pr-10 mb-6 md:mb-0">
            {children}
          </div>

          {/* Right Side: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </>
      )}
    </section>
  );
};

export default ContentWithImage;
