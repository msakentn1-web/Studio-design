export type Language = 'ar' | 'en' | 'fr';

export type Currency = 'SAR' | 'AED' | 'QAR' | 'KWD' | 'USD' | 'EUR';

export interface ServiceItem {
  id: string;
  name: string;
  nameEn?: string;
  nameFr?: string;
  description: string;
  descriptionEn?: string;
  descriptionFr?: string;
  priceSAR: number;
  emoji: string;
  image?: string;
  category: 'logo' | 'social' | 'identity' | 'motion' | 'packaging' | 'web' | 'other';
  popular?: boolean;
  deliveryDays?: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  titleEn?: string;
  titleFr?: string;
  category: string;
  categoryKey: 'logo' | 'identity' | 'social' | 'packaging' | 'motion' | 'web';
  image: string;
  description?: string;
  tags?: string[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  active: boolean;
  usesCount?: number;
}

export interface CartItem {
  service: ServiceItem;
  quantity: number;
  customBrandName?: string;
  customNotes?: string;
}

export interface StoreSettings {
  whatsappNumber: string;
  adminPin: string;
  storeName: string;
  snapchatHandle: string;
  toptopKsaHandle: string;
  bankIban: string;
  bankAccountName: string;
  bankName: string;
  sarConversionRates: Record<Currency, number>;
}

export interface OrderRecord {
  id: string;
  clientName: string;
  clientPhone: string;
  projectNotes: string;
  items: CartItem[];
  couponApplied?: string;
  discountPercent: number;
  subtotalSAR: number;
  totalSAR: number;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}
