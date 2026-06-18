import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import Header from "../components/header";
import Footer from "../components/footer";
import { takeFlashMessage } from "../utils/auth";
import { showLoginSuccessAlert, showToast } from "../utils/sweetAlert";

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authMessage = takeFlashMessage("auth");
    const modalMessage = takeFlashMessage("login-modal");

    if (authMessage) {
      showToast(authMessage);
    }

    if (modalMessage) {
      showLoginSuccessAlert(modalMessage).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/create");
        }
      });
    }
  }, [location.key, navigate]);

  return (
    <main className="flex min-h-screen flex-col bg-base-200 text-base-content">
      <Header />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </main>
  );
}

export default AppLayout;
