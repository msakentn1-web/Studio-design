'use client';

import React, { useState, useEffect } from 'react';
import {
  Language,
  Currency,
  ServiceItem,
  PortfolioItem,
  Coupon,
  StoreSettings,
  CartItem,
  OrderRecord,
} from '@/types/store';
import {
  INITIAL_SERVICES,
  INITIAL_PORTFOLIO,
  INITIAL_COUPONS,
  INITIAL_SETTINGS,
} from '@/lib/initial-data';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { CouponPortal } from '@/components/CouponPortal';
import { PaymentMethods } from '@/components/PaymentMethods';
import { ContactSection } from '@/components/ContactSection';
import { CartModal } from '@/components/CartModal';
import { AdminModal } from '@/components/AdminModal';
import { Footer } from '@/components/Footer';

function getStoredValue<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (err) {
    return defaultValue;
  }
}

function getStoredString(key: string, defaultValue: string): string {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item || defaultValue;
  } catch (err) {
    return defaultValue;
  }
}

export default function Home() {
  const [language, setLanguage] = useState<Language>('ar');
  const [currency, setCurrency] = useState<Currency>('SAR');
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const isInitialMount = React.useRef(true);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      const l = getStoredString('maestro_lang', 'ar') as Language;
      if (l) setLanguage(l);
      const c = getStoredString('maestro_curr', 'SAR') as Currency;
      if (c && ['SAR', 'AED', 'QAR', 'KWD', 'USD', 'EUR'].includes(c)) {
        setCurrency(c);
      } else {
        setCurrency('SAR');
        localStorage.setItem('maestro_curr', 'SAR');
      }
      const s = getStoredValue<ServiceItem[]>('maestro_services', INITIAL_SERVICES);
      if (s && s.length) setServices(s);
      const p = getStoredValue<PortfolioItem[]>('maestro_portfolio', INITIAL_PORTFOLIO);
      if (p && p.length) setPortfolio(p);
      const cp = getStoredValue<Coupon[]>('maestro_coupons', INITIAL_COUPONS);
      if (cp && cp.length) setCoupons(cp);
      const st = getStoredValue<StoreSettings>('maestro_settings', INITIAL_SETTINGS);
      if (st) {
        setSettings({
          ...INITIAL_SETTINGS,
          ...st,
          sarConversionRates: {
            SAR: st.sarConversionRates?.SAR || 1,
            AED: st.sarConversionRates?.AED || 0.98,
            QAR: st.sarConversionRates?.QAR || 0.97,
            KWD: st.sarConversionRates?.KWD || 0.082,
            USD: st.sarConversionRates?.USD || 0.27,
            EUR: st.sarConversionRates?.EUR || 0.25,
          },
        });
      }
      const cr = getStoredValue<CartItem[]>('maestro_cart', []);
      if (cr) setCart(cr);
      const ord = getStoredValue<OrderRecord[]>('maestro_orders', []);
      if (ord) setOrders(ord);
      const ac = getStoredString('maestro_applied_coupon', '');
      if (ac) setAppliedCoupon(ac);
      const dp = Number(getStoredString('maestro_discount_percent', '0')) || 0;
      if (dp) setDiscountPercent(dp);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (typeof window === 'undefined') return;
    localStorage.setItem('maestro_lang', language);
    localStorage.setItem('maestro_curr', currency);
    localStorage.setItem('maestro_services', JSON.stringify(services));
    localStorage.setItem('maestro_portfolio', JSON.stringify(portfolio));
    localStorage.setItem('maestro_coupons', JSON.stringify(coupons));
    localStorage.setItem('maestro_settings', JSON.stringify(settings));
    localStorage.setItem('maestro_cart', JSON.stringify(cart));
    localStorage.setItem('maestro_orders', JSON.stringify(orders));

    if (appliedCoupon) {
      localStorage.setItem('maestro_applied_coupon', appliedCoupon);
      localStorage.setItem('maestro_discount_percent', String(discountPercent));
    } else {
      localStorage.removeItem('maestro_applied_coupon');
      localStorage.removeItem('maestro_discount_percent');
    }
  }, [
    language,
    currency,
    services,
    portfolio,
    coupons,
    settings,
    cart,
    orders,
    appliedCoupon,
    discountPercent,
  ]);

  // Document language & dir
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Cart actions
  const handleAddToCart = (service: ServiceItem, customNotes?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.service.id === service.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
          customNotes: customNotes || updated[existingIndex].customNotes,
        };
        return updated;
      }
      return [...prev, { service, quantity: 1, customNotes }];
    });
  };

  const handleUpdateQuantity = (serviceId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.service.id === serviceId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (serviceId: string) => {
    setCart((prev) => prev.filter((item) => item.service.id !== serviceId));
  };

  const handleApplyCoupon = (code: string, percent: number) => {
    setAppliedCoupon(code);
    setDiscountPercent(percent);
  };

  const handleOrderSimilarFromPortfolio = (portfolioItem: PortfolioItem) => {
    const matchedService =
      services.find((s) => s.category === portfolioItem.categoryKey) || services[0];
    if (matchedService) {
      handleAddToCart(
        matchedService,
        `طلب تصميم مشابه لنموذج: ${portfolioItem.title}`
      );
      setIsCartOpen(true);
    }
  };

  const cartTotalItemsCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#080808] text-[#E4E4E4] selection:bg-amber-500 selection:text-black">
      {/* Navigation Header */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cartTotalItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        storeName={settings.storeName}
      />

      {/* Main Content Sections */}
      <main className="space-y-12">
        <HeroSection
          language={language}
          whatsappNumber={settings.whatsappNumber}
          onBrowseClick={() => {
            const servicesEl = document.getElementById('services');
            if (servicesEl) servicesEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <ServicesSection
          services={services}
          language={language}
          currency={currency}
          sarConversionRates={settings.sarConversionRates}
          onAddToCart={handleAddToCart}
        />

        <PortfolioSection
          portfolio={portfolio}
          language={language}
          onOrderSimilar={handleOrderSimilarFromPortfolio}
        />

        <CouponPortal
          coupons={coupons}
          appliedCoupon={appliedCoupon}
          discountPercent={discountPercent}
          language={language}
          onApplyCoupon={handleApplyCoupon}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        <PaymentMethods settings={settings} language={language} />

        <ContactSection settings={settings} language={language} />
      </main>

      {/* Footer */}
      <Footer language={language} storeName={settings.storeName} />

      {/* Modals & Drawers */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        appliedCoupon={appliedCoupon}
        discountPercent={discountPercent}
        language={language}
        currency={currency}
        sarConversionRates={settings.sarConversionRates}
        whatsappNumber={settings.whatsappNumber}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        onSaveOrder={(newOrder) => setOrders((prev) => [newOrder, ...prev])}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        services={services}
        portfolio={portfolio}
        coupons={coupons}
        settings={settings}
        language={language}
        orders={orders}
        onUpdateServices={setServices}
        onUpdatePortfolio={setPortfolio}
        onUpdateCoupons={setCoupons}
        onUpdateSettings={setSettings}
        onUpdateOrders={setOrders}
      />
    </div>
  );
}
