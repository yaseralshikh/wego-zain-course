# CUSTOMERS_PAGE_INSTRUCTIONS.md
# مهمة: صفحة Customers مرتبطة بـ Supabase — دورة تعليمية

---

## 🧠 السياق العام
- صفحة `items` التدريبية ما زالت موجودة كما هي ✅
- الهدف الجديد: بناء صفحة مستقلة باسم `customers` مرتبطة بجدول حقيقي في Supabase
- المطلوب: التعلم التدريجي بدون كسر بنية المشروع الحالية
- النهج: بناء مورد جديد مستقل بدل تعديل `items`

---

## 👤 أسلوب التعامل
- جميع الشروحات بالعربية
- خطوة واحدة في كل رد فقط
- انتظر تأكيد "تم ✅" قبل الانتقال للخطوة التالية
- اشرح دائمًا **لماذا** وليس **ماذا** فقط
- عند الحاجة لربط قاعدة البيانات، ابدأ بأبسط تدفق قابل للاختبار

---

## 🗂️ الهيكل المستهدف لمسار Customers

```txt
app/
├── (dashboard)/
│   └── customers/
│       └── page.tsx                 # موجود الآن: يعرض العملاء من Supabase داخل dashboard
└── api/
    └── customers/
        ├── route.ts                 # موجود الآن: GET يعمل ومربوط بـ Supabase
        └── [id]/
            └── route.ts             # موجود كمسار تفصيلي/مرحلة لاحقة للتنفيذ الكامل

components/
└── customers/
    ├── CustomersTable.tsx            # مرحلة لاحقة: جدول مستقل بدل وضعه داخل page.tsx
    ├── CustomersToolbar.tsx          # مرحلة لاحقة: بحث + فلاتر + زر إضافة
    ├── CustomerFormModal.tsx         # مرحلة لاحقة: Modal مشترك للإضافة والتعديل
    └── CustomerDeleteDialog.tsx      # مرحلة لاحقة: نافذة تأكيد الحذف

context/
└── CustomersContext.tsx              # مرحلة لاحقة: الحالة المشتركة بين المكونات

lib/
└── supabase/
    └── client.ts                     # موجود الآن: عميل Supabase

types/
└── customer.ts                       # موجود الآن: تعريفات TypeScript الخاصة بالعملاء
```

---

## 📊 نموذج البيانات الحالي من Supabase

```ts
Customer {
  id: string
  name: string | null
  email: string | null
  image_url: string | null
}
```

ملاحظات:
- `id` من النوع `uuid` في Supabase ويُمثل كـ `string` في TypeScript
- الحقول النصية الحالية تقبل `NULL` لذلك نوعها `string | null`
- لا يوجد `created_at` ظاهر في الجدول حاليًا

---

## 🔄 ما تم إنجازه حتى الآن
- [x] إنشاء `types/customer.ts`
- [x] إضافة متغيرات Supabase في `.env.local`
- [x] تثبيت `@supabase/supabase-js`
- [x] إنشاء `lib/supabase/client.ts`
- [x] إنشاء `app/api/customers/route.ts` مع `GET`
- [x] اختبار الاتصال عبر `/api/customers`
- [x] اكتشاف أن `RLS` كان يمنع القراءة
- [x] إضافة `SELECT policy` تسمح بالقراءة
- [x] التأكد أن `/api/customers` يرجع البيانات
- [x] إنشاء `app/(dashboard)/customers/page.tsx`
- [x] عرض بيانات `customers` داخل جدول بسيط في الصفحة
- [x] إنشاء المسار `app/api/customers/[id]/route.ts` كبداية للبنية المستقبلية

---

## 📋 سجل التقدم المقترح
- [x] الخطوة 1: تعريف أنواع `Customer`
- [x] الخطوة 2: تجهيز متغيرات البيئة لـ Supabase
- [x] الخطوة 3: تثبيت مكتبة Supabase
- [x] الخطوة 4: إنشاء عميل Supabase
- [x] الخطوة 5: إنشاء API Route للقراءة
- [x] الخطوة 6: حل مشكلة `RLS` والسماح بالقراءة
- [x] الخطوة 7: إنشاء `app/(dashboard)/customers/page.tsx`
- [x] الخطوة 8: عرض البيانات داخل جدول بسيط
- [ ] الخطوة 9: نقل الجدول إلى `components/customers/CustomersTable.tsx`
- [ ] الخطوة 10: تنظيم المكونات إلى `components/customers`
- [ ] الخطوة 11: إضافة إنشاء/تعديل/حذف مع Supabase
- [ ] الخطوة 12: اختبار كامل + معالجة الأخطاء

---

## 🔖 آخر نقطة توقف
آخر خطوة مكتملة: [الخطوة 8]
ملاحظات للجلسة القادمة: [ابدأ من الخطوة 9: استخراج الجدول من page.tsx إلى components/customers/CustomersTable.tsx ثم واصل تنظيم مسار customers]

---

## ⚠️ تعليمات ثابتة للمساعد
- اقرأ هذا الملف أولًا في كل جلسة قبل أي إجراء متعلق بـ `customers`
- لا تخلط بين `items` و `customers`
- لا تعدّل مسار `items` عند العمل على `customers`
- استأنف من "آخر نقطة توقف" مباشرة
- ابدأ بأبسط مسار قابل للاختبار ثم وسّع البنية تدريجيًا
