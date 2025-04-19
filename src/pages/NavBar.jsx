import React from 'react';
import { NavLink } from "react-router-dom";

function Navbar() {
    const navLinkClasses = ({ isActive }) =>
        `text-sm md:text-base px-3 py-2 transition duration-200 ${isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
        }`;

    return (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">EV Dashboard</h1>
                <div className="space-x-2 md:space-x-4">
                    <NavLink to="/" className={navLinkClasses}>Home</NavLink>
                    <NavLink to="/dashboard" className={navLinkClasses}>Dashboard</NavLink>
                    <NavLink to="/insights" className={navLinkClasses}>Insights</NavLink>
                    <NavLink to="/map" className={navLinkClasses}>Map</NavLink>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;
