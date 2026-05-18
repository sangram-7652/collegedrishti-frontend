import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import MobileMenu from "../pages/MobileMenu";
import Footer from "../components/Footer";
import MobileFooterNav from '../components/MobileFooterNav';


const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden">
        <MobileMenu />
      </div>

      {/* Page Content */}
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Nav */}
      <div className="block md:hidden">
        <MobileFooterNav />
      </div>

    </div>
  );
};

export default Layout;
