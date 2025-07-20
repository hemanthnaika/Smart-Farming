import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import ScrollToTop from "./../components/ScrollToTop";

const RootLayout = () => {
  return (
    <main className="relative">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default RootLayout;
