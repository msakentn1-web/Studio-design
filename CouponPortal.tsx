'use client';

import React, { useState } from 'react';
import { Coupon, Language } from '@/types/store';
import { translations } from '@/lib/i18n';
import { Ticket, CheckCircle2, AlertCircle, Sparkles, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CouponPortalProps {
  coupons: Coupon[];
  appliedCoupon: string | null;
  discountPercent: number;
  language: Language;
  onApplyCoupon: (code: string, percent: number) => void;
  onOpenAdmin?: () => void;
}

export const CouponPortal: React.FC<CouponPortalProps> = ({
  coupons,
  appliedCoupon,
  discountPercent,
  language,
  onApplyCoupon,
  onOpenAdmin,
}) => {
  const t = translations[language];
  const [inputCode, setInputCode] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleaned = inputCode.trim().toUpperCase();

    if (!cleaned) return;

    // Admin Panel Portal trigger
    if (cleaned === '22768061') {
      if (onOpenAdmin) onOpenAdmin();
      setMessage(null);
      setInputCode('');
      return;
    }

    const matched = coupons.find(
      (c) => c.code.toUpperCase() === cleaned && c.active
    );

    if (matched) {
      onApplyCoupon(matched.code, matched.discountPercent);
      setMessage({
        type: 'success',
        text: `${t.couponSuccess} (${t.discountApplied} ${matched.discountPercent}%)`,
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#0072ff', '#ffffff', '#a5f3fc'],
        });
      } catch (err) {
        // Fallback
      }
    } else {
      setMessage({
        type: 'error',
        text: t.couponInvalid,
      });
    }
  };

  const handleQuickCouponClick = (code: string) => {
    setInputCode(code);
    const matched = coupons.find((c) => c.code === code && c.active);
    if (matched) {
      onApplyCoupon(matched.code, matched.discountPercent);
      setMessage({
        type: 'success',
        text: `${t.couponSuccess} (${t.discountApplied} ${matched.discountPercent}%)`,
      });
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#0072ff', '#ffffff'],
        });
      } catch (err) {}
    }
  };

  return (
    <section id="coupons" className="py-16 px-4 max-w-5xl mx-auto relative">
      <div className="glass-cyan-card rounded-2xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden shadow-2xl">
        {/* Header Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-3xl shadow-[0_0_20px_rgba(0,240,255,0.3)] mx-auto">
          🎁
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            🎁 <span className="text-cyan-neon">العروض والكوبونات</span>
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm font-light">
            {t.couponPortalDesc}
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleApply} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Ticket className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00f0ff]" />
            <input
              type="text"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                if (message) setMessage(null);
              }}
              placeholder={t.couponPlaceholder}
              className="w-full bg-[#020714] border border-[#00f0ff]/30 rounded-xl pr-10 pl-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] font-mono tracking-wider uppercase text-right"
            />
          </div>

          <button
            type="submit"
            id="apply-coupon-btn"
            className="px-6 py-3 rounded-xl btn-cyan-glow text-white font-extrabold text-xs cursor-pointer"
          >
            {t.applyCoupon}
          </button>
        </form>

        {/* Status Message */}
        {message && (
          <div
            className={`max-w-xl mx-auto p-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold ${
              message.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Currently Applied Badge */}
        {appliedCoupon && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] text-xs font-bold">
            <Sparkles className="w-4 h-4 text-[#00f0ff]" />
            <span>
              الكوبون المطبق حالياً: <strong className="font-mono text-white">{appliedCoupon}</strong> ({discountPercent}% خصم)
            </span>
          </div>
        )}

        {/* Quick Test Coupon Chips */}
        <div className="pt-4 border-t border-[#00f0ff]/10 max-w-2xl mx-auto space-y-3">
          <p className="text-xs text-[#00f0ff]/80">
            {t.activeCouponsHint}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {coupons.filter(c => c.active).map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => handleQuickCouponClick(c.code)}
                className="px-3.5 py-1.5 rounded-xl bg-[#040e24] border border-[#00f0ff]/30 hover:border-[#00f0ff] text-[#00f0ff] hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Gift className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>{c.code}</span>
                <span className="text-[10px] bg-[#00f0ff] text-black px-1.5 py-0.2 rounded font-sans font-black">
                  {c.discountPercent}%
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
