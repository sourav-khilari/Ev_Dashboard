import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    LabelList,
} from "recharts";

function TopLegislativeDistrictsChart({ data }) {

    const counts = data.reduce((acc, row) => {
        const dist = row["Legislative District"];
        if (dist !== undefined && dist !== null && dist !== "") {
            const key = `District ${dist}`;
            acc[key] = (acc[key] || 0) + 1;
        }
        return acc;
    }, {});


    const entries = Object.entries(counts)
        .map(([district, count]) => ({ district, count }))
        .sort((a, b) => b.count - a.count);


    const top10 = entries.slice(0, 10);
    const othersCount = entries.slice(10).reduce((sum, e) => sum + e.count, 0);
    const chartData = [
        ...top10,
        ...(othersCount > 0 ? [{ district: "Others", count: othersCount }] : []),
    ];

    if (chartData.length === 0) {
        return <p className="text-center text-sm text-red-500">No valid data to display.</p>;
    }
    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                >
                    <XAxis
                        type="number"
                        tick={{ fontSize: 12 }}
                        label={{ value: "EV Count", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                        dataKey="district"
                        type="category"
                        width={120}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(val) => val.toLocaleString()} />
                    <Bar dataKey="count" fill="#4f46e5" radius={[4, 0, 0, 4]}>
                        <LabelList dataKey="count" position="right" formatter={(val) => val.toLocaleString()} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
export default TopLegislativeDistrictsChart;