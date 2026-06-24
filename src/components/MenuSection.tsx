import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Flame, ShoppingCart, Plus, Minus, Info, Check } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data/menu';

interface MenuSectionProps {
  lang: 'ar' | 'en';
  onAddToCart: (item: CartItem) => void;
}

type CategoryType = 'all' | MenuItem['category'];

export default function MenuSection({ lang, onAddToCart }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  // States to track local custom configuration of menu items before adding them to cart
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({}); // menuId -> optionIndex
  const [selectedRiceChoices, setSelectedRiceChoices] = useState<Record<string, string>>({}); // menuId -> riceName
  const [itemNotes, setItemNotes] = useState<Record<string, string>>({}); // menuId -> notesText
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({}); // menuId -> quantity (defaults to 1)

  const t = {
    ar: {
      sectionTitle: 'ديوان المأكولات الملكية',
      sectionSubtitle: 'استكشف قائمتنا العامرة وحضر وليمتك بنقرة زر واحدة',
      searchPlaceholder: 'ابحث عن طبقك المفضل... (مثال: موزة، كتف، كفتة)',
      categories: {
        all: 'الكل',
        mandi_haneeth: 'مندي وحنيذ اللحم',
        chicken: 'أطباق الدجاج',
        trays: 'الصواني السلطانية',
        grills: 'مشويات الفحم',
        appetizers: 'مقبلات وسلطات',
        desserts_drinks: 'الحلويات والمشروبات'
      },
      spicy: 'حار 🔥',
      popular: 'الأكثر طلباً ⭐',
      chooseOption: 'اختر الحجم / النوع:',
      chooseRice: 'اختر نوع الأرز المفضل:',
      riceOptions: [
        'أرز بسمتي أصفر حضرمي (سادة)',
        'أرز بالخلطة والمكسرات الفاخرة',
        'أرز أحمر حار مسبك'
      ],
      notesPlaceholder: 'أي تعليمات خاصة للمطبخ؟ (مثال: مستوي زيادة، بدون بصل)',
      addToCart: 'إضافة لطلبك',
      added: 'تمت الإضافة!',
      noResults: 'عذراً، لم نجد وجبات تطابق بحثك. جرب البحث عن كلمة أخرى!',
      currency: 'ج.م',
      totalPrice: 'السعر الإجمالي:'
    },
    en: {
      sectionTitle: 'Royal Culinary Menu',
      sectionSubtitle: 'Explore our rich feast list and compile your order with one tap',
      searchPlaceholder: 'Search for your favorite dish... (e.g., lamb, chicken, kofta)',
      categories: {
        all: 'All',
        mandi_haneeth: 'Mandi & Haneeth Lamb',
        chicken: 'Chicken Dishes',
        trays: 'Royal Trays',
        grills: 'Charcoal Grills',
        appetizers: 'Starters & Salads',
        desserts_drinks: 'Desserts & Drinks'
      },
      spicy: 'Spicy 🔥',
      popular: 'Best Seller ⭐',
      chooseOption: 'Choose Size / Style:',
      chooseRice: 'Choose Basmati Rice Style:',
      riceOptions: [
        'Traditional Yellow Basmati (Plain)',
        'Mixed-Nuts & Raisins Basmati',
        'Spicy Red Seasoned Basmati'
      ],
      notesPlaceholder: 'Any special instructions? (e.g., well done, no onions)',
      addToCart: 'Add to Order',
      added: 'Added to Cart!',
      noResults: 'Sorry, no dishes match your search. Try another word!',
      currency: 'EGP',
      totalPrice: 'Total Price:'
    }
  };

  const handleQuantityChange = (menuId: string, delta: number) => {
    const current = itemQuantities[menuId] || 1;
    const next = Math.max(1, current + delta);
    setItemQuantities({ ...itemQuantities, [menuId]: next });
  };

  const handleAddToCartClick = (item: MenuItem) => {
    const qty = itemQuantities[item.id] || 1;
    const optIndex = selectedOptions[item.id] !== undefined ? selectedOptions[item.id] : 0;
    
    let itemPrice = item.price;
    let selectedOptionText = undefined;
    let optionAddition = 0;

    if (item.options && item.options.length > 0) {
      selectedOptionText = item.options[optIndex];
      if (item.optionPrices && item.optionPrices[optIndex] !== undefined) {
        optionAddition = item.optionPrices[optIndex];
        itemPrice += optionAddition;
      }
    }

    const selectedRice = item.hasRiceChoice 
      ? (selectedRiceChoices[item.id] || t[lang].riceOptions[0]) 
      : undefined;

    const notes = itemNotes[item.id] || '';

    const cartItem: CartItem = {
      menuItemId: item.id,
      nameAr: item.nameAr,
      nameEn: item.nameEn,
      price: itemPrice,
      quantity: qty,
      selectedOption: selectedOptionText,
      optionPriceAddition: optionAddition,
      selectedRice: selectedRice,
      notes: notes.trim() ? notes : undefined
    };

    onAddToCart(cartItem);

    // Trigger visual feedback effect
    setAddedItemEffect(item.id);
    setTimeout(() => {
      setAddedItemEffect(null);
    }, 1500);

    // Reset notes and quantity for this item
    setItemNotes({ ...itemNotes, [item.id]: '' });
    setItemQuantities({ ...itemQuantities, [item.id]: 1 });
  };

  // Filter logic
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const cleanQuery = searchQuery.trim().toLowerCase();
    const matchesSearch = !cleanQuery || 
      item.nameAr.toLowerCase().includes(cleanQuery) || 
      item.nameEn.toLowerCase().includes(cleanQuery) || 
      item.descriptionAr.toLowerCase().includes(cleanQuery) || 
      item.descriptionEn.toLowerCase().includes(cleanQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-24 bg-[#0F0F0F] relative border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37]">
            {t[lang].sectionTitle}
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg font-medium">
            {t[lang].sectionSubtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6 rounded-full" />
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col gap-6 mb-12">
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto w-full" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-500" style={lang === 'en' ? { right: 'auto', left: 0, paddingLeft: '1rem' } : {}}>
              <Search size={20} className="text-[#D4AF37]/50" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t[lang].searchPlaceholder}
              className={`w-full bg-[#1A1A1A] text-gray-100 placeholder-gray-500 rounded-2xl py-4 ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} border border-white/5 focus:border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 transition-all font-medium text-sm`}
            />
          </div>

          {/* Categories Tab Bar */}
          <div className="flex items-center justify-start lg:justify-center overflow-x-auto py-2 -mx-4 px-4 gap-2 scrollbar-none" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {(Object.keys(t[lang].categories) as CategoryType[]).map((catKey) => {
              const isActive = activeCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => { setActiveCategory(catKey); }}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer border ${
                    isActive 
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-md shadow-[#D4AF37]/10' 
                      : 'bg-[#1A1A1A] text-gray-400 border-white/5 hover:text-[#D4AF37] hover:border-[#D4AF37]/20'
                  }`}
                >
                  {t[lang].categories[catKey]}
                </button>
              );
            })}
          </div>

        </div>

        {/* Grid of Dishes */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
              {filteredItems.map((item) => {
                const qty = itemQuantities[item.id] || 1;
                const optIndex = selectedOptions[item.id] !== undefined ? selectedOptions[item.id] : 0;
                
                // Calculate display price based on option
                let displayPrice = item.price;
                if (item.options && item.options.length > 0 && item.optionPrices && item.optionPrices[optIndex] !== undefined) {
                  displayPrice += item.optionPrices[optIndex];
                }
                const totalDisplayPrice = displayPrice * qty;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={item.id}
                    id={`menu-item-${item.id}`}
                    className="relative rounded-3xl bg-[#1A1A1A] border border-white/5 hover:border-[#D4AF37]/20 hover:shadow-2xl hover:shadow-[#D4AF37]/5 transition-all overflow-hidden flex flex-col justify-between"
                  >
                    {/* Item Image with badging */}
                    <div className="relative h-56 overflow-hidden shrink-0 group">
                      <img 
                        src={item.image} 
                        alt={lang === 'ar' ? item.nameAr : item.nameEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/20 to-transparent" />
                      
                      {/* Badge tags */}
                      <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
                        {item.popular && (
                          <span className="bg-[#D4AF37] text-black text-[10px] font-black px-2.5 py-1 rounded-full shadow-md uppercase">
                            {t[lang].popular}
                          </span>
                        )}
                        {item.spicy && (
                          <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                            {t[lang].spicy}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Title & Price */}
                        <div className="flex justify-between items-start gap-3 mb-2">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-100 group-hover:text-[#D4AF37]">
                            {lang === 'ar' ? item.nameAr : item.nameEn}
                          </h3>
                          <span className="text-[#D4AF37] font-extrabold text-lg shrink-0 whitespace-nowrap">
                            {displayPrice} {t[lang].currency}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                          {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
                        </p>

                        {/* Interactive Options Configuration */}
                        <div className="space-y-4 border-t border-white/5 pt-4 mb-4">
                          
                          {/* Option Choices (e.g., Size or Style) */}
                          {item.options && item.options.length > 0 && (
                            <div className="space-y-2">
                              <label className="text-[11px] font-bold text-[#D4AF37]/70 tracking-wider block uppercase">
                                {lang === 'ar' ? item.optionsLabelAr : item.optionsLabelEn}
                              </label>
                              <div className="flex flex-wrap gap-1.5">
                                {item.options.map((opt, idx) => {
                                  const isSelected = optIndex === idx;
                                  return (
                                    <button
                                      key={opt}
                                      onClick={() => {
                                        setSelectedOptions({ ...selectedOptions, [item.id]: idx });
                                      }}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                        isSelected 
                                          ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30' 
                                          : 'bg-black/20 text-gray-400 border-white/5 hover:border-white/10'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Rice Choice Selection (only for dishes where rice choice applies) */}
                          {item.hasRiceChoice && (
                            <div className="space-y-2">
                              <label className="text-[11px] font-bold text-[#D4AF37]/70 tracking-wider block uppercase">
                                {t[lang].chooseRice}
                              </label>
                              <select
                                value={selectedRiceChoices[item.id] || t[lang].riceOptions[0]}
                                onChange={(e) => {
                                  setSelectedRiceChoices({ ...selectedRiceChoices, [item.id]: e.target.value });
                                }}
                                className="w-full text-xs font-semibold bg-black/30 border border-white/5 text-gray-300 rounded-lg p-2.5 focus:border-[#D4AF37]/30 focus:outline-none"
                              >
                                {t[lang].riceOptions.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* Custom Text Notes */}
                          <div className="space-y-1.5">
                            <input
                              type="text"
                              value={itemNotes[item.id] || ''}
                              onChange={(e) => {
                                  setItemNotes({ ...itemNotes, [item.id]: e.target.value });
                              }}
                              placeholder={t[lang].notesPlaceholder}
                              className="w-full text-xs bg-black/30 border border-white/5 hover:border-white/10 text-gray-300 rounded-lg px-3 py-2.5 focus:border-[#D4AF37]/30 focus:outline-none placeholder-gray-600 transition-all"
                            />
                          </div>

                        </div>
                      </div>

                      {/* Add to Cart Actions Footer */}
                      <div className="border-t border-white/5 pt-4 flex items-center justify-between gap-4 mt-auto">
                        
                        {/* Quantity controls */}
                        <div className="flex items-center bg-black/30 border border-white/5 rounded-lg p-1">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="p-1.5 rounded-md hover:bg-[#1A1A1A] text-gray-400 hover:text-[#D4AF37] transition"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-extrabold text-gray-100 min-w-8 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="p-1.5 rounded-md hover:bg-[#1A1A1A] text-gray-400 hover:text-[#D4AF37] transition"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Add button */}
                        <button
                          onClick={() => handleAddToCartClick(item)}
                          className={`flex-grow py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all border ${
                            addedItemEffect === item.id
                              ? 'bg-green-600 text-white border-green-600 scale-[0.98]'
                              : 'bg-[#D4AF37] text-black hover:bg-amber-400 border-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/5'
                          }`}
                        >
                          {addedItemEffect === item.id ? (
                            <>
                              <Check size={16} />
                              <span>{t[lang].added}</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={14} />
                              <span>
                                {t[lang].addToCart} ({totalDisplayPrice} {t[lang].currency})
                              </span>
                            </>
                          )}
                        </button>

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-[#1A1A1A] border border-white/5 rounded-3xl max-w-xl mx-auto px-6"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
              <Info className="mx-auto text-[#D4AF37] mb-4" size={40} />
              <p className="text-gray-300 font-bold text-lg">{t[lang].noResults}</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
