
import React from "react";

function SummaryStats({ data }) {
    const total = data.length;
    const uniqueMakes = new Set(data.map((d) => d.Make)).size;
    const avgRange = Math.round(
        data.reduce((sum, d) => sum + (d["Electric Range"] || 0), 0) / total
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-gray-800 dark:text-white">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                <p className="text-sm">Total EVs</p>
                <h2 className="text-2xl font-bold">{total}</h2>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                <p className="text-sm">Unique Makes</p>
                <h2 className="text-2xl font-bold">{uniqueMakes}</h2>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                <p className="text-sm">Avg Electric Range</p>
                <h2 className="text-2xl font-bold">{avgRange} mi</h2>
            </div>
        </div>
    );
}
export default SummaryStats;