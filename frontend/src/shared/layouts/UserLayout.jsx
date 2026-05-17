import { Outlet } from "react-router-dom";
import Navbar from "@shared/components/Navbar";
import Footer from "@shared/components/Footer";
import ScrollToTop from "@shared/components/ScrollToTop";
import PageTransition from "@shared/components/PageTransition";
import GradientBlobs from "@shared/components/GradientBlobs";

const UserLayout = () => {
  return (
    <div className="min-h-screen relative">
      <GradientBlobs />
      <ScrollToTop />
      <Navbar />
      <main className="px-4 md:px-8 max-w-[1400px] mx-auto">
        <PageTransition>
          <Outlet />
        </PageTransition>
        <Footer />
      </main>
    </div>
  );
};

export default UserLayout;
