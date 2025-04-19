import React from "react";

function InsightCard({ title, description, icon }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center mb-3 space-x-3">
                <div className="text-2xl">{icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
        </div>
    );
}

export default InsightCard;
