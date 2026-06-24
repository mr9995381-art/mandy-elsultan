import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, Send, ShoppingBag, CreditCard, MessageSquare } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  lang: 'ar' | 'en';
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function CartSidebar({
  lang,
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartSidebarProps) {
  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = 45; // 45 EGP flat delivery rate for Mohandessin / Giza / Cairo
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;

  const t = {
    ar: {
      title: 'سلة المأكولات السلطانية',
      emptyText: 'سلتك فارغة حالياً! تصفح المنيو وأضف ألذ أطباق المندي والمشويات لوليمتك.',
      subtotal: 'المجموع الفرعي:',
      deliveryFee: 'رسوم خدمة التوصيل:',
      total: 'المجموع الإجمالي:',
      currency: 'ج.م',
      formTitle: 'بيانات التوصيل والطلب',
      labelName: 'الاسم بالكامل:',
      labelPhone: 'رقم الهاتف (موبايل):',
      labelAddress: 'عنوان التوصيل بالتفصيل:',
      labelNotes: 'ملاحظات إضافية للتوصيل:',
      placeholderName: 'اكتب اسمك الثلاثي...',
      placeholderPhone: 'مثال: 01148333036',
      placeholderAddress: 'مثال: رقم الشقة والدور، اسم الشارع، المهندسين، الجيزة',
      placeholderNotes: 'مثال: رن الجرس، الأكل سبايسي، إلخ...',
      btnSubmit: 'تأكيد وإرسال الطلب عبر الواتساب',
      validationError: 'يرجى ملء جميع البيانات الأساسية (الاسم، الهاتف، العنوان) لتأكيد الطلب!',
      clearCart: 'تفراغ السلة',
      itemNotes: 'ملاحظة:',
      itemRice: 'الأرز:'
    },
    en: {
      title: 'Sultan’s Dining Cart',
      emptyText: 'Your cart is currently empty! Explore the menu and add delicious Mandi & Grills to your feast.',
      subtotal: 'Subtotal:',
      deliveryFee: 'Delivery Fee:',
      total: 'Total Amount:',
      currency: 'EGP',
      formTitle: 'Delivery & Checkout Details',
      labelName: 'Full Name:',
      labelPhone: 'Phone Number (Mobile):',
      labelAddress: 'Detailed Delivery Address:',
      labelNotes: 'Additional Delivery Notes:',
      placeholderName: 'Write your full name...',
      placeholderPhone: 'e.g., 01148333036',
      placeholderAddress: 'e.g., Flat/Floor number, Street Name, Mohandessin, Giza',
      placeholderNotes: 'e.g., Ring bell, make it spicy, etc...',
      btnSubmit: 'Confirm & Send Order via WhatsApp',
      validationError: 'Please fill in all required fields (Name, Phone, Address) to confirm your order!',
      clearCart: 'Clear Cart',
      itemNotes: 'Note:',
      itemRice: 'Rice:'
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert(t[lang].validationError);
      return;
    }

    setIsSubmitting(true);

    // Format beautifully for WhatsApp
    // Number is +20 11 48333036 (format: 201148333036)
    const waNumber = '201148333036';
    
    let message = `👑 *طلب جديد من مطعم مندي السلطان* 👑\n`;
    message += `=====================================\n\n`;
    message += `👤 *بيانات العميل:* \n`;
    message += `• *الاسم:* ${customerName.trim()}\n`;
    message += `• *الهاتف:* ${customerPhone.trim()}\n`;
    message += `• *العنوان:* ${customerAddress.trim()}\n`;
    if (orderNotes.trim()) {
      message += `• *ملاحظات:* ${orderNotes.trim()}\n`;
    }
    message += `\n=====================================\n\n`;
    message += `🛒 *تفاصيل الطلبيّة:* \n\n`;

    cartItems.forEach((item, index) => {
      const itemTitle = lang === 'ar' ? item.nameAr : item.nameEn;
      message += `${index + 1}. *${itemTitle}* \n`;
      message += `   • *الكمية:* ${item.quantity} \n`;
      message += `   • *سعر القطعة:* ${item.price} ${t[lang].currency} \n`;
      
      if (item.selectedOption) {
        message += `   • *الاختيار:* ${item.selectedOption} \n`;
      }
      if (item.selectedRice) {
        message += `   • *نوع الأرز:* ${item.selectedRice} \n`;
      }
      if (item.notes) {
        message += `   • *ملاحظة للمطبخ:* ${item.notes} \n`;
      }
      
      message += `   • *الإجمالي للمجموعة:* ${item.price * item.quantity} ${t[lang].currency} \n\n`;
    });

    message += `=====================================\n\n`;
    message += `💵 *الحساب الإجمالي:* \n`;
    message += `• *المجموع الفرعي:* ${subtotal} ${t[lang].currency}\n`;
    message += `• *رسوم خدمة التوصيل:* ${deliveryFee} ${t[lang].currency}\n`;
    message += `• *المجموع الكلي المطلوب:* *${total} ${t[lang].currency}*\n\n`;
    message += `=====================================\n`;
    message += `شكرًا لاختياركم مندي السلطان! الأكل جاري تحضيره ليكون دايباً وسخناً 🔥🍖`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(waUrl, '_blank');
    setIsSubmitting(false);

    // Clear cart locally since order is sent
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0B0A08]/80 backdrop-blur-sm"
          />

          {/* Cart Sidebar panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[480px] h-full bg-[#161410] border-l border-amber-500/10 shadow-2xl flex flex-col justify-between z-10 overflow-hidden"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0B0A08] to-[#161410] px-6 py-5 border-b border-amber-500/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-amber-400" size={22} />
                <h3 className="font-extrabold text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400">
                  {t[lang].title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-gray-400 hover:text-amber-400 bg-gray-900/60 border border-gray-800 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main content body (Scrollable) */}
            <div className="flex-grow overflow-y-auto px-6 py-5 space-y-8 scrollbar-thin">
              {cartItems.length > 0 ? (
                <>
                  {/* Cart Items List */}
                  <div className="space-y-4">
                    {cartItems.map((item, index) => {
                      const title = lang === 'ar' ? item.nameAr : item.nameEn;
                      return (
                        <div
                          key={index}
                          className="flex gap-4 p-4 rounded-xl bg-gray-950 border border-gray-900/50 hover:border-amber-500/10 transition flex-col sm:flex-row justify-between"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-100 text-sm sm:text-base leading-snug">
                              {title}
                            </h4>
                            
                            {/* Option detail */}
                            {item.selectedOption && (
                              <span className="inline-block text-[10px] sm:text-xs font-semibold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md mt-1.5">
                                {item.selectedOption}
                              </span>
                            )}

                            {/* Rice detail */}
                            {item.selectedRice && (
                              <div className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                                <span className="font-bold text-amber-500/70">{t[lang].itemRice}</span>
                                <span>{item.selectedRice}</span>
                              </div>
                            )}

                            {/* Notes detail */}
                            {item.notes && (
                              <div className="text-xs text-gray-500 mt-1 italic flex items-center gap-1.5">
                                <span className="font-bold text-gray-400">{t[lang].itemNotes}</span>
                                <span className="truncate">{item.notes}</span>
                              </div>
                            )}

                            <div className="text-amber-400 font-extrabold text-sm sm:text-base mt-2">
                              {item.price * item.quantity} {t[lang].currency}
                            </div>
                          </div>

                          {/* Controls (quantity & remove) */}
                          <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-3 shrink-0 border-t sm:border-t-0 sm:border-l border-gray-900/60 pt-3 sm:pt-0 sm:pl-3">
                            <div className="flex items-center bg-gray-900 rounded-lg p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(index, -1)}
                                className="p-1 rounded text-gray-400 hover:text-amber-400 transition"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-bold text-gray-100 min-w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(index, 1)}
                                className="p-1 rounded text-gray-400 hover:text-amber-400 transition"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(index)}
                              className="text-gray-500 hover:text-red-500 p-1.5 transition rounded-lg hover:bg-red-500/5 cursor-pointer"
                              title="إزالة الوجبة"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={onClearCart}
                        className="text-xs text-gray-400 hover:text-red-400 font-semibold underline transition cursor-pointer"
                      >
                        {t[lang].clearCart}
                      </button>
                    </div>
                  </div>

                  {/* Summary Math Block */}
                  <div className="space-y-2.5 border-t border-gray-900/80 pt-6">
                    <div className="flex justify-between text-xs sm:text-sm text-gray-400">
                      <span>{t[lang].subtotal}</span>
                      <span className="font-mono">{subtotal} {t[lang].currency}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm text-gray-400">
                      <span>{t[lang].deliveryFee}</span>
                      <span className="font-mono">{deliveryFee} {t[lang].currency}</span>
                    </div>
                    <div className="flex justify-between text-base sm:text-lg font-black text-amber-400 border-t border-dashed border-gray-900/60 pt-3">
                      <span>{t[lang].total}</span>
                      <span className="font-mono">{total} {t[lang].currency}</span>
                    </div>
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={handleCheckout} className="space-y-4 border-t border-gray-900/80 pt-6">
                    <h4 className="font-bold text-sm text-gray-200 border-r-2 border-amber-500 pr-2 block">
                      {t[lang].formTitle}
                    </h4>

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                        {t[lang].labelName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder={t[lang].placeholderName}
                        className="w-full bg-gray-950 border border-gray-900 text-gray-100 rounded-xl px-4 py-3 text-xs sm:text-sm focus:border-amber-400/50 focus:outline-none transition"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                        {t[lang].labelPhone} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder={t[lang].placeholderPhone}
                        className="w-full bg-gray-950 border border-gray-900 text-gray-100 rounded-xl px-4 py-3 text-xs sm:text-sm text-right focus:border-amber-400/50 focus:outline-none transition font-mono"
                        dir="ltr"
                      />
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                        {t[lang].labelAddress} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder={t[lang].placeholderAddress}
                        rows={3}
                        className="w-full bg-gray-950 border border-gray-900 text-gray-100 rounded-xl px-4 py-3 text-xs sm:text-sm focus:border-amber-400/50 focus:outline-none transition leading-relaxed"
                      />
                    </div>

                    {/* Order notes */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                        {t[lang].labelNotes}
                      </label>
                      <input
                        type="text"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder={t[lang].placeholderNotes}
                        className="w-full bg-gray-950 border border-gray-900 text-gray-100 rounded-xl px-4 py-3 text-xs sm:text-sm focus:border-amber-400/50 focus:outline-none transition"
                      />
                    </div>

                    {/* WhatsApp Submit Action */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-500 hover:to-green-400 text-white shadow-lg hover:shadow-green-500/10 cursor-pointer flex items-center justify-center gap-2.5 transition-all scale-100 active:scale-95"
                    >
                      <MessageSquare size={16} />
                      <span>{t[lang].btnSubmit}</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-20 flex flex-col justify-center items-center h-full">
                  <div className="w-20 h-20 rounded-full bg-gray-950 border border-gray-900 flex items-center justify-center text-gray-600 mb-6">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                    {t[lang].emptyText}
                  </p>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
