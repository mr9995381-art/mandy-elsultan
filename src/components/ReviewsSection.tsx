import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, ShieldCheck, Plus, Check } from 'lucide-react';
import { Review } from '../types';
import { STATIC_REVIEWS } from '../data/menu';

interface ReviewsSectionProps {
  lang: 'ar' | 'en';
}

export default function ReviewsSection({ lang }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Review Form state
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const t = {
    ar: {
      title: 'آراء الضيوف والسلاطين',
      subtitle: 'ماذا يقول عشاق المندي والحنيذ عن وجباتنا الفريدة بالمهندسين',
      verified: 'عميل موثق ✔',
      addReview: 'أضف رأيك الخاص',
      labelName: 'اسمك الكريم:',
      labelRating: 'تقييمك لمذاق الطعام:',
      labelComment: 'تفاصيل رأيك وتجربتك:',
      placeholderName: 'مثال: المهندس محمد زكريا',
      placeholderComment: 'اكتب تفاصيل تجربتك مع الطعام، التوصيل، والخدمة...',
      submitReview: 'نشر التقييم في الديوان',
      successMessage: 'شكرًا جزيلاً لتقييمك يا غالي! تم نشر رأيك بنجاح في مجلس السلطان.',
      close: 'إغلاق',
      noReviews: 'لا يوجد آراء حالية.'
    },
    en: {
      title: 'Sultan Guest Reviews',
      subtitle: 'What Mandi & Haneeth lovers say about our unique feasts in Mohandessin',
      verified: 'Verified Guest ✔',
      addReview: 'Write a Review',
      labelName: 'Your Name:',
      labelRating: 'Your Culinary Rating:',
      labelComment: 'Your Review Details:',
      placeholderName: 'e.g., Engineer Mohamed Zakaria',
      placeholderComment: 'Write details of your experience with our food, delivery, or service...',
      submitReview: 'Publish Review in the Court',
      successMessage: 'Thank you so much for your rating, dear guest! Your review has been published.',
      close: 'Close',
      noReviews: 'No reviews yet.'
    }
  };

  useEffect(() => {
    // Load reviews from Local Storage or seed with static list
    const stored = localStorage.getItem('sultan_reviews');
    if (stored) {
      try {
        setReviews(JSON.parse(stored));
      } catch (e) {
        setReviews(STATIC_REVIEWS);
      }
    } else {
      setReviews(STATIC_REVIEWS);
      localStorage.setItem('sultan_reviews', JSON.stringify(STATIC_REVIEWS));
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      comment: comment.trim(),
      rating: rating,
      date: lang === 'ar' ? 'الآن' : 'Just now',
      isVerified: true
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('sultan_reviews', JSON.stringify(updated));

    // Clear form
    setName('');
    setComment('');
    setRating(5);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormOpen(false);
    }, 2000);
  };

  return (
    <section id="reviews" className="py-24 bg-[#0F0F0F] relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.03),transparent_40%)] pointer-events-none" />

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

        {/* Action Header bar (Trigger review form) */}
        <div className="flex justify-end mb-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="flex items-center gap-2 text-xs sm:text-sm text-black font-extrabold bg-[#D4AF37] hover:bg-amber-300 px-5 py-3 rounded-full shadow-lg shadow-[#D4AF37]/5 transition cursor-pointer"
          >
            <Plus size={16} />
            <span>{t[lang].addReview}</span>
          </button>
        </div>

        {/* Floating/Collapse Review Form Drawer */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 bg-[#1A1A1A] border border-white/5 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto overflow-hidden"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} />
                  </div>
                  <p className="text-gray-200 font-extrabold text-base sm:text-lg">
                    {t[lang].successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-5">
                  <h3 className="font-extrabold text-lg text-[#D4AF37] border-b border-white/5 pb-3">
                    {t[lang].addReview}
                  </h3>

                  {/* Rating Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block">
                      {t[lang].labelRating}
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 text-[#D4AF37] hover:scale-110 transition cursor-pointer"
                        >
                          <Star
                            size={24}
                            fill={star <= rating ? '#D4AF37' : 'none'}
                            stroke={star <= rating ? '#D4AF37' : '#4B5563'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block">
                      {t[lang].labelName}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t[lang].placeholderName}
                      className="w-full bg-black/30 border border-white/5 text-gray-100 rounded-xl px-4 py-3 text-xs sm:text-sm focus:border-[#D4AF37]/50 focus:outline-none transition"
                    />
                  </div>

                  {/* Comment */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block">
                      {t[lang].labelComment}
                    </label>
                    <textarea
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={t[lang].placeholderComment}
                      rows={4}
                      className="w-full bg-black/30 border border-white/5 text-gray-100 rounded-xl px-4 py-3 text-xs sm:text-sm focus:border-[#D4AF37]/50 focus:outline-none transition leading-relaxed"
                    />
                  </div>

                  {/* Submit buttons */}
                  <div className="flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setFormOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-gray-400 hover:text-gray-300 font-bold text-xs sm:text-sm border border-white/5 transition cursor-pointer"
                    >
                      {t[lang].close}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs sm:text-sm hover:bg-amber-300 transition cursor-pointer"
                    >
                      {t[lang].submitReview}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl p-6 bg-[#1A1A1A] border border-white/5 hover:border-[#D4AF37]/10 transition flex flex-col justify-between shadow-lg shadow-[#D4AF37]/[0.01]"
            >
              <div>
                {/* Stars and verified status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex gap-0.5 text-[#D4AF37]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < rev.rating ? '#D4AF37' : 'none'}
                        stroke={i < rev.rating ? '#D4AF37' : '#4B5563'}
                      />
                    ))}
                  </div>
                  {rev.isVerified && (
                    <span className="text-[10px] text-green-500 font-extrabold flex items-center gap-1">
                      <ShieldCheck size={11} />
                      <span>{t[lang].verified}</span>
                    </span>
                  )}
                </div>

                {/* Comment body */}
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Reviewer info */}
              <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                <span className="font-bold text-gray-100 text-xs sm:text-sm">
                  {rev.name}
                </span>
                <span className="text-[10px] text-gray-500 font-medium font-mono">
                  {rev.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
