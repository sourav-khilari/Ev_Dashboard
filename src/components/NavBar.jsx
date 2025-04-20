import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinkClasses = ({ isActive }) =>
        `block md:inline text-sm md:text-base px-3 py-2 transition duration-200 ${isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
        }`;

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

                <h1 className="text-lg md:text-xl font-bold text-blue-600">EV Dashboard</h1>

               
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-600 hover:text-blue-500 focus:outline-none"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                
                <div className="hidden md:flex space-x-4">
                    <NavLink to="/" className={navLinkClasses}>
                        Home
                    </NavLink>
                    <NavLink to="/dashboard" className={navLinkClasses}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/insights" className={navLinkClasses}>
                        Insights
                    </NavLink>
                    <NavLink to="/map" className={navLinkClasses}>
                        Map
                    </NavLink>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <NavLink to="/" onClick={toggleMenu} className={navLinkClasses}>
                        Home
                    </NavLink>
                    <NavLink to="/dashboard" onClick={toggleMenu} className={navLinkClasses}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/insights" onClick={toggleMenu} className={navLinkClasses}>
                        Insights
                    </NavLink>
                    <NavLink to="/map" onClick={toggleMenu} className={navLinkClasses}>
                        Map
                    </NavLink>
                </div>
            )}
        </nav>
    );
}

export default Navbar;