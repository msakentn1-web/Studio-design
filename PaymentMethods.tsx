'use client';

import React, { useState } from 'react';
import { StoreSettings, Language } from '@/types/store';
import { translations } from '@/lib/i18n';
import { Landmark, ShieldCheck } from 'lucide-react';

interface PaymentMethodsProps {
  settings: StoreSettings;
  language: Language;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ settings, language }) => {
  const t = translations[language];
  const [showBankDetails, setShowBankDetails] = useState(false);

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="glass-cyan-card rounded-2xl p-8 sm:p-12 border border-[#00f0ff]/30 text-center space-y-8 shadow-2xl">
        <div className="flex items-center justify-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#00f0ff]" />
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            وسائل <span className="text-cyan-neon">الدفع المتاحة</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mada Card */}
          <div className="glass-cyan-card glass-cyan-hover rounded-xl p-6 flex flex-col items-center gap-3">
            <div className="text-3xl p-3 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30">
              💳
            </div>
            <h3 className="font-bold text-white text-base">{t.mada}</h3>
            <p className="text-xs text-gray-300 font-light">دفع آمن وفوري بكروت مدى السعودية</p>
          </div>

          {/* STC Pay Card */}
          <div className="glass-cyan-card glass-cyan-hover rounded-xl p-6 flex flex-col items-center gap-3">
            <div className="text-3xl p-3 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30">
              📡
            </div>
            <h3 className="font-bold text-white text-base">{t.stcPay}</h3>
            <p className="text-xs text-gray-300 font-light">تحويل مباشر عبر محفظة STC Pay</p>
          </div>

          {/* Bank Transfer Card */}
          <div 
            onClick={() => setShowBankDetails(!showBankDetails)}
            className="glass-cyan-card glass-cyan-hover rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer"
          >
            <div className="text-3xl p-3 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30">
              🏦
            </div>
            <h3 className="font-bold text-white text-base">{t.bankTransfer}</h3>
            <p className="text-xs text-[#00f0ff] font-bold">
              انقر لإظهار بيانات الحساب والآيبان 📋
            </p>
          </div>
        </div>

        {/* Bank Account Details Drawer */}
        {showBankDetails && (
          <div className="p-6 rounded-xl bg-[#030917] border border-[#00f0ff]/30 text-right max-w-xl mx-auto space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-[#00f0ff]/20 pb-3">
              <span className="text-xs font-bold text-[#00f0ff] uppercase tracking-widest">
                تفاصيل الحساب البنكي الرسمي
              </span>
              <Landmark className="w-4 h-4 text-[#00f0ff]" />
            </div>

            <div className="space-y-2 text-xs text-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{t.bankNameLabel}</span>
                <span className="font-bold text-white">{settings.bankName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{t.accountNameLabel}</span>
                <span className="font-bold text-white">{settings.bankAccountName}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 border-t border-[#00f0ff]/20">
                <span className="text-gray-400">رقم الآيبان (IBAN):</span>
                <span className="font-bold text-[#00f0ff] text-xs">
                  يُرسل الآيبان البنكي مباشرة عند تأكيد الطلب عبر الواتساب
                </span>
              </div>
            </div>

            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('مرحباً استوديو مايسترو، أود الحصول على رقم الآيبان للتحويل البنكي.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl btn-cyan-glow text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>طلب رقم الآيبان عبر الواتساب 💬</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
