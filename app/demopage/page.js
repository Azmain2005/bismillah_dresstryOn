import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Qr_part from "../components/Qr_part";
import PromoBanner from "../components/topBar";
import TopSellings from "../components/TopSellings";

export default function DemoPage() {
  return (
    <div>
      <PromoBanner />
      <Navbar />
      <Qr_part />
      <TopSellings />

      <Footer />
    </div>
  );
}

 