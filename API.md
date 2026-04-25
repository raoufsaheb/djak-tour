# توثيق API

> **ملاحظة:** هذا التوثيق للإصدار المستقبلي مع Backend حقيقي. النسخة الحالية تستخدم بيانات وهمية.

## 🔗 Base URL

```
Production: https://api.jamiya.dz/v1
Staging: https://api-staging.jamiya.dz/v1
Development: http://localhost:3000/v1
```

## 🔐 المصادقة

جميع الطلبات تتطلب رمز المصادقة (Bearer Token):

```http
Authorization: Bearer <token>
```

## 📋 نقاط النهاية

### المستخدمون

#### تسجيل مستخدم جديد

```http
POST /auth/register
Content-Type: application/json

{
  "phone": "+213550123456",
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "أحمد محمد",
  "incomeLevel": "medium"
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "userId": "user_123",
    "message": "تم إنشاء الحساب بنجاح"
  }
}
```

#### تسجيل الدخول

```http
POST /auth/login
Content-Type: application/json

{
  "phone": "+213550123456",
  "password": "SecurePass123!"
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user_123",
      "fullName": "أحمد محمد",
      "phone": "+213550123456",
      "kycStatus": "verified"
    }
  }
}
```

#### التحقق من OTP

```http
POST /auth/verify-otp
Content-Type: application/json

{
  "phone": "+213550123456",
  "code": "123456"
}
```

### الجمعيات

#### الحصول على جميع الجمعيات

```http
GET /jamiyas
Authorization: Bearer <token>
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "jamiyas": [
      {
        "id": "jamiya_1",
        "name": "مدخرون السريع",
        "monthlyAmount": 10000,
        "duration": 6,
        "maxMembers": 6,
        "currentMembers": 3,
        "status": "open",
        "progress": 50
      }
    ]
  }
}
```

#### الحصول على تفاصيل جمعية

```http
GET /jamiyas/:id
Authorization: Bearer <token>
```

#### إنشاء حجز

```http
POST /jamiyas/:id/book
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentMethod": "card"
}
```

### العضويات

#### الحصول على العضويات النشطة

```http
GET /memberships
Authorization: Bearer <token>
```

#### دفع مساهمة

```http
POST /memberships/:id/pay
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 25000
}
```

### المعاملات

#### الحصول على سجل المعاملات

```http
GET /transactions
Authorization: Bearer <token>
Query Parameters:
  - type: contribution|receiving|fee|refund
  - page: number
  - limit: number
```

### الإشعارات

#### الحصول على الإشعارات

```http
GET /notifications
Authorization: Bearer <token>
```

#### تعليم كمقروء

```http
PATCH /notifications/:id/read
Authorization: Bearer <token>
```

## 📊 أكواد الاستجابة

| الكود | المعنى |
|-------|--------|
| 200 | نجاح |
| 201 | تم الإنشاء |
| 400 | طلب خاطئ |
| 401 | غير مصرح |
| 403 | ممنوع |
| 404 | غير موجود |
| 500 | خطأ في الخادم |

## ❌ أكواد الأخطاء

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PHONE",
    "message": "رقم الهاتف غير صالح"
  }
}
```

### قائمة أكواد الأخطاء

| الكود | الوصف |
|-------|-------|
| INVALID_PHONE | رقم الهاتف غير صالح |
| INVALID_PASSWORD | كلمة المرور ضعيفة |
| USER_EXISTS | المستخدم موجود بالفعل |
| USER_NOT_FOUND | المستخدم غير موجود |
| INVALID_OTP | رمز OTP غير صحيح |
| KYC_REQUIRED | التحقق من الهوية مطلوب |
| INSUFFICIENT_FUNDS | رصيد غير كافٍ |
| JAMIYA_FULL | الجمعية مكتملة |

## 🔄 الترقيم

```http
GET /jamiyas?page=1&limit=10
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

## 📱 WebSockets

للإشعارات الفورية:

```javascript
const ws = new WebSocket('wss://api.jamiya.dz/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'Bearer <token>'
  }));
};

ws.onmessage = (event) => {
  const notification = JSON.parse(event.data);
  console.log(notification);
};
```

## 🧪 الاختبار

### Postman Collection

يمكنك تحميل مجموعة Postman من:
```
https://api.jamiya.dz/postman-collection.json
```

### cURL Examples

```bash
# تسجيل الدخول
curl -X POST https://api.jamiya.dz/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"+213550123456","password":"pass123"}'

# الحصول على الجمعيات
curl https://api.jamiya.dz/v1/jamiyas \
  -H "Authorization: Bearer <token>"
```

## 📚 SDKs

### JavaScript

```bash
npm install @jamiya/sdk
```

```javascript
import { JamiyaClient } from '@jamiya/sdk';

const client = new JamiyaClient({
  apiKey: 'your-api-key'
});

const jamiyas = await client.jamiyas.list();
```

---

**ملاحظة:** هذا التوثيق قيد التطوير وقد يتغير.

**آخر تحديث:** 2025-02-28
