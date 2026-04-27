"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type BaseChartProps = {
  title?: string;
  categories: string[];
  series: { name: string; data: number[] }[];
};

export default function BaseChart({
  title,
  categories,
  series,
}: BaseChartProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    theme: { mode: isDark ? "dark" : "light" },
    xaxis: {
      categories,
      labels: { style: { colors: isDark ? "#9ca3af" : "#6b7280" } },
    },
    title: {
      text: title,
      style: { fontSize: "14px", color: isDark ? "#f3f4f6" : "#1f2937" },
    },
    colors: ["#3B82F6"],
    grid: { borderColor: isDark ? "#374151" : "#e5e7eb" },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
      <ApexChart type="bar" options={options} series={series} height={300} />
    </div>
  );
}
