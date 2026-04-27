type StatsCardProps = {
  title: string;
  value: string | number;
  description?: string;
};

export default function StatsCard({
  title,
  value,
  description,
}: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-2 shadow-sm">
      <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
      <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        {value}
      </span>
      {description && (
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {description}
        </span>
      )}
    </div>
  );
}
