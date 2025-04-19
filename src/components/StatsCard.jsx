import React from 'react';
const StatsCard = ({ title, value, icon }) => {
    return (
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 text-center hover:shadow-lg transition">
            <div className="text-3xl mb-2 text-blue-500">{icon}</div>
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">{title}</h2>
            <p className="text-2xl font-bold text-black dark:text-white">{value}</p>
        </div>
    );
};

export default StatsCard;
