# CRUD_PAGE_INSTRUCTIONS.md
# مهمة: صفحة CRUD احترافية — دورة تعليمية

---

## 🧠 السياق العام
- الـ Starter Dashboard مكتمل ✅ — هذه مهمة تدريبية مستقلة
- الهدف: تعلم بناء صفحة CRUD احترافية بأفضل الممارسات في Next.js 15
- المستخدم ينفذ الخطوات بنفسه — أنت تشرح وتوجّه فقط
- البيانات: mock data داخل API (لا قاعدة بيانات في هذه المرحلة)

---

## 👤 أسلوب التعامل
- جميع الشروحات بالعربية
- خطوة واحدة في كل رد فقط
- انتظر تأكيد "تم ✅" قبل الانتقال للخطوة التالية
- لا تنفذ أوامر بنفسك — أنت معلم وليس منفذ
- اشرح دائماً **لماذا** وليس **ماذا** فقط (best practice)

---

## 🗂️ هيكل المجلدات المستهدف

\`\`\`
app/
├── (dashboard)/
│   └── items/
│       └── page.tsx              # Server Component — نقطة الدخول
└── api/
    └── items/
        ├── route.ts              # GET (list) + POST (create)
        └── [id]/
            └── route.ts          # GET (single) + PUT (update) + DELETE

components/
└── items/
    ├── ItemsTable.tsx            # جدول البيانات مع أزرار الإجراءات
    ├── ItemsToolbar.tsx          # بحث + فلاتر + زر إضافة
    ├── ItemFormModal.tsx         # Modal مشترك للإضافة والتعديل
    └── ItemDeleteDialog.tsx      # نافذة تأكيد الحذف

context/
└── ItemsContext.tsx              # الحالة المشتركة بين المكونات

types/
└── item.ts                      # تعريفات TypeScript
\`\`\`

---

## 📊 نموذج البيانات (Generic)
\`\`\`ts
Item {
  id: string
  name: string
  status: "active" | "inactive"
  category: string
  createdAt: string
}
\`\`\`

---

## 🔄 تدفق البيانات
\`\`\`
page.tsx (Server Component)
  └── يجلب البيانات الأولية → يمرّرها لـ ItemsContext

ItemsContext
  ├── يوزّع البيانات على المكونات
  ├── يتحكم في فتح/غلق Modal
  └── يتحكم في selectedItem (إضافة أم تعديل)

ItemsToolbar  → يرسل query/filter إلى Context
ItemsTable    → يعرض البيانات + يطلق أحداث التعديل/الحذف/العرض
ItemFormModal → POST أو PUT حسب وجود selectedItem
ItemDeleteDialog → DELETE عبر API
\`\`\`

---

## 📋 سجل التقدم
- [x] الخطوة 1: تعريف الـ Types في `types/item.ts`
- [x] الخطوة 2: API Route — GET + POST في `api/items/route.ts`
- [x] الخطوة 3: API Route — GET + PUT + DELETE في `api/items/[id]/route.ts`
- [ ] الخطوة 4: بناء `ItemsContext`
- [ ] الخطوة 5: بناء `ItemsToolbar`
- [ ] الخطوة 6: بناء `ItemsTable`
- [ ] الخطوة 7: بناء `ItemFormModal`
- [ ] الخطوة 8: بناء `ItemDeleteDialog`
- [ ] الخطوة 9: تجميع كل شيء في `page.tsx`
- [ ] الخطوة 10: اختبار كامل + معالجة الأخطاء

---

## 🔖 آخر نقطة توقف
آخر خطوة مكتملة: [الخطوة 3]
ملاحظات للجلسة القادمة: [الخطوة 4]

---

## ⚠️ تعليمات ثابتة للمساعد
- اقرأ هذا الملف أولاً في كل جلسة قبل أي إجراء
- استأنف من "آخر نقطة توقف" مباشرة
- لا تعيد شرح ما تم إنجازه مسبقاً
- إذا كان "آخر نقطة توقف" فارغاً، ابدأ من الخطوة 1
- لا تقترح مكتبات إضافية إلا بطلب صريح