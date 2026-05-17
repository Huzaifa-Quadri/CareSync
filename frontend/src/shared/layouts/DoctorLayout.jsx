import { Outlet } from "react-router-dom";
import AdminNavbar from "@features/admin-panel/components/AdminNavbar";
import Sidebar from "@features/admin-panel/components/Sidebar";
import PageTransition from "@shared/components/PageTransition";
import GradientBlobs from "@shared/components/GradientBlobs";

const DoctorLayout = () => (
  <div className="min-h-screen bg-canvas relative">
    <GradientBlobs />
    <AdminNavbar role="doctor" />
    <div className="flex items-start gap-4 md:gap-6 px-4 md:px-6 pb-6">
      <Sidebar role="doctor" />
      <main className="flex-1 min-w-0 pt-4">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  </div>
);

export default DoctorLayout;
