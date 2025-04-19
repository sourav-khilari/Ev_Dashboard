import React from "react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

const COLORS = ["#10b981", "#f87171", "#fbbf24", "#6366f1"];

function CafvEligibilityChart({ data }) {
    const key = "Clean Alternative Fuel Vehicle (CAFV) Eligibility";

    const counts = data.reduce((acc, row) => {
        const status = row[key]?.trim();
        if (status) {
            acc[status] = (acc[status] || 0) + 1;
        }
        return acc;
    }, {});

    const chartData = Object.entries(counts).map(([name, value]) => ({
        name,
        value,
    }));

    if (chartData.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No CAFV eligibility data available.
            </div>
        );
    }


    const renderLabel = ({ name, percent }) => {
        const truncated = name.length > 20 ? name.slice(0, 12) + "..." : name;
        return `${truncated} (${(percent * 100).toFixed(0)}%)`;
    };

    return (
        <div className="flex flex-col items-center space-y-4 w-full">
            <div className="w-full max-w-[690px] h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            label={renderLabel}
                            labelLine={true}
                        >
                            {chartData.map((entry, idx) => (
                                <Cell
                                    key={`cell-${idx}`}
                                    fill={COLORS[idx % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                            wrapperStyle={{ zIndex: 10 }}
                            cursor={{ fill: "transparent" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>


            <div className="flex flex-wrap justify-center gap-4 text-sm px-2">
                {chartData.map((entry, idx) => (
                    <div
                        key={entry.name}
                        className="flex items-center space-x-2 max-w-[160px]"
                    >
                        <span
                            className="w-4 h-4 rounded-full inline-block"
                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                        />
                        <span className="text-gray-700 dark:text-gray-200 whitespace-normal break-words">
                            {entry.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default CafvEligibilityChart;
