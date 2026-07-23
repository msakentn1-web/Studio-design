'use client';

import React from 'react';
import { Language } from '@/types/store';
import { translations } from '@/lib/i18n';
import { Heart } from 'lucide-react';

interface FooterProps {
  language: Language;
  storeName: string;
}

export const Footer: React.FC<FooterProps> = ({ language, storeName }) => {
  const t = translations[language];

  return (
    <footer className="w-full bg-[#020612] border-t border-[#00f0ff]/20 py-12 px-4 relative mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-right">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0055ff] to-[#00f0ff] p-[2px] shadow-[0_0_15px_#00f0ff]">
              <div className="w-full h-full bg-[#030816] rounded-full flex items-center justify-center font-bold text-xs text-[#00f0ff]">
                CRA
              </div>
            </div>
            <div>
              <span className="font-serif font-black text-base tracking-wider text-white uppercase">
                MAESTRO <span className="text-[#00f0ff]">DESIGN</span>
              </span>
              <p className="text-[9px] tracking-widest text-[#00f0ff] font-sans uppercase">
                CRA DESIGN MAESTRO
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-xs leading-relaxed max-w-md font-light">
            استوديو مايسترو متجر فاخر متوافق مع أحدث معايير الهوية البصرية والتصميم الرقمي. نحول رؤية عملائنا إلى تصاميم احترافية استثنائية وبمعايير عالمية.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white">روابط سريعة</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li>
              <a href="#hero" className="hover:text-[#00f0ff] transition-colors">
                {t.navHome}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-[#00f0ff] transition-colors">
                {t.navServices}
              </a>
            </li>
            <li>
              <a href="#portfolio" className="hover:text-[#00f0ff] transition-colors">
                الملفات والمعرض
              </a>
            </li>
            <li>
              <a href="#coupons" className="hover:text-[#00f0ff] transition-colors">
                العروض والخصومات
              </a>
            </li>
          </ul>
        </div>

        {/* Guarantees */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white">ضمانات مايسترو</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex items-center gap-1.5 justify-end">
              <span>تسليم الملفات المصدرية بالكامل</span>
              <span className="text-[#00f0ff]">⚡</span>
            </li>
            <li className="flex items-center gap-1.5 justify-end">
              <span>تعديلات غير محدودة حتى الرضا</span>
              <span className="text-[#00f0ff]">💎</span>
            </li>
            <li className="flex items-center gap-1.5 justify-end">
              <span>حماية حقوق العلامة التجارية</span>
              <span className="text-[#00f0ff]">🛡️</span>
            </li>
            <li className="flex items-center gap-1.5 justify-end">
              <span>دعم فني متواصل عبر واتساب</span>
              <span className="text-[#00f0ff]">🎧</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-[#00f0ff]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <span>{t.copyright}</span>
        <div className="flex items-center gap-2">
          <span>صُنِع بـ</span>
          <Heart className="w-3.5 h-3.5 text-[#00f0ff] fill-[#00f0ff]" />
          <span>في المملكة العربية السعودية 🇸🇦</span>
        </div>
      </div>
    </footer>
  );
};
