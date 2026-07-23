'use client';

import React, { useState } from 'react';
import { Language } from '@/types/store';
import { translations } from '@/lib/i18n';
import { 
  Sparkles, 
  Rocket, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  ShieldCheck, 
  Star, 
  Clock, 
  Trophy, 
  Smartphone, 
  LayoutGrid, 
  Sparkle,
  Image as ImageIcon,
  Palette,
  Send,
  MessageCircle,
  Gem,
  Award,
  Zap,
  Tag,
  Headphones
} from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  whatsappNumber: string;
  onBrowseClick: () => void;
}

interface FeatureCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bgGradient: string;
  badge: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  whatsappNumber,
  onBrowseClick,
}) => {
  const t = translations[language];

  // 3D Carousel Cards state
  const [activeIndex, setActiveIndex] = useState(2); // Start at index 2 (تصميم تطبيقات)

  const cards: FeatureCard[] = [
    {
      id: 'avatar',
      title: 'أفاتار',
      subtitle: 'تصميم شخصيات ثابتة ومتتحركة',
      icon: <Palette className="w-5 h-5 text-purple-400" />,
      bgGradient: 'from-[#0d0f28] via-[#1a123d] to-[#080a1c]',
      badge: 'شخصيات احترافية',
    },
    {
      id: 'tifo',
      title: 'تيفو',
      subtitle: 'تصميم تيفو ثابتة ومتتحركة',
      icon: <ImageIcon className="w-5 h-5 text-red-400" />,
      bgGradient: 'from-[#280d0d] via-[#3d1212] to-[#1c0808]',
      badge: 'جماهيري ومبتكر',
    },
    {
      id: 'apps',
      title: 'تصميم تطبيقات',
      subtitle: 'تصميم تطبيقات احترافية بأحدث التقنيات',
      icon: <Smartphone className="w-5 h-5 text-[#00f0ff]" />,
      bgGradient: 'from-[#051c3d] via-[#082a5c] to-[#020d1f]',
      badge: 'الأكثر طلباً',
    },
    {
      id: 'backgrounds',
      title: 'خلفيات',
      subtitle: 'خلفيات غرف ثابتة ومتتحركة',
      icon: <LayoutGrid className="w-5 h-5 text-indigo-400" />,
      bgGradient: 'from-[#120d28] via-[#1d123d] to-[#08081c]',
      badge: 'ستريمرز وصناع محتوى',
    },
    {
      id: 'invitations',
      title: 'دعوات',
      subtitle: 'تصميم دعوات المناسبات والمعارض',
      icon: <Sparkle className="w-5 h-5 text-amber-400" />,
      bgGradient: 'from-[#281a0d] via-[#3d2712] to-[#1c1108]',
      badge: 'مناسبات فاخرة',
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleWhatsappClick = () => {
    const cleanNum = whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      'مرحباً استوديو مايسترو، أرغب في الاستفسار عن خدمات التصميم واستعراض العروض الحالية.'
    );
    window.open(`https://wa.me/${cleanNum}?text=${message}`, '_blank');
  };

  return (
    <section id="hero" className="relative min-h-[90vh] pt-6 pb-20 px-4 overflow-hidden bg-[#030712]">
      {/* Radial Ambient Cyan Neon Background Flares */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#00f0ff]/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-[#0055ff]/15 blur-[160px] rounded-full pointer-events-none" />
      
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12">
        {/* Main Hero Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Right Column (Arabic Text Content & Action Buttons) */}
          <div className="lg:col-span-6 text-right flex flex-col items-start gap-6">
            {/* Small Welcome Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1836] border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
              <span>مرحباً بك في</span>
            </div>

            {/* Giant Metallic Chrome & Neon Title */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-chrome-gradient drop-shadow-2xl font-sans">
                MAESTRO
              </h1>
              <span className="block text-4xl sm:text-6xl xl:text-7xl font-black text-cyan-neon tracking-widest -mt-2">
                DESIGN
              </span>
            </div>

            {/* Subtitle Slogan */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#00f0ff] tracking-wide">
              <span>✦</span>
              <span>إبداع بلا حدود، نصنع أفكارك لتصبح واقعاً مشرقاً</span>
              <span>✦</span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal max-w-xl">
              نقدم لك خدمات تصميم احترافية بمعايير عالمية وجودة استثنائية لنجعل علامتك تجارية تتألق وتترك أثراً لا يُنسى في قلوب عملائك.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              {/* Primary Glowing Rocket Button */}
              <button
                onClick={onBrowseClick}
                id="hero-browse-services"
                className="w-full sm:w-auto px-8 py-4 rounded-full btn-cyan-glow text-white font-black text-base flex items-center justify-center gap-3 cursor-pointer"
              >
                <Rocket className="w-5 h-5 text-white animate-bounce" />
                <span>ابدأ طلبك الآن</span>
              </button>

              {/* Secondary Dark Glass Button */}
              <button
                onClick={onBrowseClick}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#081226]/80 border border-[#00f0ff]/30 text-white hover:border-[#00f0ff] font-bold text-base transition-all flex items-center justify-center gap-3 cursor-pointer hover:bg-[#0d1e40]"
              >
                <LayoutGrid className="w-5 h-5 text-[#00f0ff]" />
                <span>استعرض الخدمات</span>
              </button>
            </div>
          </div>

          {/* Left Column (3D Circular Podium Stage with Floating Fan Carousel Cards) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[460px] pt-8">
            
            {/* Nav Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#08152e]/80 border border-[#00f0ff]/40 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all flex items-center justify-center shadow-lg cursor-pointer"
              title="السابق"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#08152e]/80 border border-[#00f0ff]/40 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all flex items-center justify-center shadow-lg cursor-pointer"
              title="التالي"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Fan Cards Stack */}
            <div className="relative w-full max-w-lg h-[340px] flex items-center justify-center perspective-stage">
              {cards.map((card, idx) => {
                const offset = idx - activeIndex;
                const isCenter = offset === 0;

                // Mathematical 3D position calculation for fan curve
                let transformClass = '';
                let zIndex = 10 - Math.abs(offset);
                let opacity = 1 - Math.abs(offset) * 0.25;

                if (offset === 0) {
                  transformClass = 'scale-105 translate-y-0 rotate-0 z-20';
                } else if (offset === -1) {
                  transformClass = '-translate-x-20 translate-y-2 -rotate-6 scale-95 opacity-80 z-10';
                } else if (offset === 1) {
                  transformClass = 'translate-x-20 translate-y-2 rotate-6 scale-95 opacity-80 z-10';
                } else if (offset === -2) {
                  transformClass = '-translate-x-36 translate-y-6 -rotate-12 scale-85 opacity-50 z-0';
                } else if (offset === 2) {
                  transformClass = 'translate-x-36 translate-y-6 rotate-12 scale-85 opacity-50 z-0';
                } else {
                  opacity = 0;
                }

                if (opacity <= 0) return null;

                return (
                  <div
                    key={card.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`absolute w-52 sm:w-60 h-80 rounded-2xl p-5 border transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden shadow-2xl ${
                      isCenter
                        ? 'bg-gradient-to-b from-[#081b38] via-[#0c254c] to-[#040e21] border-[#00f0ff] shadow-[0_0_35px_rgba(0,240,255,0.4)]'
                        : 'bg-[#060d1f]/90 border-white/10 hover:border-[#00f0ff]/50'
                    } ${transformClass}`}
                    style={{ zIndex, opacity }}
                  >
                    {/* Top Icon Badge */}
                    <div className="flex justify-between items-center">
                      <div className="p-2 rounded-xl bg-[#020817]/80 border border-[#00f0ff]/30 shadow-inner">
                        {card.icon}
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] font-bold border border-[#00f0ff]/30">
                        {card.badge}
                      </span>
                    </div>

                    {/* Artwork Graphic Mockup */}
                    <div className="my-auto h-32 rounded-xl bg-gradient-to-b from-[#02091c] to-[#0a1630] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
                      {card.id === 'apps' ? (
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-12 h-12 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff] flex items-center justify-center shadow-[0_0_15px_#00f0ff]">
                            <Smartphone className="w-6 h-6 text-[#00f0ff]" />
                          </div>
                          <span className="text-[10px] text-gray-300 font-bold">تطبيقات ذكية</span>
                        </div>
                      ) : card.id === 'avatar' ? (
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center">
                          <Palette className="w-6 h-6 text-purple-400" />
                        </div>
                      ) : card.id === 'tifo' ? (
                        <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-400 flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-red-400" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                          <Sparkle className="w-6 h-6 text-amber-400" />
                        </div>
                      )}
                    </div>

                    {/* Bottom Title & Subtitle */}
                    <div className="text-center pt-2">
                      <h3 className="text-base font-extrabold text-white mb-0.5">
                        {card.title}
                      </h3>
                      <p className="text-[10px] text-gray-400 leading-tight">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3D Stage / Podium Platform */}
            <div className="relative w-72 sm:w-96 h-20 -mt-10 z-0 flex items-center justify-center">
              {/* Glowing Stage Oval */}
              <div className="w-full h-12 rounded-[100%] bg-gradient-to-b from-[#0a1c3b] to-[#020714] border-2 border-[#00f0ff]/60 shadow-[0_0_40px_rgba(0,240,255,0.5)] flex items-center justify-center relative">
                
                {/* Center Podium Emblem */}
                <div className="w-16 h-16 rounded-full bg-[#030917] border-2 border-[#00f0ff] shadow-[0_0_20px_#00f0ff] flex flex-col items-center justify-center z-10 -mt-1">
                  <span className="text-[10px] font-black text-[#00f0ff] tracking-tight leading-none">CRA</span>
                  <span className="text-[6px] text-white font-bold tracking-widest leading-none">DESIGN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Counter Bar */}
        <div className="w-full glass-cyan-card rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#00f0ff]/20">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center gap-1 pt-3 md:pt-0">
              <div className="flex items-center gap-2 text-[#00f0ff]">
                <Users className="w-5 h-5 text-[#00f0ff]" />
                <span className="text-2xl sm:text-3xl font-black font-serif text-white">+1200</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">عميل سعيد</span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center gap-1 pt-3 md:pt-0">
              <div className="flex items-center gap-2 text-[#00f0ff]">
                <ShieldCheck className="w-5 h-5 text-[#00f0ff]" />
                <span className="text-2xl sm:text-3xl font-black font-serif text-white">100%</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">ضمان الجودة</span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center gap-1 pt-3 md:pt-0">
              <div className="flex items-center gap-2 text-[#00f0ff]">
                <Star className="w-5 h-5 text-[#00f0ff]" />
                <span className="text-2xl sm:text-3xl font-black font-serif text-white">+2500</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">مشروع مكتمل</span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center gap-1 pt-3 md:pt-0">
              <div className="flex items-center gap-2 text-[#00f0ff]">
                <Clock className="w-5 h-5 text-[#00f0ff]" />
                <span className="text-2xl sm:text-3xl font-black font-serif text-white">24/7</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">دعم متواصل</span>
            </div>

            {/* Stat 5 */}
            <div className="flex flex-col items-center gap-1 pt-3 md:pt-0 col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-[#00f0ff]">
                <Trophy className="w-5 h-5 text-[#00f0ff]" />
                <span className="text-xl sm:text-2xl font-black text-[#00f0ff]">إبداع</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">بلا حدود</span>
            </div>
          </div>
        </div>

        {/* Feature Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#081226]/80 border border-[#00f0ff]/20 text-xs font-bold text-gray-200 shadow-lg">
            <span>تصاميم فريدة</span>
            <Gem className="w-4 h-4 text-[#00f0ff]" />
          </div>

          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#081226]/80 border border-[#00f0ff]/20 text-xs font-bold text-gray-200 shadow-lg">
            <span>جودة عالية</span>
            <Award className="w-4 h-4 text-[#00f0ff]" />
          </div>

          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#081226]/80 border border-[#00f0ff]/20 text-xs font-bold text-gray-200 shadow-lg">
            <span>تسليم سريع</span>
            <Zap className="w-4 h-4 text-[#00f0ff]" />
          </div>

          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#081226]/80 border border-[#00f0ff]/20 text-xs font-bold text-gray-200 shadow-lg">
            <span>أسعار تنافسية</span>
            <Tag className="w-4 h-4 text-[#00f0ff]" />
          </div>

          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#081226]/80 border border-[#00f0ff]/20 text-xs font-bold text-gray-200 shadow-lg">
            <span>دعم دائم</span>
            <Headphones className="w-4 h-4 text-[#00f0ff]" />
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={handleWhatsappClick}
          className="group relative flex items-center gap-3 p-3 sm:px-5 sm:py-3 rounded-full btn-cyan-glow text-white shadow-2xl transition-all cursor-pointer"
        >
          <div className="relative">
            <MessageCircle className="w-7 h-7 text-white fill-current" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="hidden sm:flex flex-col text-right">
            <span className="font-extrabold text-xs">اطلب عبر واتساب</span>
            <span className="text-[10px] text-cyan-100 font-light">رد سريع خلال دقائق</span>
          </div>
        </button>
      </div>
    </section>
  );
};
