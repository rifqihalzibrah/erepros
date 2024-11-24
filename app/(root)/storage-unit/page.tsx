import Image from "next/image";

const StorageUnitPage = () => {
  return (
    <div className="container mx-auto pt-[136px] px-4 py-10">
      {/* Heading Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Storage Unit Management Services
        </h1>
      </section>

      {/* Content Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className="lg:w-1/2">
          <h2 className="text-lg font-semibold tracking-wide text-gray-600 uppercase mb-4">
            Efficient, Secure, and Reliable – Your Storage Solutions Partner
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            At Elite Real Estate & Professional Management, we understand that
            managing storage units requires more than just providing space; it
            demands attention to detail, top-notch security, and exceptional
            service. Our comprehensive storage unit management solutions are
            designed to meet the diverse needs of property owners, businesses,
            and individuals, ensuring a smooth and hassle-free experience for
            all.
          </p>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center">
          <Image
            src="https://erepros.com/wp-content/uploads/2024/08/10x20-1024x1024.png"
            alt="Storage Unit Illustration"
            width={600}
            height={600}
            // className="rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default StorageUnitPage;
