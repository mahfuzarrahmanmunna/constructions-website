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

const COLORS = [
  "#002253",
  "#224B88",
  "#F97316",
];

export default function InquiryChart({
  totalProducts,
  totalInquiries,
  totalUsers,
}: InquiryChartProps) {
  const data = [
    {
      name: "Products",
      value: totalProducts,
    },
    {
      name: "Inquiries",
      value: totalInquiries,
    },
    {
      name: "Users",
      value: totalUsers,
    },
  ];

  return (
    <div className="h-full p-6">
      <h2 className="text-xl font-bold text-[#002253] mb-4">
        Dashboard Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [
              value,
              "Count",
            ]}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">
            Products
          </p>
          <p className="font-bold text-lg text-[#002253]">
            {totalProducts}
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">
            Inquiries
          </p>
          <p className="font-bold text-lg text-[#002253]">
            {totalInquiries}
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">
            Users
          </p>
          <p className="font-bold text-lg text-[#002253]">
            {totalUsers}
          </p>
        </div>
      </div>
    </div>
  );
}