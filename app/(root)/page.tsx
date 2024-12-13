import HeroSectionHomePage from "../../components/ui/home-page/HeroSectionHomePage";
import SecondSection from "../../components/ui/home-page/SecondSection";
import ThirdSection from "@/components/ui/home-page/ThirdSection";
import FourthSection from "@/components/ui/home-page/FourthSection";
import FifthSection from "@/components/ui/home-page/FifthSection";
import Accordion from "@/components/templates/home-page/Accordion";
import LogoCarousel from "@/components/templates/home-page/logo-carousel";
import PropertyCarousel from "../../components/templates/home-page/carousel-component"; // Adjust the path based on your folder structure

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {" "}
      {/* Ensure no horizontal scroll */}
      <HeroSectionHomePage />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <Accordion />
      {/* Logo Carousel Section */}
      <section className="max-w-7xl mx-auto py-16 sm:px-8 px-4 transition-opacity duration-1000">
        <LogoCarousel />
      </section>
      {/* Featured Rentals */}
      <section className="max-w-7xl mx-auto py-16 sm:px-8 px-4 transition-opacity duration-1000">
        <h2 className="font-marcellus text-5xl text-gold text-center mb-8">
          Featured Rentals
        </h2>
        <div className="w-full overflow-hidden">
          <PropertyCarousel />
        </div>
      </section>
      {/* Featured Storage Unit */}
      <section className="max-w-7xl mx-auto pb-16 sm:px-8 px-4 transition-opacity duration-1000">
        <h2 className="font-marcellus text-5xl text-gold text-center mb-8">
          Featured Storage Unit
        </h2>
        <div className="w-full overflow-hidden">
          <PropertyCarousel filterType="Other" />
        </div>
      </section>
    </main>
  );
}
