import StatsCard from "@/components/ui/StatsCard";
import DataTable from "@/components/ui/DataTable";
import BaseChart from "@/components/charts/BaseChart";

const columns = [
  { key: "name" as const, label: "الاسم" },
  { key: "status" as const, label: "الحالة" },
  { key: "date" as const, label: "التاريخ" },
];

const data = [
  { name: "أحمد محمد", status: "نشط", date: "2026-04-01" },
  { name: "سارة علي", status: "معلق", date: "2026-04-10" },
  { name: "خالد يوسف", status: "نشط", date: "2026-04-15" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        نظرة عامة
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="إجمالي المستخدمين"
          value="1,240"
          description="↑ 12% هذا الشهر"
        />
        <StatsCard
          title="الطلبات النشطة"
          value="340"
          description="↓ 3% هذا الأسبوع"
        />
        <StatsCard
          title="الإيرادات"
          value="$8,400"
          description="↑ 7% مقارنة بالسابق"
        />
        <StatsCard title="التقارير" value="58" description="آخر تحديث اليوم" />
      </div>
      <DataTable columns={columns} data={data} />
      <BaseChart
        title="الزيارات الشهرية"
        categories={["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"]}
        series={[{ name: "الزيارات", data: [400, 700, 500, 900, 600, 800] }]}
      />
    </div>
  );
}
