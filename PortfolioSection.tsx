'use client';

import React, { useState } from 'react';
import { PortfolioItem, Language } from '@/types/store';
import { translations } from '@/lib/i18n';
import { Sparkles, Eye, ShoppingCart } from 'lucide-react';

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
  language: Language;
  onOrderSimilar: (portfolioItem: PortfolioItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolio,
  language,
  onOrderSimilar,
}) => {
  const t = translations[language];
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { key: 'all', label: t.filterAll },
    { key: 'logo', label: t.filterLogo },
    { key: 'identity', label: t.filterIdentity },
    { key: 'social', label: t.filterSocial },
    { key: 'packaging', label: t.filterPackaging },
    { key: 'motion', label: t.filterMotion },
    { key: 'web', label: t.filterWeb },
  ];

  const filteredPortfolio =
    activeCategory === 'all'
      ? portfolio
      : portfolio.filter((item) => item.categoryKey === activeCategory);

  return (
    <section id="portfolio" className="py-20 px-4 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1836] border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
          <span>{t.portfolioTitle}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          معرض <span className="text-cyan-neon">الأعمال الإبداعية</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          {t.portfolioSubtitle}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat.key
                ? 'btn-cyan-glow text-white shadow-lg'
                : 'bg-[#081226]/80 border border-[#00f0ff]/20 text-gray-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPortfolio.map((item) => {
          const title =
            language === 'en' && item.titleEn
              ? item.titleEn
              : language === 'fr' && item.titleFr
              ? item.titleFr
              : item.title;

          return (
            <div
              key={item.id}
              className="group glass-cyan-card glass-cyan-hover rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Image Container with Hover overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black/60 cursor-pointer" onClick={() => setLightboxItem(item)}>
                <img
                  src={item.image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020714] via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Badge Category */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#030917]/80 backdrop-blur-md border border-[#00f0ff]/30 text-[#00f0ff] text-[10px] font-bold">
                  {item.category}
                </div>

                {/* Quick Eye Button */}
                <div className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-[#00f0ff] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_15px_#00f0ff]">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                    {title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-400 text-xs mt-1.5 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[#00f0ff]/10 flex items-center justify-between">
                  {item.tags && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-gray-300 border border-[#00f0ff]/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => onOrderSimilar(item)}
                    id={`order-similar-${item.id}`}
                    className="px-3.5 py-1.5 rounded-xl btn-cyan-glow text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{t.orderSimilar}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="glass-cyan-card rounded-2xl max-w-3xl w-full overflow-hidden border-2 border-[#00f0ff] relative space-y-4 p-6 shadow-[0_0_50px_rgba(0,240,255,0.4)]">
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-[#00f0ff] hover:text-black transition-colors"
            >
              ✕
            </button>

            <div className="rounded-xl overflow-hidden max-h-[60vh]">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="w-full h-full object-contain bg-black"
              />
            </div>

            <div className="space-y-2 text-right">
              <span className="text-xs font-bold text-[#00f0ff]">
                {lightboxItem.category}
              </span>
              <h3 className="text-2xl font-bold text-white">
                {lightboxItem.title}
              </h3>
              {lightboxItem.description && (
                <p className="text-gray-300 text-sm">
                  {lightboxItem.description}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-[#00f0ff]/20">
              <button
                onClick={() => {
                  onOrderSimilar(lightboxItem);
                  setLightboxItem(null);
                }}
                className="px-6 py-3 rounded-xl btn-cyan-glow text-white font-extrabold text-sm flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t.orderSimilar}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
