'use client';

import React, { useState } from 'react';
import { Language, Currency } from '@/types/store';
import { translations, currencySymbols, currencyFullNames } from '@/lib/i18n';
import { ShoppingBag, Sparkles, Menu, X, ChevronDown, Sparkle } from 'lucide-react';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  storeName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  currency,
  setCurrency,
  cartCount,
  onOpenCart,
  storeName,
}) => {
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#030712]/90 border-b border-[#00f0ff]/20 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* Top Banner with Quick Options */}
      <div className="bg-[#02050e] border-b border-[#00f0ff]/10 px-4 py-1.5 text-xs text-gray-300 flex flex-wrap justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
          <span className="text-gray-300">{t.motto}</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#00f0ff]/40 text-[11px] text-gray-200 transition-colors"
            >
              <span>
                {language === 'ar' ? '🇸🇦 العربية' : language === 'en' ? '🇬🇧 English' : '🇫🇷 Français'}
              </span>
              <ChevronDown className="w-3 h-3 text-[#00f0ff]" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-[#060c1c] border border-[#00f0ff]/30 rounded-xl shadow-2xl py-1 z-50">
                <button
                  onClick={() => { setLanguage('ar'); setLangDropdownOpen(false); }}
                  className={`w-full text-right px-3 py-1.5 text-xs hover:bg-[#00f0ff]/10 flex items-center gap-2 ${language === 'ar' ? 'text-[#00f0ff] font-bold' : 'text-gray-300'}`}
                >
                  🇸🇦 العربية
                </button>
                <button
                  onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#00f0ff]/10 flex items-center gap-2 ${language === 'en' ? 'text-[#00f0ff] font-bold' : 'text-gray-300'}`}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => { setLanguage('fr'); setLangDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#00f0ff]/10 flex items-center gap-2 ${language === 'fr' ? 'text-[#00f0ff] font-bold' : 'text-gray-300'}`}
                >
                  🇫🇷 Français
                </button>
              </div>
            )}
          </div>

          <span className="opacity-30">|</span>

          {/* Currency Selector */}
          <div className="relative flex items-center gap-1">
            <span className="text-gray-400 hidden sm:inline text-xs">{t.currencyLabel}</span>
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#00f0ff]/40 text-[11px] font-bold text-[#00f0ff] transition-colors"
            >
              <span>{currency === 'SAR' ? '🇸🇦 ر.س SAR' : `${currency} (${currencySymbols[currency] || ''})`}</span>
              <ChevronDown className="w-3 h-3 text-[#00f0ff]" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-[#060c1c] border border-[#00f0ff]/30 rounded-xl shadow-2xl py-1 z-50">
                {(['SAR', 'AED', 'QAR', 'KWD', 'USD', 'EUR'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCurrency(c); setCurrencyDropdownOpen(false); }}
                    className={`w-full text-right px-3 py-2 text-xs hover:bg-[#00f0ff]/10 flex justify-between items-center ${currency === c ? 'text-[#00f0ff] font-bold bg-[#00f0ff]/10' : 'text-gray-300'}`}
                  >
                    <span>{currencyFullNames[c]?.[language] || c}</span>
                    {c === 'SAR' && <span className="text-[10px] bg-[#00f0ff]/20 text-[#00f0ff] px-1.5 py-0.5 rounded font-bold">الرئيسية</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo - CRA / MAESTRO DESIGN Emblem */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#0055ff] via-[#00f0ff] to-[#0072ff] p-[2px] shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#030816] rounded-full flex flex-col items-center justify-center p-1">
              <span className="font-extrabold text-xs tracking-tighter text-[#00f0ff] leading-none">CRA</span>
              <span className="text-[7px] text-gray-300 font-bold uppercase tracking-widest leading-none mt-0.5">DESIGN</span>
            </div>
          </div>
          <div className="flex flex-col text-right">
            <span className="font-serif italic font-extrabold text-xl tracking-wider text-white flex items-center gap-1">
              <span>MAESTRO</span>
              <span className="text-[#00f0ff] text-xs font-sans tracking-normal font-bold">STUDIO</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-gray-400 font-sans -mt-1">
              MAESTRO DESIGN
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-gray-300 uppercase tracking-wider">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="hover:text-[#00f0ff] transition-colors relative group py-1"
          >
            {t.navHome}
            <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#00f0ff] group-hover:w-full transition-all duration-300" />
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="hover:text-[#00f0ff] transition-colors relative group py-1"
          >
            {t.navServices}
            <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#00f0ff] group-hover:w-full transition-all duration-300" />
          </button>
          <button 
            onClick={() => scrollToSection('coupons')} 
            className="hover:text-[#00f0ff] transition-colors relative group py-1 flex items-center gap-1 text-[#00f0ff]"
          >
            <span>العروض</span>
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')} 
            className="hover:text-[#00f0ff] transition-colors relative group py-1"
          >
            الملفات
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-[#00f0ff] transition-colors relative group py-1"
          >
            من نحن
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-[#00f0ff] transition-colors relative group py-1"
          >
            تواصل معنا
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Start Order Glowing Button */}
          <button
            onClick={() => scrollToSection('services')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-cyan-glow text-white font-black text-xs cursor-pointer"
          >
            <Sparkle className="w-3.5 h-3.5 text-white animate-spin" />
            <span>ابدأ الطلب الآن</span>
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            id="open-cart-button"
            className="relative p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#00f0ff]/50 text-gray-200 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            title={t.cartTitle}
          >
            <ShoppingBag className="w-4 h-4 text-[#00f0ff]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#00f0ff] text-black font-extrabold text-[10px] flex items-center justify-center shadow-[0_0_12px_#00f0ff]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Drawer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-[#00f0ff]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#00f0ff]/20 bg-[#030712]/95 backdrop-blur-2xl px-6 py-6 flex flex-col gap-4 text-base font-medium">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-right py-2 hover:text-[#00f0ff] border-b border-gray-800/60"
          >
            {t.navHome}
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-right py-2 hover:text-[#00f0ff] border-b border-gray-800/60"
          >
            {t.navServices}
          </button>
          <button
            onClick={() => scrollToSection('coupons')}
            className="text-right py-2 hover:text-[#00f0ff] border-b border-gray-800/60 text-[#00f0ff]"
          >
            العروض
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-right py-2 hover:text-[#00f0ff] border-b border-gray-800/60"
          >
            الملفات
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-right py-2 hover:text-[#00f0ff] border-b border-gray-800/60"
          >
            تواصل معنا
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="mt-2 w-full py-3 rounded-xl btn-cyan-glow text-white font-bold text-sm text-center"
          >
            ✨ ابدأ الطلب الآن
          </button>
        </div>
      )}
    </header>
  );
};
