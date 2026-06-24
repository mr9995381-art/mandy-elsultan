import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingCart, MessageSquare, Phone, MapPin, Globe } from 'lucide-react';

interface HeaderProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  cartCount: number;
  toggleCart: () => void;
  toggleAdvisor: () => void;
}

export default function Header({ lang, setLang, cartCount, toggleCart, toggleAdvisor }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    ar: {
      brand: 'مندي السلطان',
      subtitle: 'ملوك المندي والحنيذ',
      home: 'الرئيسية',
      menu: 'المنيو',
      trays: 'الصواني الملكية',
      reviews: 'آراء العملاء',
      contact: 'موقعنا',
      advisor: 'مستشار السلطان',
      orderNow: 'اطلب الآن'
    },
    en: {
      brand: 'Mandi El Sultan',
      subtitle: 'The Kings of Mandi & Haneeth',
      home: 'Home',
      menu: 'Menu',
      trays: 'Royal Trays',
      reviews: 'Reviews',
      contact: 'Location',
      advisor: 'Sultan Advisor',
      orderNow: 'Order Now'
    }
  };

  const menuItems = [
    { label: t[lang].home, href: '#home' },
    { label: t[lang].menu, href: '#menu' },
    { label: t[lang].trays, href: '#trays' },
    { label: t[lang].reviews, href: '#reviews' },
    { label: t[lang].contact, href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0A08]/90 border-b border-amber-500/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo / Brand */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="flex items-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-black font-extrabold text-xl shadow-lg shadow-amber-500/10 border border-amber-300">
            👑
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 tracking-wide font-sans leading-none">
              {t[lang].brand}
            </span>
            <span className="text-[10px] text-amber-500/70 font-medium tracking-widest mt-1">
              {t[lang].subtitle}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              className="text-gray-300 hover:text-amber-400 font-medium text-sm transition-colors duration-200 py-2 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Actions Button */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Phone call */}
          <a
            href="tel:+201148333036"
            className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/5 hover:bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/10 transition-all duration-200"
          >
            <Phone size={14} />
            <span className="font-mono" dir="ltr">+20 11 4833 3036</span>
          </a>

          {/* AI Advisor trigger */}
          <button
            onClick={toggleAdvisor}
            className="flex items-center gap-2 text-xs text-black font-semibold bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-full shadow-md shadow-amber-500/10 transition-all duration-200"
          >
            <MessageSquare size={14} />
            <span>{t[lang].advisor}</span>
          </button>
        </div>

        {/* Center Icons Panel: Language, Cart, Mobile menu */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-amber-400 border border-gray-800 hover:border-amber-500/30 px-3 py-1.5 rounded-full transition-all"
            title="Switch Language / تغيير اللغة"
          >
            <Globe size={14} />
            <span className="font-semibold">{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          {/* Cart Icon with badge */}
          <button
            onClick={toggleCart}
            className="relative p-2.5 rounded-full bg-gray-900/60 border border-gray-800 hover:border-amber-500/30 text-gray-300 hover:text-amber-400 transition-all duration-200 cursor-pointer"
            id="header-cart-btn"
          >
            <ShoppingCart size={18} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-[#0B0A08]"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-gray-400 hover:text-amber-400 bg-gray-900/60 border border-gray-800 hover:border-amber-500/30 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-b border-amber-500/10 bg-[#0B0A08] px-4 pt-2 pb-6 flex flex-col gap-4 shadow-xl"
          >
            <div className="flex flex-col gap-1 border-t border-gray-900 pt-4">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="py-3 text-gray-300 hover:text-amber-400 font-medium text-base border-b border-gray-900/50"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => { setMobileMenuOpen(false); toggleAdvisor(); }}
                className="flex items-center justify-center gap-2 w-full text-black font-semibold bg-amber-400 hover:bg-amber-300 py-3 rounded-xl transition-all shadow-lg"
              >
                <MessageSquare size={16} />
                <span>{t[lang].advisor}</span>
              </button>

              <a
                href="tel:+201148333036"
                className="flex items-center justify-center gap-2 w-full text-amber-400 font-semibold bg-amber-500/5 py-3 rounded-xl border border-amber-500/20"
              >
                <Phone size={16} />
                <span dir="ltr">+20 11 4833 3036</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
