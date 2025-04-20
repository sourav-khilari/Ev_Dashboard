import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = ['#4f46e5', '#16a34a', '#facc15', '#ef4444', '#10b981', '#9ca3af'];


const renderMobileLabel = ({ cx, cy, midAngle, outerRadius, percent, index, name }) => {
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
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

function TopMakesChart({ data }) {
  const makeCounts = data.reduce((acc, { Make }) => {
    if (Make) acc[Make] = (acc[Make] || 0) + 1;
    return acc;
  }, {});

  const allMakes = Object.entries(makeCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const top5 = allMakes.slice(0, 5);
  const othersTotal = allMakes.slice(5).reduce((sum, m) => sum + m.value, 0);
  const chartData = othersTotal > 0 ? [...top5, { name: 'Others', value: othersTotal }] : top5;

  if (!chartData.length) {
    return (
      <p className="text-center text-sm text-red-500">
        No valid data to display.
      </p>
    );
  }

  return (
    <div className="w-full px-2 overflow-x-hidden">

      <div className="hidden sm:block h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              labelLine={{ stroke: '#888', strokeWidth: 1 }}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {chartData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: '12px', marginTop: '8px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="block sm:hidden h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 1, bottom: 10, left: 10 }}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={65}
              labelLine={{ stroke: '#888', strokeWidth: 1 }}
              label={renderMobileLabel}
            >
              {chartData.map((entry, idx) => (
                <Cell key={`mobile-cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                textAlign: 'center',
                width: '100%',
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

export default TopMakesChart;
