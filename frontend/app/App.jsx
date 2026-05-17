import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeContextProvider } from "@shared/context/theme.context";
import { AppContextProvider } from "@shared/context/app.context";
import { AuthContextProvider } from "@features/auth/context/auth.context";
import { AppointmentContextProvider } from "@features/appointment-system/context/appointment.context";
import { AdminContextProvider } from "@features/admin-panel/context/admin.context";
import { DoctorContextProvider } from "@features/admin-panel/context/doctor.context";
import { AppRoutes } from "./app.routes";

export default function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <AppContextProvider>
          <AuthContextProvider>
            <AppointmentContextProvider>
              <AdminContextProvider>
                <DoctorContextProvider>
                  <ToastContainer
                    position="bottom-right"
                    theme="colored"
                    toastClassName="!rounded-2xl"
                  />
                  <AppRoutes />
                </DoctorContextProvider>
              </AdminContextProvider>
            </AppointmentContextProvider>
          </AuthContextProvider>
        </AppContextProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}
