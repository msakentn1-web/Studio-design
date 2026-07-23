'use client';

import React from 'react';
import { StoreSettings, Language } from '@/types/store';
import { translations } from '@/lib/i18n';
import { ExternalLink, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  settings: StoreSettings;
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings, language }) => {
  const t = translations[language];

  const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1836] border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
          <span>تواصل معنا</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white">
          تواصل <span className="text-cyan-neon">مع الاستوديو</span>
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm">
          نحن هنا لتحويل رؤيتك إلى تصميم احترافي مبهر. اختر المنصة المفضلة لديك للتواصل الفوري.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* WhatsApp Direct */}
        <a
          href={`https://wa.me/${cleanNum}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-cyan-card glass-cyan-hover p-8 rounded-2xl flex flex-col items-center text-center gap-3 group"
        >
          <div className="text-4xl p-3 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30">
            💬
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
              {t.whatsapp}
            </h3>
            <p className="text-xs text-gray-300 mt-1">{t.whatsappDesc}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white mt-4 px-5 py-2.5 rounded-full btn-cyan-glow">
              <span>تواصل مباشر عبر الواتساب</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>
        </a>

        {/* TopTop KSA */}
        <div className="glass-cyan-card glass-cyan-hover p-8 rounded-2xl flex flex-col items-center text-center gap-3 group">
          <div className="text-4xl p-3 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30">
            📱
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
              {t.toptopKsa}
            </h3>
            <p className="text-xs text-gray-300 mt-1">{t.toptopKsaDesc}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00f0ff] mt-4 px-4 py-2 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30">
              ID: 25859934
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
