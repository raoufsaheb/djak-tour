# استكشاف الأخطاء

دليل لحل المشاكل الشائعة.

## مشاكل التثبيت

### npm install يفشل

**المشكلة:**
```
npm ERR! code ENOENT
npm ERR! syscall open
```

**الحل:**
```bash
# تنظيف ذاكرة التخزين
npm cache clean --force

# حذف node_modules
rm -rf node_modules package-lock.json

# إعادة التثبيت
npm install
```

### مشاكل Node.js

**المشكلة:**
```
error:0308010C:digital envelope routines::unsupported
```

**الحل:**
```bash
# استخدام Node.js 18+
nvm use 20

# أو تعيين متغير البيئة
export NODE_OPTIONS=--openssl-legacy-provider
```

## مشاكل البناء

### البناء يفشل

**المشكلة:**
```
Build failed with errors
```

**الحل:**
```bash
# تنظيف
npm run clean

# إعادة التثبيت
npm install

# إعادة البناء
npm run build
```

### أخطاء TypeScript

**المشكلة:**
```
Type error: Type 'X' is not assignable to type 'Y'
```

**الحل:**
```bash
# فحص الأنواع
npx tsc --noEmit

# إصلاح تلقائي (إن أمكن)
npx tsc --fix
```

## مشاكل التشغيل

### التطبيق لا يعمل

**المشكلة:**
- الصفحة بيضاء
- أخطاء في Console

**الحل:**
1. فتح Console (F12)
2. التحقق من الأخطاء
3. مسح LocalStorage:
   ```javascript
   localStorage.clear();
   ```
4. إعادة تحميل الصفحة

### مشاكل RTL

**المشكلة:**
- النصوص في الاتجاه الخطأ
- الأيقونات مقلوبة

**الحل:**
```html
<!-- تأكد من وجود dir="rtl" -->
<html dir="rtl" lang="ar">
```

### مشاكل الألوان

**المشكلة:**
- الألوان لا تظهر بشكل صحيح

**الحل:**
```bash
# إعادة بناء Tailwind
npm run build:css
```

## مشاكل Docker

### Docker لا يعمل

**المشكلة:**
```
Cannot connect to the Docker daemon
```

**الحل:**
```bash
# تشغيل Docker
sudo systemctl start docker

# أو
open -a Docker  # macOS
```

### بناء Docker يفشل

**المشكلة:**
```
failed to solve: rpc error
```

**الحل:**
```bash
# تنظيف Docker
docker system prune -a

# إعادة البناء
docker-compose up -d --build
```

## مشاكل Git

### Git يفشل

**المشكلة:**
```
fatal: not a git repository
```

**الحل:**
```bash
# تهيئة Git
git init

# أو استنساخ جديد
git clone https://github.com/jamiya/jamiya-app.git
```

### merge conflicts

**المشكلة:**
```
CONFLICT (content): Merge conflict in file.ts
```

**الحل:**
```bash
# رؤية الملفات المتضاربة
git status

# فتح الملفات وإصلاح التضاربات
# ثم
git add .
git commit -m "Resolve conflicts"
```

## مشاكل المتصفح

### CORS errors

**المشكلة:**
```
Access-Control-Allow-Origin
```

**الحل:**
```bash
# استخدام امتداد CORS للمتصفح
# أو إعداد proxy في vite.config.ts
```

### LocalStorage ممتلئ

**المشكلة:**
```
QuotaExceededError
```

**الحل:**
```javascript
// مسح LocalStorage
localStorage.clear();

// أو مسح عناصر محددة
localStorage.removeItem('jamiya-storage');
```

## مشاكل الأداء

### التطبيق بطيء

**الحلول:**
1. تعطيل React DevTools
2. مسح Console
3. إغلاق التطبيقات الأخرى
4. استخدام Chrome بدلاً من Safari

### ذاكرة ممتلئة

**الحل:**
```bash
# إعادة تشغيل خادم التطوير
pkill -f "vite"
npm run dev
```

## الحصول على المساعدة

### GitHub Issues

1. افتح [GitHub Issues](https://github.com/jamiya/jamiya-app/issues)
2. ابحث عن مشكلتك
3. إذا لم تجد، أنشئ issue جديد

### قالب تقرير الخطأ

```markdown
**الوصف:**
وصف مختصر

**خطوات إعادة الإنتاج:**
1. الخطوة 1
2. الخطوة 2

**السلوك المتوقع:**
ما كان يجب أن يحدث

**السلوك الفعلي:**
ما حدث فعلياً

**معلومات الجهاز:**
- OS: Windows 11
- Browser: Chrome 120
- Node: 20.11.0
```

---

**هل لم تجد حلاً؟**

تواصل معنا:
- [GitHub Issues](https://github.com/jamiya/jamiya-app/issues)
- [البريد](mailto:support@jamiya.dz)
