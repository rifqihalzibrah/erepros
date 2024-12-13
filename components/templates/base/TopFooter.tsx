// components/TopFooter.js
const TopFooter = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/erepros-35fe1.firebasestorage.app/o/erepros-assets%2FImages%2Fpexels-carlos-montelara-3450804-5982764-copy-scaled.jpg?alt=media&token=9c9a401c-fbe2-4e51-ae50-0db4b437f34b')",
      }}
    >
      <div className="p-8 text-center text-white max-w-xl">
        <h2 className="text-4xl mb-4 font-marcellus">WORK WITH US</h2>
        <p className="mb-6">
          We remain the Top Real Estate Agents and Property Management company
          because we treat each client the way we want to be treated, and we
          want each client to feel like they are our only client.
        </p>
        <a
          href="#"
          className="px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default TopFooter;
