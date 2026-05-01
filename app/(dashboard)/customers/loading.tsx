export default function CustomersLoading() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/70">
        <div className="h-8 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mt-3 h-4 w-72 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/90 shadow-sm dark:border-gray-800 dark:bg-gray-950/70">
        <div className="grid grid-cols-3 bg-gray-50 dark:bg-gray-900/80">
          <div className="px-4 py-3">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="px-4 py-3">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="px-4 py-3">
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="grid grid-cols-3">
              <div className="px-4 py-4">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="px-4 py-4">
                <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="px-4 py-4">
                <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
