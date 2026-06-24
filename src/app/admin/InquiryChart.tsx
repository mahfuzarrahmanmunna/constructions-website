"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface InquiryChartProps {
  totalProducts: number;
  totalInquiries: number;
  totalUsers: number;
}

const COLORS = ["#002253", "#224B88", "#F97316"];

// Custom Tooltip Style
const CustomTooltipStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.9)",
  border: "none",
  borderRadius: "12px",
  padding: "12px 16px",
  color: "#fff",
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
};

export default function InquiryChart({
  totalProducts,
  totalInquiries,
  totalUsers,
}: InquiryChartProps) {
  const data = [
    { name: "Products", value: totalProducts },
    { name: "Inquiries", value: totalInquiries },
    { name: "Users", value: totalUsers },
  ];

  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-lg font-bold text-slate-800">Analytics Overview</h2>
        <p className="text-sm text-slate-500">
          Distribution of platform activity
        </p>
      </div>

      {/* Chart Area */}
      <div className="flex-1 min-h-0 px-2">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={85}
              innerRadius={55}
              strokeWidth={0}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Pie>

            {/* Center Text */}
            <text
              x="50%"
              y="45%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-3xl font-bold fill-slate-800"
            >
              {total}
            </text>
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-slate-400 uppercase tracking-wider"
            >
              Total
            </text>

            <Tooltip
              contentStyle={CustomTooltipStyle}
              itemStyle={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}
              formatter={(value: number, name: string) => [
                `${value} (${((value / total) * 100).toFixed(1)}%)`,
                name,
              ]}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                paddingTop: "10px",
                fontSize: "13px",
                color: "#64748b",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 p-6 border-t border-slate-100 bg-slate-50/50">
        {data.map((item, index) => (
          <div key={item.name} className="text-center group cursor-default">
            <div
              className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${COLORS[index]}15` }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-1">
              {item.name}
            </p>
            <p className="text-xl font-bold text-slate-800">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
