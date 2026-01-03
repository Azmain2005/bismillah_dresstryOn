import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewArrival from "../components/NewArrivals";
import Qr_part from "../components/Qr_part";
import TopSellings from "../components/TopSellings";

export default function DemoPage() {
  return (
    <div>
      <Navbar />
      <Qr_part />
      <NewArrival />

      <Footer />
    </div>
  );
}

 