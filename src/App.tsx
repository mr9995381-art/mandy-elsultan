import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Facebook, 
  MessageSquare, 
  Flame, 
  Sun, 
  Moon, 
  FileText, 
  ExternalLink, 
  Share2, 
  MapPin, 
  Instagram, 
  Check, 
  Copy 
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showToast, setShowToast] = useState(false);

  // Initialize theme from localStorage if available and set document title
  useEffect(() => {
    document.title = "مندي السلطان";
    const savedTheme = localStorage.getItem('sultan_theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('sultan_theme', newTheme);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  // Shared URLs (easily customizable)
  const GOOGLE_DRIVE_MENU_URL = "https://drive.google.com/file/d/1W09byqSieZ6EtaXjCkqKvCvFpvQ7HVL5/view?usp=drive_link";
  const FACEBOOK_PAGE_URL = "https://www.facebook.com/madyelsultan1/?locale=ar_AR";
  const INSTAGRAM_URL = "https://instagram.com/madyelsultan"; // Template instagram placeholder
  const PHONE_NUMBER = "+201148333036";
  const WHATSAPP_URL = `https://wa.me/201002988848?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن منيو مندي السلطان وطلب وجبة.')}`;
  const GOOGLE_MAPS_URL = "https://maps.google.com/?q=مدور+المهندس+شريف+اسماعيل,+المهندسين,+Giza,+Egypt";

  return (
    <div 
      className={`min-h-screen transition-colors duration-500 font-sans flex flex-col items-center justify-between py-8 px-4 select-none relative overflow-hidden ${
        theme === 'light' 
          ? 'bg-[#FAF6F0] text-[#3D2724]' 
          : 'bg-[#12100F] text-[#FAF6F0]'
      }`}
      dir="rtl"
    >
      {/* Absolute Decorative Blobs for premium organic feeling */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] left-[-20%] w-[300px] h-[300px] rounded-full blur-[120px] transition-opacity duration-500 ${
          theme === 'light' ? 'bg-[#D4AF37]/10' : 'bg-[#D4AF37]/5'
        }`} />
        <div className={`absolute bottom-[-10%] right-[-20%] w-[350px] h-[350px] rounded-full blur-[150px] transition-opacity duration-500 ${
          theme === 'light' ? 'bg-[#B0891E]/10' : 'bg-[#B0891E]/5'
        }`} />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md flex-1 flex flex-col justify-between z-10 relative">
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between w-full mb-8">
          {/* Share Button */}
          <button 
            onClick={handleShare}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 border cursor-pointer active:scale-90 ${
              theme === 'light' 
                ? 'bg-white border-[#EFEBE4] text-[#3D2724] hover:bg-gray-50 shadow-sm' 
                : 'bg-[#1C1817] border-white/5 text-[#FAF6F0] hover:bg-[#2A2321]'
            }`}
            title="مشاركة الصفحة"
          >
            <Share2 size={16} />
          </button>

          {/* Status Badge */}
          <div className={`px-4 py-2 rounded-full border flex items-center gap-2 text-xs font-bold ${
            theme === 'light'
              ? 'bg-white border-[#EFEBE4] text-gray-600 shadow-sm'
              : 'bg-[#1C1817] border-white/5 text-gray-300'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>دائماً في خدمتكم</span>
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={handleToggleTheme}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 border cursor-pointer active:scale-90 ${
              theme === 'light' 
                ? 'bg-white border-[#EFEBE4] text-[#3D2724] hover:bg-gray-50 shadow-sm' 
                : 'bg-[#1C1817] border-white/5 text-[#FAF6F0] hover:bg-[#2A2321]'
            }`}
            title={theme === 'light' ? 'الوضع الداكن' : 'الوضع المضيء'}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        {/* HERO HEADER CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-[2.5rem] p-8 text-center border relative overflow-hidden mb-8 transition-all duration-500 ${
            theme === 'light'
              ? 'bg-white border-[#EFEBE4] shadow-[0_24px_50px_rgba(61,39,36,0.06)]'
              : 'bg-[#1C1817] border-white/5 shadow-[0_24px_50px_rgba(0,0,0,0.4)]'
          }`}
        >
          {/* Top-Right Soft Decorative Blob */}
          <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full pointer-events-none transition-colors duration-500 ${
            theme === 'light' ? 'bg-[#FAF6F0]' : 'bg-[#12100F]'
          }`} />

          {/* Main Brand Title */}
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 select-none leading-normal ${
            theme === 'light' ? 'text-[#3D2724]' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37]'
          }`}>
            مندي السلطان
          </h1>

          {/* Solid Thick Accent Line */}
          <div className="w-16 h-1 bg-[#C29A63] mx-auto my-4 rounded-full" />

          {/* Tagline */}
          <p className="text-base font-bold italic tracking-wide text-[#C29A63] mb-6">
            أصل المندي والمشوي البلدي
          </p>

          {/* Thin Divider Line */}
          <div className={`w-full h-[1px] my-6 ${
            theme === 'light' ? 'bg-[#EFEBE4]' : 'bg-white/5'
          }`} />

          {/* Location Pill */}
          <div className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border text-xs font-semibold ${
            theme === 'light'
              ? 'bg-[#FAF6F0] border-[#EFEBE4] text-[#5C4E4B]'
              : 'bg-[#12100F] border-white/5 text-[#D4AF37]'
          }`}>
            <MapPin size={12} className="text-[#C29A63]" />
            <span>المهندسين - دوار الشريف إسماعيل</span>
          </div>
        </motion.div>

        {/* BUTTONS / ACTIONS SECTION */}
        <div className="space-y-4 w-full mb-12">
          
          {/* PRIMARY: BROWSE FULL MENU BUTTON */}
          <motion.a
            href={GOOGLE_DRIVE_MENU_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-lg cursor-pointer ${
              theme === 'light'
                ? 'bg-[#482F2B] hover:bg-[#392522] text-[#FAF6F0] shadow-[#482F2B]/15'
                : 'bg-[#D4AF37] hover:bg-[#F5D061] text-black shadow-[#D4AF37]/15'
            }`}
          >
            <FileText size={18} />
            <span>تصفح المنيو بالكامل</span>
          </motion.a>

          {/* SECONDARY ROW 1: WHATSAPP & PHONE */}
          <div className="grid grid-cols-2 gap-3">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm border transition-all duration-300 shadow-sm cursor-pointer ${
                theme === 'light'
                  ? 'bg-white border-[#EFEBE4] text-[#3D2724] hover:bg-[#FAF6F0]'
                  : 'bg-[#1C1817] border-white/5 text-[#FAF6F0] hover:bg-[#25201E]'
              }`}
            >
              <MessageSquare size={16} className="text-green-500" />
              <span>واتساب</span>
            </motion.a>

            <motion.a
              href={`tel:${PHONE_NUMBER}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm border transition-all duration-300 shadow-sm cursor-pointer ${
                theme === 'light'
                  ? 'bg-white border-[#EFEBE4] text-[#3D2724] hover:bg-[#FAF6F0]'
                  : 'bg-[#1C1817] border-white/5 text-[#FAF6F0] hover:bg-[#25201E]'
              }`}
            >
              <Phone size={14} className="text-[#C29A63]" />
              <span>اطلب هاتفياً</span>
            </motion.a>
          </div>

          {/* SECONDARY ROW 2: GOOGLE MAPS LOCATION */}
          <motion.a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4.5 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm border transition-all duration-300 shadow-sm cursor-pointer ${
              theme === 'light'
                ? 'bg-white border-[#EFEBE4] text-[#3D2724] hover:bg-[#FAF6F0]'
                : 'bg-[#1C1817] border-white/5 text-[#FAF6F0] hover:bg-[#25201E]'
            }`}
          >
            <MapPin size={16} className="text-red-500 animate-bounce" />
            <span>موقع المطعم (GPS)</span>
          </motion.a>

          {/* SECONDARY ROW 3: FACEBOOK & INSTAGRAM */}
          <div className="grid grid-cols-2 gap-3">
            <motion.a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm border transition-all duration-300 shadow-sm cursor-pointer ${
                theme === 'light'
                  ? 'bg-white border-[#EFEBE4] text-[#3D2724] hover:bg-[#FAF6F0]'
                  : 'bg-[#1C1817] border-white/5 text-[#FAF6F0] hover:bg-[#25201E]'
              }`}
            >
              <Facebook size={16} className="text-blue-600" />
              <span>فيسبوك</span>
            </motion.a>

            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm border transition-all duration-300 shadow-sm cursor-pointer ${
                theme === 'light'
                  ? 'bg-white border-[#EFEBE4] text-[#3D2724] hover:bg-[#FAF6F0]'
                  : 'bg-[#1C1817] border-white/5 text-[#FAF6F0] hover:bg-[#25201E]'
              }`}
            >
              <Instagram size={16} className="text-pink-500" />
              <span>إنستجرام</span>
            </motion.a>
          </div>

        </div>

        {/* TOAST NOTIFICATION FOR COPY LINK */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#3D2724] text-white px-5 py-3 rounded-full flex items-center gap-2.5 text-xs font-bold shadow-xl border border-white/10"
            >
              <Check size={14} className="text-green-400" />
              <span>تم نسخ رابط الصفحة بنجاح!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER - DEVELOPER & RIGHTS */}
        <div className="text-center pt-8 border-t border-dashed border-gray-500/10 w-full">
          <p className="text-[10px] tracking-[0.25em] font-extrabold text-gray-400 uppercase mb-2">
            CREATED BY
          </p>
          <h2 className={`text-xl font-black font-serif tracking-wide transition-colors duration-500 ${
            theme === 'light' ? 'text-[#3D2724]' : 'text-[#FAF6F0]'
          }`}>
            عمر أحمد
          </h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase mt-3 tracking-widest">
            MANDI EL SULTAN © 2026
          </p>
          <div className="flex justify-center gap-1.5 mt-2">
            <span className="w-1 h-1 rounded-full bg-[#C29A63]/50"></span>
            <span className="w-1 h-1 rounded-full bg-[#C29A63]/50"></span>
            <span className="w-1 h-1 rounded-full bg-[#C29A63]/50"></span>
          </div>
        </div>

      </div>
    </div>
  );
}
