import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#9ca3af"];

function TopElectricUtilitiesChart({ data }) {
    const utilityCounts = data.reduce((acc, row) => {
        const utility = row["Electric Utility"]?.trim();
        if (utility) {
            acc[utility] = (acc[utility] || 0) + 1;
        }
        return acc;
    }, {});

    const sorted = Object.entries(utilityCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    if (sorted.length === 0) {
        return <p className="text-center text-sm text-red-500">No valid data to display.</p>;
    }
    const top5 = sorted.slice(0, 5);
    const othersTotal = sorted.slice(5).reduce((sum, item) => sum + item.value, 0);

    const chartData = [...top5, { name: "Others", value: othersTotal }];

    if (chartData.length === 0) {
        return <p className="text-center text-sm text-red-500">No valid data to display.</p>;
    }
    return (
        <div className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        innerRadius={60}
                        outerRadius={100}
                        labelLine={true} // Show lines from slices to labels
                        label={({ name, percent }) =>
                            `${name.length > 12 ? name.slice(0, 12) + '…' : name} (${(percent * 100).toFixed(0)}%)`
                        }
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ fontSize: "12px", marginTop: "10px" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
export default TopElectricUtilitiesChart;
