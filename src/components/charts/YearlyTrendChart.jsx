// import React from 'react';
// import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

// function YearlyTrendChart({ data }) {
//     const yearCounts = data.reduce((acc, { 'Model Year': year }) => {
//         if (year) acc[year] = (acc[year] || 0) + 1;
//         return acc;
//     }, {});
//     const chartData = Object.entries(yearCounts)
//         .map(([year, count]) => ({ year, count }))
//         .sort((a, b) => a.year - b.year);

//     if (chartData.length === 0) {
//         return <p className="text-center text-sm text-red-500">No valid data to display.</p>;
//     }

//     return (
//         <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData} margin={{ top: 10, right: 20, bottom: 40, left: 30 }}>
//                 <XAxis
//                     dataKey="year"
//                     tick={{ fontSize: 12 }}
//                     label={{ value: 'Model Year', position: 'insideBottom', offset: -5 }}
//                 />
//                 <YAxis
//                     label={{ value: 'EV Count', angle: -90, position: 'insideLeft', offset: 10 }}
//                 />
//                 <Tooltip />
//                 <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
//             </BarChart>
//         </ResponsiveContainer>
//     );
// }
// export default YearlyTrendChart;


import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar
} from 'recharts';

function YearlyTrendChart({ data }) {
  // Aggregate counts by year
  const yearCounts = data.reduce((acc, { 'Model Year': year }) => {
    if (year) acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(yearCounts)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);

  if (!chartData.length) {
    return (
      <p className="text-center text-sm text-red-500">
        No valid data to display.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 20, bottom: 60, left: 60 }}  
      >
        <XAxis
          dataKey="year"
          interval={0}
          tick={{ fontSize: 12, angle: -45, textAnchor: 'end' }}
          tickMargin={10}
          label={{
            value: 'Model Year',
            position: 'insideBottom',
            offset: -45,
            fontSize: 12
          }}
        />

        <YAxis
          width={50}                                      
          tick={{ fontSize: 12 }}
          tickMargin={8}                                  
          label={{
            value: 'EV Count',
            angle: -90,
            position: 'insideLeft',
            offset: 40,                                     
            fontSize: 12
          }}/>

        <Tooltip />

        <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default YearlyTrendChart;
