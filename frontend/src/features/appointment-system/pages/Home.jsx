import Hero from "../components/Hero";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import Marquee from "@shared/components/Marquee";

const trustItems = [
  "10,000+ patients",
  "500+ vetted doctors",
  "24/7 instant booking",
  "Secure payments",
  "Verified specialists",
  "Insurance accepted",
  "Telemedicine ready",
  "60-second checkout",
];

const Home = () => {
  return (
    <div className="pt-2">
      <Hero />
      <div className="mt-10 border-y border-line py-4">
        <Marquee items={trustItems} speed={45} />
      </div>
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
