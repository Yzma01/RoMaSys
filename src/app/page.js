import Footer from "../components/landing-page/Footer";
import Galerie from "../components/landing-page/Galerie";
import Hero from "../components/landing-page/Hero";
import HeroCard from "../components/landing-page/HeroCard";
import Membership from "../components/landing-page/Membership";
import NavBar from "../components/landing-page/NavBar";


export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <Hero />
      <HeroCard />
      <Galerie />
      <Membership />
      <Footer />
    </div>
  );
}
