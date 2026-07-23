'use client';

import React, { useState } from 'react';
import { ServiceItem, Language, Currency } from '@/types/store';
import { translations, currencySymbols } from '@/lib/i18n';
import { ShoppingCart, Check, Clock, Sparkles, Info } from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  language: Language;
  currency: Currency;
  sarConversionRates: Record<Currency, number>;
  onAddToCart: (service: ServiceItem, customNotes?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  language,
  currency,
  sarConversionRates,
  onAddToCart,
}) => {
  const t = translations[language];
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [customBrief, setCustomBrief] = useState('');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const getPrice = (priceSAR: number) => {
    const fallbackRates: Record<Currency, number> = { SAR: 1, AED: 0.98, QAR: 0.97, KWD: 0.082, USD: 0.27, EUR: 0.25 };
    const rate = (sarConversionRates && sarConversionRates[currency]) ? sarConversionRates[currency] : (fallbackRates[currency] || 1);
    const converted = Math.round((priceSAR || 0) * rate);
    const symbol = currencySymbols[currency] || 'ر.س';
    return `${converted} ${symbol}`;
  };

  const handleAddClick = (service: ServiceItem) => {
    onAddToCart(service, customBrief);
    setAddedAnimationId(service.id);
    setTimeout(() => setAddedAnimationId(null), 1500);
    setSelectedService(null);
    setCustomBrief('');
  };

  return (
    <section id="services" className="py-20 px-4 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1836] border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
          <span>{t.servicesTitle}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          خدمات <span className="text-cyan-neon">التصميم والابتكار</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          {t.servicesSubtitle}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const serviceName =
            language === 'en' && service.nameEn
              ? service.nameEn
              : language === 'fr' && service.nameFr
              ? service.nameFr
              : service.name;

          const serviceDesc =
            language === 'en' && service.descriptionEn
              ? service.descriptionEn
              : language === 'fr' && service.descriptionFr
              ? service.descriptionFr
              : service.description;

          const isJustAdded = addedAnimationId === service.id;

          return (
            <div
              key={service.id}
              className={`group relative glass-cyan-card glass-cyan-hover p-6 rounded-2xl flex flex-col justify-between ${
                service.popular ? 'border-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.25)]' : ''
              }`}
            >
              {/* Popular Badge Tag */}
              {service.popular && (
                <div className="absolute -top-3 left-6 px-3.5 py-1 rounded-full btn-cyan-glow text-white font-extrabold text-[10px] uppercase tracking-wider shadow-lg">
                  الأكثر طلباً ⭐
                </div>
              )}

              {/* Service Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-[#040c1e] border border-[#00f0ff]/20 overflow-hidden flex items-center justify-center text-3xl shrink-0">
                    {service.image ? (
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{service.emoji}</span>
                    )}
                  </div>
                  <div className="text-left flex flex-col items-end">
                    <span className="text-2xl font-mono font-extrabold text-[#00f0ff]">
                      {getPrice(service.priceSAR)}
                    </span>
                    {currency !== 'SAR' && (
                      <span className="text-[10px] text-gray-400 font-mono">
                        ({service.priceSAR} ر.س)
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors">
                  {serviceName}
                </h3>

                <p className="text-gray-300 text-xs leading-relaxed mb-6 font-light">
                  {serviceDesc}
                </p>
              </div>

              {/* Delivery and Action */}
              <div className="pt-4 border-t border-[#00f0ff]/10 space-y-4">
                <div className="flex items-center gap-1.5 text-xs text-[#00f0ff]">
                  <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>
                    {t.deliveryNotice || 'مدة التنفيذ: تُحدد عند قبول الطلب'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(service)}
                    id={`add-service-${service.id}`}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
                      isJustAdded
                        ? 'bg-emerald-500 text-black shadow-lg'
                        : 'btn-cyan-glow text-white cursor-pointer'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{t.addedToCart}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>{t.addToOrder}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="p-2.5 rounded-xl bg-[#061026] border border-[#00f0ff]/20 text-gray-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 transition-all"
                    title="تخصيص الطلب أو إضافة ملاحظات"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Brief Customization Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-cyan-card rounded-2xl max-w-md w-full p-6 border-2 border-[#00f0ff] space-y-5 relative shadow-[0_0_50px_rgba(0,240,255,0.3)]">
            <div className="flex justify-between items-center border-b border-[#00f0ff]/20 pb-3">
              <h3 className="text-lg font-bold text-[#00f0ff] flex items-center gap-2">
                <span>{selectedService.emoji}</span>
                <span>{selectedService.name}</span>
              </h3>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-300">
              {selectedService.description}
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#00f0ff] block text-right">
                تفاصيل وملاحظات الطلب (اسم البراند، الألوان المفضلة، إلخ):
              </label>
              <textarea
                value={customBrief}
                onChange={(e) => setCustomBrief(e.target.value)}
                rows={3}
                placeholder="أدخل الملاحظات التي تود إطلاع المصمم عليها..."
                className="w-full bg-[#020714] border border-[#00f0ff]/30 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] text-right"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xl font-bold font-mono text-[#00f0ff]">
                {getPrice(selectedService.priceSAR)}
              </span>
              <button
                onClick={() => handleAddClick(selectedService)}
                className="px-6 py-2.5 rounded-xl btn-cyan-glow text-white font-extrabold text-xs"
              >
                {t.addToOrder}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
