import React from "react";

const counties = [
  {
    name: "WAYNE COUNTY",
    image:
      "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fwayne-county.jpg?alt=media&token=b4385804-2913-4926-9f6e-d5b8d24f3e7b",
  },
  {
    name: "GENESEE COUNTY",
    image:
      "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fgeneese-county.jpg?alt=media&token=a6782933-5d8f-4182-b686-e536975ae351",
  },
  {
    name: "SHIAWASSEE COUNTY",
    image:
      "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2FShiawassee.jpg?alt=media&token=6f7e71f1-6fe6-4ba7-a1d3-2ecc64f05bb4",
  },
  {
    name: "OAKLAND COUNTY",
    image:
      "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Foakland-county.jpg?alt=media&token=8861f310-4fe1-4807-9d54-52ce7b240ff5",
  },
  {
    name: "INGHAM COUNTY",
    image:
      "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fingham-county.jpg?alt=media&token=d3aec937-f36e-463e-b670-3018b3acc954",
  },
  {
    name: "WASHTENAW COUNTY",
    image:
      "https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fwashtenaw-county.jpg?alt=media&token=15648f09-2355-48b9-858c-3ce85f3f96ba",
  },
];

export default function SeventhSection() {
  return (
    <section className="h-screen w-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {counties.map((county) => (
          <div key={county.name} className="relative overflow-hidden group">
            {/* Background Image */}
            <img
              src={county.image}
              alt={county.name}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
              <h3 className="text-3xl text-white ">{county.name}</h3>
              <button className="mt-4 px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
