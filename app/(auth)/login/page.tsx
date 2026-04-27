export default function LoginPage() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">تسجيل الدخول</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">البريد الإلكتروني</label>
          <input
            type="email"
            placeholder="example@email.com"
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">كلمة المرور</label>
          <input
            type="password"
            placeholder="••••••••"
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          دخول
        </button>
      </form>
    </div>
  );
}