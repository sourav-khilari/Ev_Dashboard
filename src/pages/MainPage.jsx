import React from 'react';
import Navbar from './Navbar.jsx';
import { Outlet } from "react-router-dom";
import  {DataProvider}  from "../context/DataContext.jsx";
import Footer from "../components/Footer.jsx";

function MainPage() {
  return (
    <DataProvider>
      <div className="flex flex-col min-h-screen w-screen">
        <Navbar />
        <div className="flex-1 mt-16 px-4 md:px-8 py-4 w-full" >
          <Outlet />
        </div>

        <Footer />
      </div>
    </DataProvider>
  );
}
export default MainPage;