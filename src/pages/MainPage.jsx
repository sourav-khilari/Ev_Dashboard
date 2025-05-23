// import React from 'react';
// import Navbar from '../components/NavBar.jsx';
// import { Outlet } from "react-router-dom";
// import  {DataProvider}  from "../context/DataContext.jsx";
// import Footer from "../components/Footer.jsx";

// function MainPage() {
//   return (
//     <DataProvider>
//       <div className="flex flex-col min-h-screen w-screen">
//         <Navbar />
//         <div className="flex-1 mt-16 px-4 md:px-8 py-4 w-full" >
//           <Outlet />
//         </div>

//         <Footer />
//       </div>
//     </DataProvider>
//   );
// }
// export default MainPage;


import React from 'react';
import Navbar from '../components/NavBar.jsx';
import { Outlet } from "react-router-dom";
import { DataProvider } from "../context/DataContext.jsx";
import Footer from "../components/Footer.jsx";

function MainPage() {
  return (
    <DataProvider>
      <div className="flex flex-col min-h-screen w-screen">
        <Navbar />
        <div className="flex-1 mt-16 px-4 md:px-8 py-4 w-full pt-16 md:pt-0">
          <Outlet />
        </div>

        <Footer />
      </div>
    </DataProvider>
  );
}

export default MainPage;
