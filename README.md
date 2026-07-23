# Maestro Design Studio | استوديو مايسترو للتصميم الرقمي

تطبيق ويب متكامل واحترافي لاستوديو تصميم براندات وهيئات بصرية وشعارات وموشن جرافيك، مع نظام إدارة طلبات متقدم عبر الواتساب، توليد الموجز الإبداعي بالذكاء الاصطناعي (AI Brief Generator)، ودعم كامل للغات (العربية، الإنجليزية، الفرنسية) والعملات (SAR, USD, EUR).

---

## 🌟 المميزات الرئيسية (Key Features)

- **تصميم استثنائي واستجابة كاملة**: تصميم مستقبلي فاخر (Dark Cyberpunk / Glassmorphism) متوافق مع كافة الشاشات والواتساب.
- **تعدد اللغات والعملات**: دعم العربية والإنجليزية والفرنسية + التحويل اللحظي بأسعار الصرف الدقيقة للريال السعودي، الدولار الأمريكي، واليورو.
- **سلة تسوق خفيفة وتفصيلية**: إمكانية إضافة الخدمات، خصم الكوبونات، وحساب إجمالي السعر مع إنشاء نص طلب مفصل ومعدّ للإرسال مباشرة للواتساب.
- **مُولّد البريف الإبداعي بالذكاء الاصطناعي (AI Brief Generator)**: أداة تفاعلية تصيغ متطلبات العميل بشكل بريف إبداعي محترف بضغطة زر.
- **معرض أعمال تفاعلي (Portfolio)**: استعراض الأعمال السابقة مع إمكانية التصفية والتكبير والاستعراض.
- **لوحة تحكم للأدمن (Admin Dashboard)**: إدارة الخدمات، تعديل الأسعار، إضافة وتعديل الكوبونات، واستعراض سجل الطلبات.

---

## 🚀 التشغيل المحلي (Local Setup)

تأكد من تثبيت [Node.js](https://nodejs.org/) (الإصدار 18 أو أحدث).

1. **تثبيت الحزم والمكتبات**:
   ```bash
   npm install
   ```

2. **تشغيل خادم التطوير (Development Server)**:
   ```bash
   npm run dev
   ```
   افتح المتصفح على [http://localhost:3000](http://localhost:3000).

3. **بناء النسخة الإنتاجية (Production Build)**:
   ```bash
   npm run build
   ```
   سيتم تجهيز وبناء التطبيق للعمل على أي استضافة تدعم Next.js مثل Vercel أو Netlify أو أي خادم Node.js.

---

## 📤 كيفية رفع المشروع على GitHub (Push to GitHub)

1. افتح موجه الأوامر (Terminal) في مجلد المشروع وقم بتهيئة Git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Maestro Design Studio"
   git branch -M main
   ```

2. قم بإنشاء مستودع جديد (Repository) على حسابك في GitHub، ثم ارفط المستودع وارفع الكود:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git push -u origin main
   ```

---

## 🌐 كيفية النشر على استضافة خارجية (Deployment Guide)

المشروع جاهز ومستقل تماماً للنشر على أي منصة استضافة:

### 1. Vercel (الأسهل والأسرع)
- سجل الدخول إلى [Vercel.com](https://vercel.com).
- انقر على **New Project** واختر مستودع GitHub الخاص بك.
- سيتعرف Vercel تلقائياً على إعدادات Next.js، انقر على **Deploy**.

### 2. Netlify
- اختر **Import from Git** واسحب المستودع من GitHub.
- قم بتعيين Build Command: `npm run build` والـ Publish directory: `dist`.

### 3. GitHub Pages
- يمكنك استخدام إضافة `gh-pages` لنشر مجلد `dist` المولد بنقرة واحدة.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & Lucide Icons
- **Animation**: Motion (Framer Motion)
- **State & Storage**: React Hooks & LocalStorage Persistence

---

صُنع بكل حب لإخراج أفضل تجربة استوديو تصميم مستقل! 🚀
