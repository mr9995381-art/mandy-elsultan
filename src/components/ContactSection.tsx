import { MapPin, Phone, MessageSquare, Facebook, Clock, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactSectionProps {
  lang: 'ar' | 'en';
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const t = {
    ar: {
      title: 'اتصل بنا وموقعنا الملكي',
      subtitle: 'شرفنا بزيارتك في المهندسين أو اطلب ديليفري ليصلك الأكل ساخناً أينما كنت',
      boxPhone: 'أرقام الطلبات والدليفري',
      boxWhatsApp: 'الطلب المباشر عبر الواتساب',
      boxAddress: 'مقر ديوان السلطان بالمهندسين',
      boxFacebook: 'تابعنا على فيسبوك',
      boxHours: 'ساعات العمل الرسمية',
      callNow: 'اتصل الآن',
      chatNow: 'افتح المحادثة',
      visitPage: 'زيارة الصفحة',
      getDirections: 'اتصل بخرائط جوجل',
      addressValue: 'مدور المهندس شريف اسماعيل, المهندسين, Al Tarek Al Abead, الجيزة, مصر',
      hoursValue: 'يوميًا من الساعة ١١:٠٠ صباحًا وحتى الساعة ٢:٠٠ بعد منتصف الليل',
      phoneText: '+20 11 48333036'
    },
    en: {
      title: 'Contact Us & Royal Location',
      subtitle: 'Visit us in Mohandessin or order delivery to get your food steaming hot anywhere',
      boxPhone: 'Orders & Home Delivery Phone',
      boxWhatsApp: 'Direct WhatsApp Orders',
      boxAddress: 'Mandi El Sultan Headquarter',
      boxFacebook: 'Follow Us on Facebook',
      boxHours: 'Official Operating Hours',
      callNow: 'Call Now',
      chatNow: 'Open Chat',
      visitPage: 'Visit Page',
      getDirections: 'Google Maps Directions',
      addressValue: 'Sherif Ismail Roundabout, Mohandessin, Al Tarek Al Abead, Giza Governorate, Egypt',
      hoursValue: 'Everyday from 11:00 AM to 2:00 AM',
      phoneText: '+20 11 48333036'
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0F0F0F] relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37]">
            {t[lang].title}
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg font-medium">
            {t[lang].subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6 rounded-full" />
        </div>

        {/* Info Grid & Map Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          
          {/* Bento boxes - Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Phone Box */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-6 rounded-3xl bg-[#1A1A1A] border border-white/5 shadow-md flex items-start gap-4"
            >
              <div className="p-3.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] shrink-0">
                <Phone size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-sm text-gray-400 uppercase tracking-wide">
                  {t[lang].boxPhone}
                </h4>
                <p className="text-lg sm:text-xl font-black text-gray-100 mt-2 font-mono" dir="ltr">
                  {t[lang].phoneText}
                </p>
                <a
                  href="tel:+201148333036"
                  className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-amber-300 font-bold mt-3 underline"
                >
                  <span>{t[lang].callNow}</span>
                </a>
              </div>
            </motion.div>

            {/* WhatsApp Box */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-6 rounded-3xl bg-[#1A1A1A] border border-white/5 shadow-md flex items-start gap-4"
            >
              <div className="p-3.5 rounded-xl bg-green-500/10 text-green-500 shrink-0">
                <MessageSquare size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-sm text-gray-400 uppercase tracking-wide">
                  {t[lang].boxWhatsApp}
                </h4>
                <p className="text-base sm:text-lg font-black text-gray-100 mt-2 font-mono" dir="ltr">
                  +20 1148333036
                </p>
                <a
                  href="https://wa.me/201148333036"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 font-bold mt-3 underline"
                >
                  <span>{t[lang].chatNow}</span>
                </a>
              </div>
            </motion.div>

            {/* Address Box */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-6 rounded-3xl bg-[#1A1A1A] border border-white/5 shadow-md flex items-start gap-4"
            >
              <div className="p-3.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] shrink-0">
                <MapPin size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-sm text-gray-400 uppercase tracking-wide">
                  {t[lang].boxAddress}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mt-2 font-semibold leading-relaxed">
                  {t[lang].addressValue}
                </p>
                <a
                  href="https://maps.google.com/?q=مدور+المهندس+شريف+اسماعيل,+المهندسين,+Giza,+Egypt"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-amber-300 font-bold mt-3 underline"
                >
                  <Navigation size={12} />
                  <span>{t[lang].getDirections}</span>
                </a>
              </div>
            </motion.div>

            {/* Work Hours & Social Media Box */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-6 rounded-3xl bg-[#1A1A1A] border border-white/5 shadow-md flex items-start gap-4"
            >
              <div className="p-3.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] shrink-0">
                <Clock size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-sm text-gray-400 uppercase tracking-wide">
                  {t[lang].boxHours}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mt-2 font-semibold leading-relaxed">
                  {t[lang].hoursValue}
                </p>

                <div className="border-t border-white/5 pt-4 mt-4 flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-500">{t[lang].boxFacebook}:</span>
                  <a
                    href="https://www.facebook.com/madyelsultan1/?locale=ar_AR"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 transition shadow-sm"
                    title="صفحة فيسبوك مندي السلطان"
                  >
                    <Facebook size={16} />
                  </a>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Map Embed panel (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#1A1A1A] border border-white/5 p-2 overflow-hidden min-h-[380px] flex shadow-xl shadow-[#D4AF37]/[0.01]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110515.11066896263!2d31.130303831201416!3d30.048383861217036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840e69dd5eb7d%3A0xc66aa57c0b0fb1aa!2sMohandessin%2C%20Giza%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1703000000000!5m2!1sen!2seg"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1.25rem' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع مندي السلطان بالمهندسين"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
