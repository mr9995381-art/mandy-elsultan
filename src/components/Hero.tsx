import { motion } from 'motion/react';
import { ChevronDown, MessageSquare, ShieldCheck, Flame, Zap } from 'lucide-react';

interface HeroProps {
  lang: 'ar' | 'en';
  onOrderClick: () => void;
  onAdvisorClick: () => void;
}

export default function Hero({ lang, onOrderClick, onAdvisorClick }: HeroProps) {
  const t = {
    ar: {
      tagline: '👑 المذاق السلطاني الأصيل في قلب الجيزة',
      titleHighlight: 'مندي السلطان',
      titleSuffix: 'ملوك اللحم الدايب والمشويات',
      description: 'نأخذك في رحلة طهي ملكية فريدة حيث يُطهى اللحم الضاني البلدي الفاخر داخل حفر المندي التقليدية تحت الأرض ببطء شديد على جمر الحطب الطبيعي لمدة ٦ ساعات كاملة ليذوب اللحم ويندمج مع نكهة التدخين الفريدة والبهارات الحضرمية السرية.',
      ctaOrder: 'استكشف المنيو واطلب الآن',
      ctaAdvisor: 'تحدث مع مستشار السلطان الذكي',
      feature1Title: 'لحم ضاني بلدي فاخر',
      feature1Desc: 'مذبوح طازجاً، من أجود المراعي البلدية.',
      feature2Title: 'تسوية المندي الأصيلة',
      feature2Desc: 'تحت الأرض ببطء مع الفحم وجمر الحطب الطبيعي.',
      feature3Title: 'توصيل سريع وحراري',
      feature3Desc: 'يصلك الأكل مغلفاً بصناديق حرارية للحفاظ على السخونة.'
    },
    en: {
      tagline: '👑 The Royal Authentic Taste in Giza',
      titleHighlight: 'Mandi El Sultan',
      titleSuffix: 'The Kings of Melted Meat & Grills',
      description: 'Take a journey of royal culinary artistry. We slow-cook premium local baby lamb inside traditional underground clay pits for 6 hours over hot natural wood charcoal, allowing the meat to fall-apart tender, absorbing smoky aromas and our secret blends of Yemeni spices.',
      ctaOrder: 'Explore Menu & Order Now',
      ctaAdvisor: 'Chat with Sultan’s Smart Advisor',
      feature1Title: 'Premium Local Lamb',
      feature1Desc: 'Freshly slaughtered baladi meat from top-grade local livestock.',
      feature2Title: 'Authentic Under-Ground Pit',
      feature2Desc: 'Slow-cooked in clay wells over natural hardwood embers.',
      feature3Title: 'Thermal Hot Delivery',
      feature3Desc: 'Delivered in thermal-sealed packaging to preserve piping heat.'
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center items-center overflow-hidden bg-[#0F0F0F]">
      {/* Background Graphic Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(192,86,33,0.03),transparent_40%)] pointer-events-none" />
      
      {/* Decorative Traditional Arabesque Grid Background Line */}
      <div className="absolute top-20 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(212,175,55,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* 1. Main Branding & Introduction Block (col-span-8) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-12 lg:col-span-8 bg-[#1A1A1A] rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/15 flex flex-col justify-between relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all duration-300 min-h-[380px]"
          >
            {/* Ambient Gold glow inside the bento item */}
            <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-[#D4AF37]/5 blur-[90px] rounded-full pointer-events-none transition-all group-hover:bg-[#D4AF37]/8"></div>
            
            <div className="z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-tr from-[#D4AF37] to-amber-200 rounded-xl flex items-center justify-center text-black font-extrabold text-2xl shadow-lg">
                  👑
                </div>
                <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs sm:text-sm">
                  {lang === 'ar' ? 'ديوان الضيافة الفاخر' : 'The Royal Feast Court'}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37] mb-2 tracking-tight">
                {t[lang].titleHighlight}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-400 font-medium tracking-wide mt-2">{t[lang].titleSuffix}</p>
              
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mt-6 max-w-2xl font-medium">
                {t[lang].description}
              </p>
            </div>
            
            {/* Functional CTAs integrated within Bento Box */}
            <div className="z-10 flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={onOrderClick}
                className="px-6 py-3.5 rounded-2xl text-black font-black text-sm bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] hover:from-amber-400 hover:to-[#D4AF37] shadow-xl hover:shadow-[#D4AF37]/10 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t[lang].ctaOrder}</span>
                <ChevronDown size={16} />
              </button>

              <button
                onClick={onAdvisorClick}
                className="px-6 py-3.5 rounded-2xl text-[#D4AF37] font-black text-sm bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 border border-[#D4AF37]/15 hover:border-[#D4AF37]/35 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} className="animate-pulse" />
                <span>{t[lang].ctaAdvisor}</span>
              </button>
            </div>
          </motion.div>

          {/* 2. Visual Dish Block (col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="col-span-1 md:col-span-6 lg:col-span-4 bg-[#1A1A1A] border border-white/5 rounded-3xl relative overflow-hidden group min-h-[350px] flex flex-col justify-end p-8"
          >
            {/* Ambient image background */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80')" }} 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
            
            <div className="z-10 relative">
              <p className="text-[#D4AF37] font-extrabold text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-1.5 flex items-center gap-1.5">
                <Flame size={12} className="text-[#D4AF37] animate-bounce" />
                <span>{lang === 'ar' ? 'الطبق الملكي المميز' : 'Featured Platter'}</span>
              </p>
              <h2 className="text-white text-2xl sm:text-3xl font-black leading-snug mb-3">
                {lang === 'ar' ? 'كتف لحم مندي ملكي' : 'Lamb Mandi Royal'}
              </h2>
              <div className="w-full h-1.5 bg-[#D4AF37] rounded-full scale-x-100 origin-right transition-transform group-hover:scale-x-110"></div>
            </div>
            
            {/* Small info tag */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-wider">
              {lang === 'ar' ? 'تسوية ٦ ساعات ⏳' : '6 Hrs Slow Cooked ⏳'}
            </div>
          </motion.div>

          {/* 3. Contact & Order Block (col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1 md:col-span-6 lg:col-span-4 bg-white text-black rounded-3xl p-8 flex flex-col justify-between shadow-xl min-h-[220px]"
          >
            <div>
              <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-black/50 mb-3 block">
                {lang === 'ar' ? 'الطلب والدليفري السريع' : 'Quick Order & Delivery'}
              </h3>
              <a 
                href="tel:+201148333036"
                className="text-2xl sm:text-3xl font-black font-mono tracking-tighter text-black hover:text-[#D4AF37] transition duration-200 block mt-1"
                dir="ltr"
              >
                +20 11 48333036
              </a>
            </div>
            
            <a
              href="https://wa.me/201148333036"
              target="_blank"
              rel="noreferrer"
              className="bg-[#F5F5F5] hover:bg-[#EAEAEA] p-4 rounded-2xl border border-gray-200/80 flex items-center justify-between transition"
            >
              <span className="font-bold text-xs sm:text-sm text-gray-800">
                {lang === 'ar' ? 'طلب مباشر عبر واتساب' : 'WhatsApp Live Order'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-green-600 font-extrabold uppercase">ONLINE</span>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              </div>
            </a>
          </motion.div>

          {/* 4. Location Block (col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="col-span-1 md:col-span-6 lg:col-span-4 bg-[#1A1A1A] rounded-3xl p-8 border border-white/5 flex flex-col justify-between min-h-[220px]"
          >
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#D4AF37] mb-2 block">
              {lang === 'ar' ? 'موقع ديوان السلطان' : 'Our Royal Location'}
            </h3>
            <div>
              <p className="text-lg sm:text-xl font-bold leading-snug text-gray-100">
                {lang === 'ar' ? 'مدور المهندس شريف اسماعيل، المهندسين' : 'Sherif Ismail Roundabout, Mohandessin'}
              </p>
              <p className="text-xs text-gray-500 mt-2 font-semibold">Giza Governorate, Egypt</p>
            </div>
            
            {/* Visual bar design from theme */}
            <div className="mt-4 flex gap-2">
              <div className="h-1.5 flex-1 bg-[#D4AF37]/60 rounded-full"></div>
              <div className="h-1.5 flex-1 bg-[#D4AF37]/20 rounded-full"></div>
              <div className="h-1.5 flex-1 bg-[#D4AF37]/10 rounded-full"></div>
            </div>
          </motion.div>

          {/* 5. Signature Menu Item / Stats Block (col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-1 md:col-span-6 lg:col-span-4 bg-[#D4AF37]/5 rounded-3xl p-6 border border-[#D4AF37]/25 flex items-center justify-between hover:bg-[#D4AF37]/10 transition-colors"
          >
            <div className="flex-1">
              <span className="text-[#D4AF37] text-[10px] font-black uppercase block mb-1 tracking-wider">
                {lang === 'ar' ? 'الأكثر مبيعاً' : 'Best Seller Signature'}
              </span>
              <div className="text-xl sm:text-2xl font-bold text-gray-100 leading-tight">
                {lang === 'ar' ? 'صينية السعادة الفاخرة' : 'Joy & Happiness Tray'}
              </div>
            </div>
            <div className="text-4xl font-black text-[#D4AF37] font-mono select-none">
              01
            </div>
          </motion.div>

          {/* 6. Operating Hours Block (col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="col-span-1 md:col-span-6 lg:col-span-4 bg-[#252525] rounded-3xl p-6 border border-white/5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-200">
                {lang === 'ar' ? 'مفتوح الآن' : 'Open Now'}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 font-mono font-bold">
              11:00 AM - 02:00 AM
            </div>
          </motion.div>

          {/* 7. Facebook Link Block (col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-1 md:col-span-6 lg:col-span-4 bg-[#1A1A1A] rounded-3xl p-6 border border-white/5 flex items-center justify-between"
          >
            <span className="text-xs sm:text-sm text-gray-400 font-bold">Facebook page</span>
            <a 
              href="https://www.facebook.com/madyelsultan1/?locale=ar_AR"
              target="_blank" 
              rel="noreferrer"
              className="text-[#D4AF37] font-black text-xs sm:text-sm hover:underline"
            >
              @madyelsultan1
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
