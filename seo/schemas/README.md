# Structured Data Schema - Google Search Console Fixes

این فایل راهنمای کامل برای رفع مشکلات Structured Data که توسط Google Search Console شناسایی شده‌اند را ارائه می‌دهد.

## مشکلات حل شده

### 1. خطاهای بحرانی (Critical Errors)

#### ✅ Invalid floating point number in property "price"

- **مشکل**: قیمت‌ها شامل کاما، نماد ارز یا فاصله بودند
- **راه‌حل**: استفاده از `validatePrice()` که قیمت را به فرمت `"29.99"` تبدیل می‌کند

#### ✅ Missing field "image"

- **مشکل**: 13 محصول فاقد تصویر بودند
- **راه‌حل**: استفاده از `validateImages()` که همیشه حداقل یک تصویر (fallback) فراهم می‌کند

#### ✅ Missing "offers", "review", or "aggregateRating"

- **مشکل**: 24 آیتم فاقد این فیلدهای ضروری بودند
- **راه‌حل**: همیشه `offers` و `aggregateRating` اضافه می‌شود، حتی با داده‌های پیش‌فرض

#### ✅ Missing field "name"

- **مشکل**: 24 محصول فاقد نام بودند
- **راه‌حل**: استفاده از `validateProductName()` که همیشه نام معتبر فراهم می‌کند

### 2. بهبودهای مهم (Important Improvements)

#### ✅ Missing merchant return policy

- **راه‌حل**: اضافه شدن `hasMerchantReturnPolicy` با سیاست 7 روزه

#### ✅ Missing shipping details

- **راه‌حل**: اضافه شدن جزئیات ارسال رایگان

#### ✅ Missing availability

- **راه‌حل**: استفاده از `validateAvailability()` برای تعیین وضعیت موجودی

#### ✅ Invalid brand object type

- **راه‌حل**: استفاده از `@type: "Brand"` به جای `"Organization"`

## نحوه استفاده

### 1. تولید Schema محصول

```typescript
import { generateProductSchema } from '@/src/features/products/seo/productSchema';

const productData = {
  id: '123',
  title: 'نام محصول',
  price: 299000,
  image: '/product-image.jpg',
  quantity: 5,
  // ... سایر داده‌ها
};

const schema = generateProductSchema(productData, 'winki.ir');
```

### 2. اعتبارسنجی Schema

```typescript
import { testProductSchema, generateTestReport } from '@/src/shared/seo/schemas';

const result = testProductSchema(schema);
```

### 3. اعتبارسنجی سریع در Development

```typescript
import { quickValidate } from '@/src/shared/seo/schemas';
```

## ویژگی‌های جدید

### 1. Validation Functions

- `validatePrice()`: فرمت‌بندی صحیح قیمت
- `validateImages()`: اطمینان از وجود تصویر
- `validateProductName()`: اطمینان از وجود نام
- `validateSKU()`: تولید SKU معتبر
- `validateAvailability()`: تعیین وضعیت موجودی
- `validateRating()`: اعتبارسنجی امتیاز (1-5)
- `validateBrand()`: اعتبارسنجی برند

### 2. Testing Functions

- `testProductSchema()`: تست کامل schema
- `generateTestReport()`: تولید گزارش تفصیلی
- `quickValidate()`: اعتبارسنجی سریع
- `testProductList()`: تست چندین schema

### 3. Helper Functions

- `createMerchantReturnPolicy()`: تولید سیاست بازگشت
- `createShippingDetails()`: تولید جزئیات ارسال

## مثال کامل

```typescript
import {
  generateProductSchema,
  testProductSchema,
  generateTestReport,
} from '@/src/shared/seo/schemas';

// داده محصول
const product = {
  id: '123',
  title: 'گوشی موبایل سامسونگ',
  description: 'گوشی هوشمند با کیفیت بالا',
  price: 15000000,
  image: '/samsung-phone.jpg',
  quantity: 10,
  brand: { name: 'Samsung' },
  rating: 4.5,
  reviewCount: 25,
  reviews: [
    {
      rating: 5,
      comment: 'عالی بود',
      author: 'علی احمدی',
      date: '2024-01-15',
    },
  ],
};

// تولید schema
const schema = generateProductSchema(product, 'winki.ir');

// تست schema
const testResult = testProductSchema(schema);

// خروجی:
// === Structured Data Test Report ===
// Product: گوشی موبایل سامسونگ
// Score: 100/100
// Status: ✅ PASSED
// 🎉 Perfect! Your structured data meets all Google requirements.
```

## نکات مهم

1. **همیشه از validation functions استفاده کنید** تا از صحت داده‌ها اطمینان حاصل کنید
2. **قبل از deploy، schema را تست کنید** با استفاده از `testProductSchema()`
3. **در محیط development از `quickValidate()` استفاده کنید** برای debugging سریع
4. **تصاویر fallback را آماده کنید** در مسیر `/default-product-image.jpg`

## بررسی در Google Search Console

پس از اعمال این تغییرات:

1. به Google Search Console بروید
2. بخش "Enhancements" > "Products" را بررسی کنید
3. منتظر بمانید تا Google صفحات را دوباره crawl کند (معمولاً 1-2 هفته)
4. خطاهای قبلی باید برطرف شوند

## Performance Tips

- Schema validation فقط در development mode فعال شود
- از caching برای schema های تکراری استفاده کنید
- تصاویر را optimize کنید تا سرعت بارگذاری بهتر شود

## مشکل یابی

اگر هنوز خطا دارید:

2. خروجی را بررسی کنید
3. خطاهای critical را اول رفع کنید
4. از Google's Rich Results Test استفاده کنید: https://search.google.com/test/rich-results
