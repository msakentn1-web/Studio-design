import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-serif italic text-amber-500 mb-4">404 - الصفحة غير موجودة</h1>
      <p className="text-gray-400 mb-6 text-sm">الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-all"
      >
         العودة للرئيسية
      </Link>
    </div>
  );
}
