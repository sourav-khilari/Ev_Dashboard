import React from "react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

const COLORS = ["#10b981", "#f87171", "#fbbf24", "#6366f1"];

const FRIENDLY_LABELS = {
    "Clean Alternative Fuel Vehicle Eligible": "Eligible",
    "Not eligible due to low battery range": "Not Eligible",
    "Eligibility unknown as battery range has not been researched": "Pending",
};

const renderMobileLabel = ({
    cx, cy, midAngle, outerRadius, percent, name
}) => {
    const RAD = Math.PI / 180;
    const r = outerRadius + 12;
    const x = cx + r * Math.cos(-midAngle * RAD);
    const y = cy + r * Math.sin(-midAngle * RAD);
    const text = FRIENDLY_LABELS[name] || name;

    return (
        <text
            x={x}
            y={y}
            fill="#374151"
            fontSize={9}
            fontWeight="500"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${text} ${Math.round(percent * 100)}%`}
        </text>
    );
};


const renderDesktopLabel = ({ name, percent }) => {
    const text = FRIENDLY_LABELS[name] || name;
    const truncated = text.length > 20
        ? text.slice(0, 12) + "…"
        : text;
    return `${truncated} ${Math.round(percent * 100)}%`;
};

function CafvEligibilityChart({ data }) {
    const key = "Clean Alternative Fuel Vehicle (CAFV) Eligibility";

    const counts = data.reduce((acc, row) => {
        const s = row[key]?.trim();
        if (s) acc[s] = (acc[s] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(counts).map(([name, value]) => ({
        name, value
    }));

    if (!chartData.length) {
        return (
            <div className="text-center py-10 text-gray-500">
                No CAFV eligibility data available.
            </div>
        );
    }

    return (
        <div className="w-full px-2 overflow-x-hidden flex flex-col items-center space-y-4">
            {/* Desktop */}
            <div className="hidden sm:block w-full max-w-[690px] h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%" cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            label={renderDesktopLabel}
                            labelLine
                        >
                            {chartData.map((e, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                border: "1px solid #e5e7eb",
                                borderRadius: "6px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                            }}
                            wrapperStyle={{ zIndex: 10 }}
                            cursor={{ fill: "transparent" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="block sm:hidden w-full h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 8, right: 32, bottom: 8, left: 8 }}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="45%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={65}
                            label={renderMobileLabel}
                            labelLine
                        >
                            {chartData.map((e, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                border: "1px solid #e5e7eb",
                                borderRadius: "6px",
                            }}
                            wrapperStyle={{ zIndex: 10 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-sm px-2">
                {chartData.map((e, i) => (
                    <div key={e.name} className="flex items-center space-x-2 max-w-[120px]">
                        <span
                            className="w-3 h-3 rounded-full inline-block"
                            style={{ backgroundColor: COLORS[i % COLORS.length] }}
                        />
                        <span className="text-gray-700 dark:text-gray-200 text-xs whitespace-normal break-words">
                            {e.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CafvEligibilityChart;