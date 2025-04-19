// import React from "react";
// import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

// const COLORS = ["#4f46e5", "#f59e0b"];

// function VehicleTypeChart({ data }) {
//     if (!data || data.length === 0) {
//         return <p className="text-center text-sm text-red-500">No valid data to display.</p>;
//     }
//     const typeCounts = data.reduce((acc, row) => {
//         const type = row["Electric Vehicle Type"];
//         if (type) {
//             acc[type] = (acc[type] || 0) + 1;
//         }
//         return acc;
//     }, {});

//     const chartData = Object.entries(typeCounts).map(([name, value]) => ({ name, value }));

//     return (
//         <div className="w-full h-64 sm:h-80">
//             <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                     <Pie
//                         data={chartData}
//                         dataKey="value"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={80}
//                         label={({ name, percent }) =>
//                             `${name} (${(percent * 100).toFixed(0)}%)`
//                         }
//                     >
//                         {chartData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend verticalAlign="bottom" height={36} />
//                 </PieChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }

// export default VehicleTypeChart;


import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend
} from "recharts";

const COLORS = ["#4f46e5", "#f59e0b"];

export default function VehicleTypeChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-sm text-red-500">
        No valid data to display.
      </p>
    );
  }

  // Count BEV vs PHEV
  const typeCounts = data.reduce((acc, row) => {
    const type = row["Electric Vehicle Type"];
    if (type) acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(typeCounts).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="w-full h-64 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={0}
            labelLine={{ stroke: "#666", strokeWidth: 1 }}
            label={({ name, percent }) => {
              // optionally truncate long names
              const displayName =
                name.length > 25 ? `${name.slice(0, 19)}…` : name;
              return `${displayName} (${(percent * 100).toFixed(0)}%)`;
            }}
          >
            {chartData.map((entry, idx) => (
              <Cell
                key={`cell-${idx}`}
                fill={COLORS[idx % COLORS.length]}
              />
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
              lineHeight: "1.3em",
              fontSize: 12
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
