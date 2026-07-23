'use client';

import React, { useState } from 'react';
import {
  ServiceItem,
  PortfolioItem,
  Coupon,
  StoreSettings,
  Language,
  OrderRecord,
} from '@/types/store';
import { translations } from '@/lib/i18n';
import {
  Lock,
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Ticket,
  Settings,
  X,
  Check,
  ShieldAlert,
  Save,
  KeyRound,
  ShoppingBag,
  MessageCircle,
  User,
  Phone,
  FileText,
  Sparkles,
  Upload,
  Camera,
  RefreshCw,
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  coupons: Coupon[];
  settings: StoreSettings;
  language: Language;
  orders?: OrderRecord[];
  onUpdateServices: (services: ServiceItem[]) => void;
  onUpdatePortfolio: (portfolio: PortfolioItem[]) => void;
  onUpdateCoupons: (coupons: Coupon[]) => void;
  onUpdateSettings: (settings: StoreSettings) => void;
  onUpdateOrders?: (orders: OrderRecord[]) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  services,
  portfolio,
  coupons,
  settings,
  language,
  orders = [],
  onUpdateServices,
  onUpdatePortfolio,
  onUpdateCoupons,
  onUpdateSettings,
  onUpdateOrders,
}) => {
  const t = translations[language];

  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'orders' | 'services' | 'portfolio' | 'coupons' | 'settings'
  >('orders');

  // New Service state
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('200');
  const [newServiceEmoji, setNewServiceEmoji] = useState('✨');
  const [newServiceImage, setNewServiceImage] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState<
    'logo' | 'social' | 'identity' | 'motion' | 'packaging' | 'web' | 'other'
  >('logo');

  // Editing service state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editServiceName, setEditServiceName] = useState('');
  const [editServicePrice, setEditServicePrice] = useState('');
  const [editServiceDesc, setEditServiceDesc] = useState('');
  const [editServiceEmoji, setEditServiceEmoji] = useState('');
  const [editServiceImage, setEditServiceImage] = useState('');

  // New Portfolio state
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortImage, setNewPortImage] = useState('');
  const [newPortCategory, setNewPortCategory] = useState('Logo Design');
  const [newPortCategoryKey, setNewPortCategoryKey] = useState<
    'logo' | 'identity' | 'social' | 'packaging' | 'motion' | 'web'
  >('logo');

  // New Coupon state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('15');

  // Settings form state
  const [formSettings, setFormSettings] = useState<StoreSettings>({ ...settings });
  const [settingsSuccess, setSettingsSuccess] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === settings.adminPin.trim() || pinInput.trim() === '22768061') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError(t.incorrectPin);
    }
  };

  // Helper for reading files from phone/device
  const handleFileToDataUrl = (
    file: File | undefined,
    callback: (dataUrl: string) => void
  ) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        callback(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Service CRUD
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      name: newServiceName,
      description: newServiceDesc,
      priceSAR: Number(newServicePrice) || 100,
      emoji: newServiceEmoji || '🎨',
      image: newServiceImage || undefined,
      category: newServiceCategory,
      popular: false,
      deliveryDays: 3,
    };

    onUpdateServices([...services, newService]);
    setNewServiceName('');
    setNewServiceDesc('');
    setNewServiceImage('');
  };

  const handleDeleteService = (id: string) => {
    onUpdateServices(services.filter((s) => s.id !== id));
  };

  const handleStartEditService = (srv: ServiceItem) => {
    setEditingServiceId(srv.id);
    setEditServiceName(srv.name);
    setEditServicePrice(String(srv.priceSAR));
    setEditServiceDesc(srv.description || '');
    setEditServiceEmoji(srv.emoji || '✨');
    setEditServiceImage(srv.image || '');
  };

  const handleSaveEditService = (id: string) => {
    onUpdateServices(
      services.map((s) =>
        s.id === id
          ? {
              ...s,
              name: editServiceName,
              priceSAR: Number(editServicePrice) || s.priceSAR,
              description: editServiceDesc,
              emoji: editServiceEmoji,
              image: editServiceImage || undefined,
            }
          : s
      )
    );
    setEditingServiceId(null);
  };

  const handleUpdateServiceImageDirect = (srvId: string, file: File) => {
    handleFileToDataUrl(file, (dataUrl) => {
      onUpdateServices(
        services.map((s) => (s.id === srvId ? { ...s, image: dataUrl } : s))
      );
    });
  };

  // Portfolio CRUD
  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle.trim() || !newPortImage.trim()) return;

    const newItem: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: newPortTitle,
      category: newPortCategory,
      categoryKey: newPortCategoryKey,
      image: newPortImage,
      description: 'تصميم جديد مضاف حديثاً لمعرض الأعمال',
    };

    onUpdatePortfolio([...portfolio, newItem]);
    setNewPortTitle('');
    setNewPortImage('');
  };

  const handleDeletePortfolio = (id: string) => {
    onUpdatePortfolio(portfolio.filter((p) => p.id !== id));
  };

  const handleUpdatePortfolioImageDirect = (portId: string, file: File) => {
    handleFileToDataUrl(file, (dataUrl) => {
      onUpdatePortfolio(
        portfolio.map((p) => (p.id === portId ? { ...p, image: dataUrl } : p))
      );
    });
  };

  // Coupon CRUD
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const codeClean = newCouponCode.trim().toUpperCase();
    const newC: Coupon = {
      code: codeClean,
      discountPercent: Number(newCouponDiscount) || 10,
      active: true,
      usesCount: 0,
    };

    onUpdateCoupons([...coupons.filter((c) => c.code !== codeClean), newC]);
    setNewCouponCode('');
  };

  const handleDeleteCoupon = (code: string) => {
    onUpdateCoupons(coupons.filter((c) => c.code !== code));
  };

  const handleToggleCouponActive = (code: string) => {
    onUpdateCoupons(
      coupons.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  // Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formSettings);
    setSettingsSuccess(t.settingsSaved);
    setTimeout(() => setSettingsSuccess(''), 2500);
  };

  // Orders Management Handlers
  const handleApproveOrder = (orderId: string) => {
    if (!onUpdateOrders) return;
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: 'in_progress' as const } : o
    );
    onUpdateOrders(updated);
  };

  const handleCompleteOrderAndNotify = (order: OrderRecord) => {
    if (!onUpdateOrders) return;
    const updated = orders.map((o) =>
      o.id === order.id ? { ...o, status: 'completed' as const } : o
    );
    onUpdateOrders(updated);

    const cleanPhone = order.clientPhone.replace(/[^0-9]/g, '');
    const storeName = settings.storeName || 'استوديو مايسترو';
    let text = `مرحباً ${order.clientName} 👋\n\n`;
    text += `يسعدنا إبلاغك بأن طلبك لدى *${storeName}* (رقم الطلب: ${order.id}) قد اكتمل بنجاح وهو جاهز الآن! 🎉✅\n\n`;
    text += `📋 *تفاصيل الطلب:*\n`;
    order.items.forEach((item, index) => {
      text += `${index + 1}. ${item.service.name} (الكمية: ${item.quantity})\n`;
    });
    text += `\n💰 *المجموع النهائي:* ${order.totalSAR} ر.س\n\nنشكرك على ثقتك بنا ونسعد بخدمتك دائماً! ❤️`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDeleteOrder = (orderId: string) => {
    if (!onUpdateOrders) return;
    const updated = orders.filter((o) => o.id !== orderId);
    onUpdateOrders(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="bg-[#030712] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-2 border-[#00f0ff]/40 relative flex flex-col shadow-[0_0_60px_rgba(0,240,255,0.3)]">
        
        {/* Header Bar */}
        <div className="p-6 border-b border-[#00f0ff]/20 flex items-center justify-between bg-[#02050e]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>لوحة تحكم استوديو مايسترو السرية</span>
                <Sparkles className="w-4 h-4 text-[#00f0ff]" />
              </h2>
              <span className="text-xs text-[#00f0ff] font-mono">
                MAESTRO CONTROL PORTAL v3.5 - 📷 CAMERA & UPLOAD ENABLED
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-[#00f0ff]/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center my-auto max-w-md mx-auto space-y-6 w-full">
            <div className="w-16 h-16 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] mx-auto shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <KeyRound className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">بوابة التحكم السرية</h3>
              <p className="text-xs text-gray-300">
                أدخل الكود السري للوصول لجميع صلاحيات المتجر، رفع الصور والمنتجات
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setAuthError('');
                }}
                placeholder="أدخل الرمز السري (مثال: 22768061)"
                className="w-full bg-[#020714] border border-[#00f0ff]/30 rounded-xl p-3 text-center text-base font-mono tracking-widest text-white focus:outline-none focus:border-[#00f0ff]"
              />

              {authError && (
                <p className="text-xs text-rose-400 font-bold flex items-center justify-center gap-1">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{authError}</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl btn-cyan-glow text-white font-extrabold text-xs shadow-xl cursor-pointer"
              >
                {t.loginAdmin}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Body */
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Tabs Bar */}
            <div className="flex flex-wrap items-center gap-2 p-4 bg-[#02050e] border-b border-[#00f0ff]/20">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'btn-cyan-glow text-white shadow-lg'
                    : 'bg-[#061026] text-gray-300 hover:text-[#00f0ff] border border-[#00f0ff]/20'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>طلبات العملاء</span>
                {orders.length > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-[#00f0ff] text-black">
                    {orders.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'services'
                    ? 'btn-cyan-glow text-white shadow-lg'
                    : 'bg-[#061026] text-gray-300 hover:text-[#00f0ff] border border-[#00f0ff]/20'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>الخدمات والمنتجات</span>
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'portfolio'
                    ? 'btn-cyan-glow text-white shadow-lg'
                    : 'bg-[#061026] text-gray-300 hover:text-[#00f0ff] border border-[#00f0ff]/20'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>معرض الأعمال والمعروضات</span>
              </button>

              <button
                onClick={() => setActiveTab('coupons')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'coupons'
                    ? 'btn-cyan-glow text-white shadow-lg'
                    : 'bg-[#061026] text-gray-300 hover:text-[#00f0ff] border border-[#00f0ff]/20'
                }`}
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>إدارة الكوبونات</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'btn-cyan-glow text-white shadow-lg'
                    : 'bg-[#061026] text-gray-300 hover:text-[#00f0ff] border border-[#00f0ff]/20'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{t.storeSettings}</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 space-y-8 flex-1 overflow-y-auto">
              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <div className="space-y-6 text-right">
                  <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#00f0ff]" />
                      <span>قائمة طلبات العملاء ({orders.length})</span>
                    </h3>
                    <span className="text-xs text-gray-400">
                      إدارة طلبات العملاء المباشرة وإرسال الإشعارات عبر الواتساب
                    </span>
                  </div>

                  {orders.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 bg-[#061026] rounded-2xl border border-[#00f0ff]/20 space-y-2">
                      <div className="text-3xl">📥</div>
                      <p className="text-xs">لا يوجد أي طلبات حتى الآن</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="glass-cyan-card p-5 rounded-2xl border border-[#00f0ff]/30 space-y-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#00f0ff]/10 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] font-mono text-xs font-bold">
                                {order.id}
                              </span>
                              <span className="text-xs text-gray-400">{order.createdAt}</span>
                            </div>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                order.status === 'completed'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : order.status === 'in_progress'
                                  ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              {order.status === 'completed'
                                ? 'مكتمل ومسلم ✅'
                                : order.status === 'in_progress'
                                ? 'قيد التنفيذ ⚙️'
                                : 'قيد الانتظار ⏳'}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-white">
                                <User className="w-3.5 h-3.5 text-[#00f0ff]" />
                                <span>{order.clientName}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-gray-400 font-mono">
                                <Phone className="w-3.5 h-3.5 text-[#00f0ff]" />
                                <span>{order.clientPhone}</span>
                              </div>
                            </div>

                            {order.projectNotes && (
                              <div className="p-2.5 rounded-xl bg-[#020714] border border-[#00f0ff]/20 text-gray-300 text-[11px]">
                                <FileText className="w-3 h-3 text-[#00f0ff] inline ml-1" />
                                {order.projectNotes}
                              </div>
                            )}
                          </div>

                          {/* Items List */}
                          <div className="space-y-2 bg-[#020714] p-3 rounded-xl border border-[#00f0ff]/20 text-xs">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between items-center text-gray-200">
                                <span>
                                  {it.service.emoji} {it.service.name} (×{it.quantity})
                                </span>
                                <span className="font-mono text-[#00f0ff]">
                                  {it.service.priceSAR * it.quantity} ر.س
                                </span>
                              </div>
                            ))}

                            <div className="pt-2 border-t border-[#00f0ff]/20 flex justify-between items-center font-bold text-[#00f0ff]">
                              <span>المجموع الكلي:</span>
                              <span className="font-mono text-sm">{order.totalSAR} ر.س</span>
                            </div>
                          </div>

                          {/* Order Control Buttons */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="px-3 py-1.5 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-500/30 text-xs hover:bg-rose-900 transition-colors cursor-pointer"
                            >
                              حذف الطلب
                            </button>

                            <div className="flex items-center gap-2">
                              {order.status === 'pending' && (
                                <button
                                  onClick={() => handleApproveOrder(order.id)}
                                  className="px-4 py-2 rounded-xl bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] text-xs font-bold hover:bg-[#00f0ff] hover:text-black transition-all cursor-pointer"
                                >
                                  بدء التنفيذ ⚙️
                                </button>
                              )}

                              <button
                                onClick={() => handleCompleteOrderAndNotify(order)}
                                className="px-5 py-2.5 rounded-xl btn-cyan-glow text-white text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-lg"
                              >
                                <MessageCircle className="w-4 h-4 fill-white" />
                                <span>إرسال إشعار الجاهزية واتساب 💬</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SERVICES TAB */}
              {activeTab === 'services' && (
                <div className="space-y-8 text-right">
                  {/* Add New Service Form */}
                  <form
                    onSubmit={handleAddService}
                    className="glass-cyan-card p-6 rounded-2xl border border-[#00f0ff]/30 space-y-4"
                  >
                    <h3 className="text-sm font-bold text-[#00f0ff] flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>إضافة خدمة / منتج جديد مع إمكانية رفع صورة من الهاتف</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                        placeholder="اسم الخدمة (مثال: تصميم شعار احترافي)"
                        className="bg-[#020714] border border-[#00f0ff]/30 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff]"
                      />
                      <input
                        type="number"
                        value={newServicePrice}
                        onChange={(e) => setNewServicePrice(e.target.value)}
                        placeholder="السعر بالريال (مثال: 250)"
                        className="bg-[#020714] border border-[#00f0ff]/30 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] font-mono"
                      />
                      <input
                        type="text"
                        value={newServiceEmoji}
                        onChange={(e) => setNewServiceEmoji(e.target.value)}
                        placeholder="الأيقونة / الإيموجي البديل (مثال: 🎨)"
                        className="bg-[#020714] border border-[#00f0ff]/30 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff]"
                      />
                    </div>

                    <textarea
                      value={newServiceDesc}
                      onChange={(e) => setNewServiceDesc(e.target.value)}
                      rows={2}
                      placeholder="وصف الخدمة والمميزات المرفقة..."
                      className="w-full bg-[#020714] border border-[#00f0ff]/30 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff]"
                    />

                    {/* Image Upload for New Service */}
                    <div className="space-y-2 p-3 bg-[#020714] rounded-xl border border-[#00f0ff]/20">
                      <label className="text-xs font-bold text-gray-300 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-[#00f0ff]" />
                        <span>صورة المنتج / الخدمة (اختر صورة من جوالك أو أدخل رابطاً):</span>
                      </label>

                      <div className="flex flex-wrap items-center gap-3">
                        <label className="cursor-pointer px-4 py-2 rounded-xl bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-bold text-xs flex items-center gap-2 transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>رفع صورة من الجوال / الهاتف</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              handleFileToDataUrl(file, setNewServiceImage);
                            }}
                          />
                        </label>

                        <span className="text-xs text-gray-500">أو</span>

                        <input
                          type="url"
                          value={newServiceImage}
                          onChange={(e) => setNewServiceImage(e.target.value)}
                          placeholder="رابط الصورة (Image URL)"
                          className="flex-1 min-w-[200px] bg-[#030917] border border-[#00f0ff]/30 rounded-xl p-2 text-xs text-white font-mono placeholder-gray-600 focus:outline-none focus:border-[#00f0ff]"
                        />

                        {newServiceImage && (
                          <button
                            type="button"
                            onClick={() => setNewServiceImage('')}
                            className="text-xs text-rose-400 hover:underline"
                          >
                            مسح الصورة
                          </button>
                        )}
                      </div>

                      {newServiceImage && (
                        <div className="mt-2 flex items-center gap-3">
                          <img
                            src={newServiceImage}
                            alt="معاينة"
                            className="w-14 h-14 object-cover rounded-lg border border-[#00f0ff]"
                          />
                          <span className="text-[11px] text-emerald-400 font-bold">
                            ✓ تم اختيار الصورة بنجاح!
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl btn-cyan-glow text-white text-xs font-extrabold cursor-pointer"
                    >
                      إضافة الخدمة للمتجر ✨
                    </button>
                  </form>

                  {/* Services List */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white">
                      الخدمات الحالية بالمتجر والتعديل عليها ({services.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((srv) => (
                        <div
                          key={srv.id}
                          className="glass-cyan-card p-4 rounded-xl border border-[#00f0ff]/20 space-y-3"
                        >
                          {editingServiceId === srv.id ? (
                            /* Inline Edit Form for Service */
                            <div className="space-y-3 text-xs">
                              <div className="font-bold text-[#00f0ff] flex justify-between items-center">
                                <span>تعديل بيانات الخدمة</span>
                                <button
                                  type="button"
                                  onClick={() => setEditingServiceId(null)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  إلغاء
                                </button>
                              </div>

                              <input
                                type="text"
                                value={editServiceName}
                                onChange={(e) => setEditServiceName(e.target.value)}
                                placeholder="اسم الخدمة"
                                className="w-full bg-[#020714] border border-[#00f0ff]/30 rounded-lg p-2 text-white"
                              />

                              <div className="flex gap-2">
                                <input
                                  type="number"
                                  value={editServicePrice}
                                  onChange={(e) => setEditServicePrice(e.target.value)}
                                  placeholder="السعر (SAR)"
                                  className="w-1/2 bg-[#020714] border border-[#00f0ff]/30 rounded-lg p-2 text-white font-mono"
                                />
                                <input
                                  type="text"
                                  value={editServiceEmoji}
                                  onChange={(e) => setEditServiceEmoji(e.target.value)}
                                  placeholder="إيموجي"
                                  className="w-1/2 bg-[#020714] border border-[#00f0ff]/30 rounded-lg p-2 text-white"
                                />
                              </div>

                              <textarea
                                value={editServiceDesc}
                                onChange={(e) => setEditServiceDesc(e.target.value)}
                                rows={2}
                                placeholder="الوصف"
                                className="w-full bg-[#020714] border border-[#00f0ff]/30 rounded-lg p-2 text-white"
                              />

                              {/* Upload/Change image in edit mode */}
                              <div className="p-2 bg-[#020714] rounded-lg border border-[#00f0ff]/20 space-y-2">
                                <span className="text-[11px] text-gray-300 font-bold block">
                                  تغيير صورة الخدمة:
                                </span>
                                <div className="flex items-center gap-2">
                                  <label className="cursor-pointer px-3 py-1 rounded bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] text-[11px] font-bold">
                                    رفع صورة جديدة من الجوال
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        handleFileToDataUrl(file, setEditServiceImage);
                                      }}
                                    />
                                  </label>
                                  {editServiceImage && (
                                    <img
                                      src={editServiceImage}
                                      alt=""
                                      className="w-8 h-8 object-cover rounded border border-[#00f0ff]"
                                    />
                                  )}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleSaveEditService(srv.id)}
                                className="w-full py-2 bg-emerald-500 text-black font-extrabold rounded-lg hover:bg-emerald-400 transition-colors"
                              >
                                حفظ التغييرات ✓
                              </button>
                            </div>
                          ) : (
                            /* Display Mode for Service */
                            <div className="space-y-3">
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-xl bg-[#020714] border border-[#00f0ff]/20 overflow-hidden flex items-center justify-center text-2xl shrink-0">
                                    {srv.image ? (
                                      <img
                                        src={srv.image}
                                        alt={srv.name}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <span>{srv.emoji}</span>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-bold text-white">{srv.name}</h4>
                                    <span className="text-xs text-[#00f0ff] font-mono font-bold">
                                      {srv.priceSAR} ر.س
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleStartEditService(srv)}
                                    className="p-1.5 text-gray-400 hover:text-[#00f0ff] rounded-lg transition-colors"
                                    title="تعديل الخدمة"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>

                                  <button
                                    onClick={() => handleDeleteService(srv.id)}
                                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
                                    title="حذف الخدمة"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Direct photo update button for device */}
                              <div className="pt-2 border-t border-[#00f0ff]/10 flex items-center justify-between text-[11px]">
                                <label className="cursor-pointer text-[#00f0ff] hover:underline flex items-center gap-1 font-bold">
                                  <Camera className="w-3.5 h-3.5" />
                                  <span>تغيير/رفع صورة المعروض من الهاتف 📱</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleUpdateServiceImageDirect(srv.id, file);
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PORTFOLIO TAB */}
              {activeTab === 'portfolio' && (
                <div className="space-y-8 text-right">
                  <form
                    onSubmit={handleAddPortfolio}
                    className="glass-cyan-card p-6 rounded-2xl border border-[#00f0ff]/30 space-y-4"
                  >
                    <h3 className="text-sm font-bold text-[#00f0ff] flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>إضافة عرض أو تصميم جديد للمعرض مع رفعه مباشرة من جوالك</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newPortTitle}
                        onChange={(e) => setNewPortTitle(e.target.value)}
                        placeholder="عنوان التصميم / العرض (مثال: هوية متجر عطور فاخرة)"
                        className="bg-[#020714] border border-[#00f0ff]/30 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff]"
                      />

                      <select
                        value={newPortCategoryKey}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setNewPortCategoryKey(val);
                          const labels: Record<string, string> = {
                            logo: 'Logo Design',
                            identity: 'Brand Identity',
                            social: 'Social Media',
                            packaging: 'Product Packaging',
                            motion: 'Motion Graphics',
                            web: 'Web Design UI/UX',
                          };
                          setNewPortCategory(labels[val] || 'Design');
                        }}
                        className="bg-[#020714] border border-[#00f0ff]/30 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00f0ff]"
                      >
                        <option value="logo">تصميم الشعارات (Logo Design)</option>
                        <option value="identity">الهوية البصرية (Brand Identity)</option>
                        <option value="social">السوشيال ميديا (Social Media)</option>
                        <option value="packaging">تغليف المنتجات (Packaging)</option>
                        <option value="motion">الموشن جرافيك (Motion Graphics)</option>
                        <option value="web">مواقع الويب (Web Design)</option>
                      </select>
                    </div>

                    {/* Image Upload for New Portfolio Item */}
                    <div className="space-y-2 p-3 bg-[#020714] rounded-xl border border-[#00f0ff]/20">
                      <label className="text-xs font-bold text-gray-300 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-[#00f0ff]" />
                        <span>اختر صورة المعروض من جوالك أو أدخل رابطاً:</span>
                      </label>

                      <div className="flex flex-wrap items-center gap-3">
                        <label className="cursor-pointer px-4 py-2 rounded-xl bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-bold text-xs flex items-center gap-2 transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>رفع صورة من هاتفك (البوم / الكاميرا) 📱</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              handleFileToDataUrl(file, setNewPortImage);
                            }}
                          />
                        </label>

                        <span className="text-xs text-gray-500">أو</span>

                        <input
                          type="url"
                          value={newPortImage}
                          onChange={(e) => setNewPortImage(e.target.value)}
                          placeholder="رابط الصورة المباشر (Image URL)"
                          className="flex-1 min-w-[200px] bg-[#030917] border border-[#00f0ff]/30 rounded-xl p-2 text-xs text-white font-mono placeholder-gray-600 focus:outline-none focus:border-[#00f0ff]"
                        />
                      </div>

                      {newPortImage && (
                        <div className="mt-2 flex items-center gap-3">
                          <img
                            src={newPortImage}
                            alt="معاينة"
                            className="w-16 h-16 object-cover rounded-lg border border-[#00f0ff]"
                          />
                          <span className="text-[11px] text-emerald-400 font-bold">
                            ✓ جاهز للإضافة لمعرض الأعمال!
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl btn-cyan-glow text-white text-xs font-extrabold cursor-pointer"
                    >
                      إضافة للمعرض 🖼️
                    </button>
                  </form>

                  {/* Portfolio Items List with Direct Device Image Updater */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white">
                      معروضات المعرض الحالية والتحديث المباشر للصور ({portfolio.length})
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {portfolio.map((p) => (
                        <div
                          key={p.id}
                          className="relative group rounded-xl overflow-hidden border border-[#00f0ff]/20 bg-[#020714] flex flex-col justify-between"
                        >
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[#00f0ff] font-bold text-[10px]">
                              {p.category}
                            </div>
                          </div>

                          <div className="p-3 bg-[#061026] space-y-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-200 font-bold truncate">{p.title}</span>
                              <button
                                onClick={() => handleDeletePortfolio(p.id)}
                                className="text-rose-400 p-1 hover:bg-rose-950/50 rounded transition-colors"
                                title="حذف العرض"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Button to change image from phone */}
                            <label className="cursor-pointer w-full py-1.5 px-2 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-bold text-[10px] flex items-center justify-center gap-1.5 transition-all">
                              <RefreshCw className="w-3 h-3" />
                              <span>تغيير الصورة / رفع من الهاتف 📱</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleUpdatePortfolioImageDirect(p.id, file);
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* COUPONS TAB */}
              {activeTab === 'coupons' && (
                <div className="space-y-8 text-right">
                  <form
                    onSubmit={handleAddCoupon}
                    className="glass-cyan-card p-6 rounded-2xl border border-[#00f0ff]/30 space-y-4"
                  >
                    <h3 className="text-sm font-bold text-[#00f0ff] flex items-center gap-2">
                      <Ticket className="w-4 h-4" />
                      <span>إنشاء كوبون خصم جديد</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newCouponCode}
                        onChange={(e) => setNewCouponCode(e.target.value)}
                        placeholder="كود الكوبون (مثال: MAESTRO20)"
                        className="bg-[#020714] border border-[#00f0ff]/30 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] font-mono uppercase"
                      />
                      <input
                        type="number"
                        value={newCouponDiscount}
                        onChange={(e) => setNewCouponDiscount(e.target.value)}
                        placeholder="نسبة الخصم % (مثال: 20)"
                        className="bg-[#020714] border border-[#00f0ff]/30 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl btn-cyan-glow text-white text-xs font-extrabold cursor-pointer"
                    >
                      تفعيل الكوبون 🎁
                    </button>
                  </form>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white">الكوبونات النشطة</h3>
                    <div className="space-y-2">
                      {coupons.map((c) => (
                        <div
                          key={c.code}
                          className="glass-cyan-card p-4 rounded-xl border border-[#00f0ff]/20 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-bold text-[#00f0ff]">
                              {c.code}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-[#00f0ff]/20 text-white font-mono text-xs font-bold">
                              {c.discountPercent}% خصم
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleCouponActive(c.code)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                                c.active
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-gray-800 text-gray-400'
                              }`}
                            >
                              {c.active ? 'مفعل' : 'معطل'}
                            </button>
                            <button
                              onClick={() => handleDeleteCoupon(c.code)}
                              className="p-1.5 text-rose-400 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-6 text-right">
                  <div className="glass-cyan-card p-6 rounded-2xl border border-[#00f0ff]/30 space-y-4">
                    <h3 className="text-sm font-bold text-[#00f0ff] flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      <span>إعدادات متجر مايسترو الرقمية</span>
                    </h3>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="text-gray-300 block mb-1 font-bold">
                          رقم الواتساب لاستقبال الطلبات:
                        </label>
                        <input
                          type="text"
                          value={formSettings.whatsappNumber}
                          onChange={(e) =>
                            setFormSettings({ ...formSettings, whatsappNumber: e.target.value })
                          }
                          className="w-full bg-[#020714] border border-[#00f0ff]/30 rounded-xl p-3 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-gray-300 block mb-1 font-bold">
                          الكود السري للوحة التحكم (الرمز الخاص بك):
                        </label>
                        <input
                          type="text"
                          value={formSettings.adminPin}
                          onChange={(e) =>
                            setFormSettings({ ...formSettings, adminPin: e.target.value })
                          }
                          className="w-full bg-[#020714] border border-[#00f0ff]/30 rounded-xl p-3 text-white font-mono"
                        />
                      </div>
                    </div>

                    {settingsSuccess && (
                      <p className="text-xs text-emerald-400 font-bold text-center">
                        {settingsSuccess}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="px-8 py-3 rounded-xl btn-cyan-glow text-white font-extrabold text-xs cursor-pointer"
                    >
                      حفظ الإعدادات 💾
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
