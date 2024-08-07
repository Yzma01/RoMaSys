import Galerie from "../components/Galerie";
import Hero from "../components/Hero";
import HeroCard from "../components/HeroCard";
import NavBar from "../components/NavBar";


export default function Home() {
  return (
    <div className="overflow-x-hidden">
        <NavBar />
        <Hero />
        <Galerie />
    </div>
  );
}
