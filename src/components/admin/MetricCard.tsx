import { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  icon?: ReactNode;
}

export default function MetricCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="bg-gradient-to-b from-blue-700  via-blue-800 to-slate-900  text-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center">
        <h3 className="px-2 py-1 rounded">
          {title}
        </h3>

        {icon}
      </div>

      <h2 className="text-3xl text-center font-bold mt-2 text-[#002253]">
        {value}
      </h2>
    </div>
  );
}