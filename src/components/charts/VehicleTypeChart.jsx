import React from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from 'recharts';

const COLORS = ['#4f46e5', '#16a34a', '#facc15', '#ef4444', '#10b981'];

const SHORT_LABELS = {
    "Battery Electric Vehicle (BEV)": "BEV",
    "Plug-in Hybrid Electric Vehicle (PHEV)": "PHEV",
    "Fuel Cell Electric Vehicle (FCEV)": "FCEV",
    "Neighborhood Electric Vehicle (NEV)": "NEV",
    "Medium-duty BEV": "M-BEV",
    "Heavy-duty BEV": "H-BEV"
};

function VehicleTypeChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <p className="text-center text-sm text-red-500">
                No valid data to display.
            </p>
        );
    }

    const typeCounts = data.reduce((acc, row) => {
        const type = row["Electric Vehicle Type"];
        if (type) acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(typeCounts).map(([name, value]) => ({
        name,
        shortName: SHORT_LABELS[name] || name,
        value
    }));

    const renderMobileLabel = ({ cx, cy, midAngle, outerRadius, percent, index, shortName }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 20;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#333"
                fontSize={10}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${shortName} (${(percent * 100).toFixed(0)}%)`}
            </text>
        );
    };

    return (
        <div className="w-full px-2 overflow-x-hidden">

            <div className="hidden sm:block h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ right: 9 }}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            labelLine={{ stroke: "#666", strokeWidth: 1 }}
                            label={({ name, percent }) => {
                                const displayName = name.length > 25 ? `${name.slice(0, 19)}…` : name;
                                return `${displayName} (${(percent * 100).toFixed(0)}%)`;
                            }}
                        >
                            {chartData.map((entry, idx) => (
                                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                            verticalAlign="bottom"
                            layout="horizontal"
                            align="center"
                            wrapperStyle={{
                                whiteSpace: "normal",
                                textAlign: "center",
                                width: "100%",
                                paddingTop: 8,
                                fontSize: 12,
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>




            <div className="block sm:hidden h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 10, right: 30, bottom: 10, left: 10 }}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="shortName"
                            cx="50%"
                            cy="45%"
                            outerRadius={65}
                            labelLine={{ stroke: "#666", strokeWidth: 1 }}
                            label={renderMobileLabel}
                        >
                            {chartData.map((entry, idx) => (
                                <Cell key={`mobile-cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                            verticalAlign="bottom"
                            layout="horizontal"
                            align="center"
                            wrapperStyle={{
                                textAlign: "center",
                                width: "100%",
                                fontSize: 11,
                                paddingTop: 6,
                                lineHeight: '1.2em',
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

export default VehicleTypeChart;
