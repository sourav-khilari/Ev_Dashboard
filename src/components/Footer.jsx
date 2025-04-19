
import React from 'react';

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-10">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                <p>© {new Date().getFullYear()} EV Insights Dashboard. All rights reserved.</p>
                <div className="space-x-4 mt-2 sm:mt-0">
                    <a href="/" className="hover:text-blue-500 transition-colors">Home</a>
                    <a href="/dashboard" className="hover:text-blue-500 transition-colors">Dashboard</a>
                    <a href="/insights" className="hover:text-blue-500 transition-colors">Insights</a>
                    <a href="/map" className="hover:text-blue-500 transition-colors">Map</a>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
