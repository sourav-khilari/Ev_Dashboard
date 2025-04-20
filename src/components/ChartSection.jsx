import React from "react";

function ChartSection({ title, children }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                {title}
            </h2>
            <div className="w-full overflow-x-auto">
                {children}
            </div>
        </div>
    );
}

export default ChartSection;
