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

function TopMakesChart({ data }) {
    const makeCounts = data.reduce((acc, { Make }) => {
        if (Make) acc[Make] = (acc[Make] || 0) + 1;
        return acc;
    }, {});

    const sorted = Object.entries(makeCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    if (sorted.length === 0) {
        return <p className="text-center text-sm text-red-500">No valid data to display.</p>;
    }

    return (
        <div className="w-full h-72"> {/* ✅ Set a fixed height */}
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={sorted}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) =>
                            `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                    >
                        {sorted.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TopMakesChart;