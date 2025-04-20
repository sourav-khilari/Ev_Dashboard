import React from "react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#9ca3af"];


const renderDesktopLabel = ({ name, percent }) => {
    const t = name.length > 15 ? name.slice(0, 15) + "…" : name;
    return `${t} ${Math.round(percent * 100)}%`;
};


const renderMobileLabel = ({
    cx, cy, midAngle, outerRadius, percent, name
}) => {
    const RAD = Math.PI / 180;
    const r = outerRadius + 12;
    const x = cx + r * Math.cos(-midAngle * RAD);
    const y = cy + r * Math.sin(-midAngle * RAD);

    const short = name.length > 10 ? name.slice(0, 10) + "…" : name;
    return (
        <text
            x={x}
            y={y}
            fill="#374151"
            fontSize={8}
            fontWeight="500"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${short} ${Math.round(percent * 100)}%`}
        </text>
    );
};

function TopElectricUtilitiesChart({ data }) {

    const counts = data.reduce((acc, row) => {
        const u = row["Electric Utility"]?.trim();
        if (u) acc[u] = (acc[u] || 0) + 1;
        return acc;
    }, {});

    const sorted = Object.entries(counts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    if (!sorted.length) {
        return (
            <p className="text-center text-sm text-red-500">
                No valid data to display.
            </p>
        );
    }

    const top5 = sorted.slice(0, 5);
    const othersTotal = sorted.slice(5).reduce((sum, item) => sum + item.value, 0);
    const chartData = othersTotal > 0
        ? [...top5, { name: "Others", value: othersTotal }]
        : top5;

    return (
        <div className="w-full px-2 overflow-x-hidden flex flex-col items-center space-y-4 sm:space-y-2">

            <div className="hidden sm:block w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="45%"
                            innerRadius={60}
                            outerRadius={100}
                            label={renderDesktopLabel}
                            labelLine
                        >
                            {chartData.map((entry, idx) => (
                                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>


            <div className="block sm:hidden w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 3 }}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="45%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={70}
                            label={renderMobileLabel}
                            labelLine
                        >
                            {chartData.map((entry, idx) => (
                                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>


            <div className="flex flex-wrap justify-center gap-4 text-sm px-2">
                {chartData.map((entry, idx) => (
                    <div
                        key={entry.name}
                        className="flex items-center space-x-2 max-w-[140px]"
                    >
                        <span
                            className="w-3 h-3 rounded-full inline-block"
                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                        />
                        <span className="text-gray-700 dark:text-gray-200 text-xs whitespace-normal break-words">
                            {entry.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopElectricUtilitiesChart;
