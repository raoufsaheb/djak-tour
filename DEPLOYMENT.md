# دليل النشر

دليل شامل لنشر تطبيق جمعية في بيئات مختلفة.

## 📋 المتطلبات

- Node.js 18+
- npm أو yarn
- Docker (اختياري)
- Git

## 🚀 النشر المحلي

### 1. استنساخ المستودع

```bash
git clone https://github.com/jamiya/jamiya-app.git
cd jamiya-app
```

### 2. تثبيت التبعيات

```bash
npm install
```

### 3. بناء التطبيق

```bash
npm run build
```

### 4. معاينة الإنتاج

```bash
npm run preview
```

## 🐳 النشر باستخدام Docker

### 1. بناء الصورة

```bash
docker build -t jamiya-app:latest .
```

### 2. تشغيل الحاوية

```bash
docker run -d -p 80:80 --name jamiya-app jamiya-app:latest
```

### 3. استخدام Docker Compose

```bash
# تشغيل
docker-compose up -d

# إيقاف
docker-compose down

# إعادة بناء
docker-compose up -d --build
```

## ☁️ النشر على Vercel

### 1. تثبيت Vercel CLI

```bash
npm i -g vercel
```

### 2. تسجيل الدخول

```bash
vercel login
```

### 3. النشر

```bash
vercel --prod
```

## ☁️ النشر على Netlify

### 1. تثبيت Netlify CLI

```bash
npm i -g netlify-cli
```

### 2. تسجيل الدخول

```bash
netlify login
```

### 3. النشر

```bash
netlify deploy --prod --dir=dist
```

## 🌐 النشر على GitHub Pages

### 1. تثبيت gh-pages

```bash
npm i -D gh-pages
```

### 2. إضافة scripts إلى package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. النشر

```bash
npm run deploy
```

## 🔧 إعدادات البيئة

### متغيرات البيئة

أنشئ ملف `.env` في جذر المشروع:

```env
VITE_APP_ENV=production
VITE_APP_NAME=جمعية
VITE_APP_VERSION=1.0.0
```

### إعدادات nginx

للنشر على خادم nginx:

```nginx
server {
    listen 80;
    server_name jamiya.dz;
    root /var/www/jamiya/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # ضغط المحتوى
    gzip on;
    gzip_types text/plain text/css application/javascript;
}
```

## 📊 مراقبة الأداء

### Lighthouse

```bash
npm install -g lighthouse
lighthouse https://jamiya.dz --output=html --output-path=report.html
```

### Web Vitals

التطبيق يتضمن قياس Web Vitals تلقائياً.

## 🔒 الأمان

### رؤوس HTTP

تأكد من إضافة هذه الرؤوس في خادمك:

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### HTTPS

يجب استخدام HTTPS في الإنتاج. يمكن استخدام Let's Encrypt للحصول على شهادة مجانية.

## 🔄 CI/CD

### GitHub Actions

أنشئ ملف `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 📱 PWA

التطبيق يدعم PWA بشكل كامل. تأكد من:

1. وجود `manifest.json` في مجلد `public`
2. وجود أيقونات بجميع الأحجام المطلوبة
3. تسجيل Service Worker

## 🧪 الاختبار قبل النشر

### قائمة المراجعة

- [ ] جميع الاختبارات تمر
- [ ] لا توجد أخطاء TypeScript
- [ ] لا توجد أخطاء ESLint
- [ ] البناء ناجح
- [ ] التطبيق يعمل على المتصفحات الرئيسية
- [ ] التطبيق يعمل على الأجهزة المحمولة
- [ ] RTL يعمل بشكل صحيح
- [ ] PWA يعمل بشكل صحيح

## 🆘 استكشاف الأخطاء

### مشكلة: البناء يفشل

**الحل:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### مشكلة: Docker لا يعمل

**الحل:**
```bash
docker system prune -a
docker-compose up -d --build
```

### مشكلة: الأصول لا تظهر

**الحل:**
تأكد من أن `base` في `vite.config.ts` محدد بشكل صحيح:
```typescript
export default defineConfig({
  base: './',
  // ...
});
```

## 📞 الدعم

للمساعدة في النشر:
- البريد: dev@jamiya.dz
- GitHub Issues: https://github.com/jamiya/jamiya-app/issues

---

**ملاحظة:** هذا دليل عام. قد تحتاج لتعديلات حسب بيئتك الخاصة.
