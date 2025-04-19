import React from 'react';

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-10">
            <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} EV Insights Dashboard. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
