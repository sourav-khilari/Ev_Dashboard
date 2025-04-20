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

function TopCitiesChart({ data }) {
    //count city
    const counts = data.reduce((acc, row) => {
        const city = row.City?.trim();
        if (city) acc[city] = (acc[city] || 0) + 1;
        return acc;
    }, {});

    const entries = Object.entries(counts)
        .map(([city, value]) => ({ city, value }))
        .sort((a, b) => b.value - a.value);

    const top10 = entries.slice(0, 10);
    const othersCount = entries.slice(10).reduce((sum, e) => sum + e.value, 0);

    const chartData = [
        ...top10,
        ...(othersCount > 0 ? [{ city: "Others", value: othersCount }] : []),
    ];

    if (!chartData.length) {
        return (
            <div className="text-center py-10 text-gray-500">
                No city data available.
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[300px] sm:min-w-full h-[300px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 20, right: 60, left: 40, bottom: 20 }}
                    >
                        <XAxis
                            type="number"
                            tick={{ fontSize: 12 }}
                            label={{ value: "EV Count", position: "insideBottom", offset: -10 }}
                        />
                        <YAxis
                            dataKey="city"
                            type="category"
                            width={80}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip formatter={(value) => value.toLocaleString()} />
                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 0, 0, 4]}>
                            <LabelList
                                dataKey="value"
                                position="right"
                                formatter={(val) => val.toLocaleString()}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default TopCitiesChart;
