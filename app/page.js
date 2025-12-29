import TopSellings from "./components/TopSellings.js";
import Footer from "./components/Footer.js";
import HeroSection from "./components/HeroSection.js";
import Navbar from "./components/Navbar.js";
import NewArrivals from "./components/NewArrivals.js";
import PromoBanner from "./components/topBar.js";
import Category from "./components/Category.js";
import Testiominals from "./components/Testiominals.js";

export default function App() {
  return (
    <div className="bg-white">
      <PromoBanner />
      <Navbar />
      <HeroSection />
      {/* <TopSellings /> */}
      {/* <NewArrivals /> */}
      <Category />
      <Testiominals />
      <Footer />
    </div>
  );
}
