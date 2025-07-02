import React from "react";
import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto  max-w-7xl p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
