import { Outlet } from "react-router";

import Header from "../components/header";
import Footer from "../components/footer";

function AppLayout() {
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
