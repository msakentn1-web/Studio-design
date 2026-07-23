'use client';

import React, { useState } from 'react';
import { CartItem, Language, Currency, OrderRecord } from '@/types/store';
import { translations, currencySymbols } from '@/lib/i18n';
import { ShoppingBag, X, Trash2, Plus, Minus, MessageCircle, Copy, Check, Sparkles } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  appliedCoupon: string | null;
  discountPercent: number;
  language: Language;
  currency: Currency;
  sarConversionRates: Record<Currency, number>;
  whatsappNumber: string;
  onUpdateQuantity: (serviceId: string, delta: number) => void;
  onRemoveItem: (serviceId: string) => void;
  onClearCart: () => void;
  onSaveOrder?: (order: OrderRecord) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cart,
  appliedCoupon,
  discountPercent,
  language,
  currency,
  sarConversionRates,
  whatsappNumber,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSaveOrder,
}) => {
  const t = translations[language];
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  const fallbackRates: Record<Currency, number> = { SAR: 1, AED: 0.98, QAR: 0.97, KWD: 0.082, USD: 0.27, EUR: 0.25 };
  const rate = (sarConversionRates && sarConversionRates[currency]) ? sarConversionRates[currency] : (fallbackRates[currency] || 1);

  const subtotalSAR = cart.reduce(
    (acc, item) => acc + (item.service?.priceSAR || 0) * item.quantity,
    0
  );

  const discountSAR = Math.round((subtotalSAR * (discountPercent || 0)) / 100);
  const totalSAR = subtotalSAR - discountSAR;

  const formatPrice = (sarValue: number) => {
    const converted = Math.round((sarValue || 0) * rate);
    const symbol = currencySymbols[currency] || 'ر.س';
    return `${converted} ${symbol}`;
  };

  const generateOrderSummaryText = () => {
    let text = `👑 *طلب جديد من متجر MAESTRO DESIGN*\n`;
    text += `-----------------------------------\n`;
    text += `👤 *اسم العميل:* ${clientName || 'غير محدد'}\n`;
    text += `📱 *رقم الجوال:* ${clientPhone || 'غير محدد'}\n`;
    if (projectNotes) {
      text += `📝 *تفاصيل البراند / الملاحظات:* ${projectNotes}\n`;
    }
    text += `-----------------------------------\n`;
    text += `🛒 *الخدمات المطلوبة:*\n`;

    cart.forEach((item, index) => {
      text += `${index + 1}. ${item.service.emoji} *${item.service.name}*\n`;
      text += `   - الكمية: ${item.quantity}\n`;
      text += `   - السعر: ${item.service.priceSAR * item.quantity} ر.س\n`;
      if (item.customNotes) {
        text += `   - ملاحظة: ${item.customNotes}\n`;
      }
    });

    text += `-----------------------------------\n`;
    text += `💰 *المجموع الفرعي:* ${subtotalSAR} ر.س\n`;
    if (discountPercent > 0) {
      text += `🎁 *الكوبون المطبق:* ${appliedCoupon} (${discountPercent}% خصم = -${discountSAR} ر.س)\n`;
    }
    text += `✨ *المجموع النهائي:* *${totalSAR} ر.س* (${formatPrice(totalSAR)})\n`;
    text += `-----------------------------------\n`;
    text += `شكراً لاختياركم استوديو مايسترو لتصميم الهوية البصرية.`;

    return text;
  };

  const handleConfirmWhatsapp = () => {
    if (!clientName.trim() || !clientPhone.trim()) {
      setValidationError(t.fillRequiredFields);
      return;
    }

    setValidationError('');

    if (onSaveOrder) {
      // eslint-disable-next-line react-hooks/purity
      const orderIdNumber = String(Date.now()).slice(-6);
      const newOrder: OrderRecord = {
        id: `ORD-${orderIdNumber}`,
        clientName: clientName.trim(),
        clientPhone: clientPhone.trim(),
        projectNotes: projectNotes.trim(),
        items: [...cart],
        couponApplied: appliedCoupon || undefined,
        discountPercent,
        subtotalSAR,
        totalSAR,
        createdAt: new Date().toLocaleString('ar-SA'),
        status: 'pending',
      };
      onSaveOrder(newOrder);
    }

    const cleanNum = whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(generateOrderSummaryText());
    window.open(`https://wa.me/${cleanNum}?text=${message}`, '_blank');
  };

  const handleCopyOrderText = () => {
    const summary = generateOrderSummaryText();
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-lg h-full bg-[#030712] border-r border-[#00f0ff]/30 p-6 flex flex-col justify-between overflow-y-auto relative shadow-[0_0_50px_rgba(0,240,255,0.2)]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{t.cartTitle}</span>
                <Sparkles className="w-4 h-4 text-[#00f0ff]" />
              </h2>
              <span className="text-xs text-gray-400">
                {cart.length} {cart.length === 1 ? 'خدمة مختارة' : 'خدمات مختارة'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-[#00f0ff]/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        {cart.length === 0 ? (
          <div className="my-auto text-center space-y-4 py-12">
            <div className="w-20 h-20 rounded-2xl bg-[#0a1836] border border-[#00f0ff]/30 flex items-center justify-center text-4xl mx-auto shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              🛒
            </div>
            <p className="text-gray-300 text-sm font-light">{t.cartEmpty}</p>
          </div>
        ) : (
          <div className="flex-1 my-6 space-y-3 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div
                key={item.service.id}
                className="glass-cyan-card p-4 rounded-xl border border-[#00f0ff]/20 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl p-2 rounded-xl bg-[#020714] border border-[#00f0ff]/20">
                    {item.service.emoji}
                  </div>
                  <div className="text-right">
                    <h4 className="text-xs font-bold text-white">
                      {item.service.name}
                    </h4>
                    <span className="text-xs text-[#00f0ff] font-mono font-bold">
                      {formatPrice(item.service.priceSAR * item.quantity)}
                    </span>
                    {item.customNotes && (
                      <p className="text-[10px] text-gray-400 italic line-clamp-1 mt-0.5">
                        ملاحظة: {item.customNotes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-[#020714] border border-[#00f0ff]/30 rounded-lg p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.service.id, -1)}
                      className="p-1 hover:text-[#00f0ff] text-gray-400"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 font-bold text-xs text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.service.id, 1)}
                      className="p-1 hover:text-[#00f0ff] text-gray-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.service.id)}
                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Form & Footer */}
        {cart.length > 0 && (
          <div className="border-t border-[#00f0ff]/20 pt-4 space-y-4">
            {/* Customer Information Inputs */}
            <div className="space-y-3 bg-[#061026] p-4 rounded-xl border border-[#00f0ff]/20">
              <span className="text-xs font-bold text-[#00f0ff] block text-right">
                بيانات تأكيد الطلب:
              </span>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder={t.clientName}
                className="w-full bg-[#020714] border border-[#00f0ff]/30 rounded-lg p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] text-right"
              />
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder={t.clientPhone}
                className="w-full bg-[#020714] border border-[#00f0ff]/30 rounded-lg p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] text-right font-mono"
              />
              <textarea
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                rows={2}
                placeholder={t.projectNotes}
                className="w-full bg-[#020714] border border-[#00f0ff]/30 rounded-lg p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] text-right"
              />
            </div>

            {validationError && (
              <p className="text-xs text-rose-400 font-bold text-center">
                {validationError}
              </p>
            )}

            {/* Calculations Summary */}
            <div className="space-y-2 text-xs text-gray-300 bg-[#061026] p-3 rounded-xl border border-[#00f0ff]/20">
              <div className="flex justify-between items-center">
                <span>{t.subtotal}</span>
                <span className="font-mono">{formatPrice(subtotalSAR)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between items-center text-emerald-400 font-bold">
                  <span>
                    {t.discount} ({appliedCoupon} - {discountPercent}%)
                  </span>
                  <span className="font-mono">-{formatPrice(discountSAR)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm font-bold text-[#00f0ff] pt-2 border-t border-[#00f0ff]/20 font-mono">
                <span>{t.total}</span>
                <span>{formatPrice(totalSAR)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleConfirmWhatsapp}
                id="confirm-whatsapp-order-btn"
                className="w-full py-3.5 rounded-xl btn-cyan-glow text-white font-extrabold text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t.confirmOrderWhatsapp}</span>
              </button>

              <button
                onClick={handleCopyOrderText}
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>تم نسخ تفاصيل الفاتورة!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>نسخ نص الطلب كرسالة</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
