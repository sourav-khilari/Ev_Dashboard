import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

function RangeDistributionChart({ data }) {
    if (!data || data.length === 0) {
        return <p className="text-center text-sm text-red-500">No valid data to display.</p>;
    }
    const buckets = [0, 50, 100, 150, 200, 250, 300];
    const bucketCounts = buckets.map((start, idx) => {
        const end = buckets[idx + 1] || Infinity;
        const count = data.filter(
            (item) => item['Electric Range'] >= start && item['Electric Range'] < end
        ).length;
        return { range: `${start}-${end === Infinity ? '+' : end}`, count };
    });

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bucketCounts} margin={{ top: 10, right: 20, bottom: 40, left: 30 }}>
                <XAxis
                    dataKey="range"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Electric Range (mi)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                    label={{ value: 'Vehicle Count', angle: -90, position: 'insideLeft', offset: 10,dx:-20, }}
                />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default RangeDistributionChart;    
