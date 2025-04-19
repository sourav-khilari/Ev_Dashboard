import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

function StackedVehicleTypeTrendChart({ data }) {

    const yearTypeMap = {};
    data.forEach((row) => {
        const year = row["Model Year"];
        const type = row["Electric Vehicle Type"];
        if (!year || !type) return;
        if (!yearTypeMap[year]) yearTypeMap[year] = { year, BEV: 0, PHEV: 0 };
        if (type.toUpperCase().includes("BEV")) {
            yearTypeMap[year].BEV += 1;
        } else {
            yearTypeMap[year].PHEV += 1;
        }
    });

    const chartData = Object.values(yearTypeMap).sort((a, b) => a.year - b.year);
    
    if (chartData.length === 0) {
        return <p className="text-center text-sm text-red-500">No valid data to display.</p>;
    }
    return (
        <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis
                        dataKey="year"
                        tick={{ fontSize: 12 }}
                        label={{
                            value: "Model Year",
                            position: "insideBottom",
                            offset: -5,
                            fontSize: 14,
                            fontWeight: 500,
                        }}
                    />
                    <YAxis
                        label={{
                            value: "Number of EVs",
                            angle: -90,
                            position: "insideLeft",
                            offset: 10,
                            fontSize: 14,
                            fontWeight: 500,
                        }}
                    />

                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Bar dataKey="BEV" stackId="a" fill="#4f46e5" />
                    <Bar dataKey="PHEV" stackId="a" fill="#10b981" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StackedVehicleTypeTrendChart;