import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, AlertCircle } from 'lucide-react';
import { Message } from '../types';

interface SultanAdvisorProps {
  lang: 'ar' | 'en';
  isOpen: boolean;
  onClose: () => void;
}

export default function SultanAdvisor({ lang, isOpen, onClose }: SultanAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = {
    ar: {
      advisorName: 'مستشار السلطان الذكي',
      advisorTitle: 'ديوان الضيافة الرقمي',
      welcomeMessage: 'مرحباً بك يا غالي في ديوان السلطان! 👑 أنا مستشارك الخاص لمساعدتك في تنسيق مائدة طعامك وتحديد الولائم أو اختيار الطبق المثالي لشهيتك اليوم. كم عدد ضيوفك وما الذي تشتهيه اليوم لتجده على مائدتك؟',
      placeholder: 'اكتب رسالتك للمستشار هنا...',
      send: 'إرسال',
      loadingText: 'يفكر المستشار في مائدتك...',
      errorText: 'معذرةً يا غالي، واجه مجلس المستشار عطلاً مؤقتاً، ولكن يسعدني الإجابة عليك فوراً!'
    },
    en: {
      advisorName: 'Sultan’s Smart Advisor',
      advisorTitle: 'Digital Royal Hospitality',
      welcomeMessage: 'Welcome, dear guest, to the Sultan’s court! 👑 I am your private advisor, ready to help you plan the perfect feast, estimate portion sizes, or pick the absolute best dish for your appetite today. How many guests are joining you and what are you craving?',
      placeholder: 'Type your message to the advisor...',
      send: 'Send',
      loadingText: 'The Advisor is planning your feast...',
      errorText: 'Apologies, the advisor’s court encountered a brief issue, but I am ready to recommend delicious food!'
    }
  };

  useEffect(() => {
    // Populate with welcome message on mount if empty
    if (messages.length === 0) {
      setMessages([
        { role: 'model', text: t[lang].welcomeMessage }
      ]);
    }
  }, [lang]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    
    // Add user message to state
    const updatedMessages = [...messages, { role: 'user' as const, text: userText }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error('Advisor API request failed');
      }

      const data = await response.json();
      setMessages([...updatedMessages, { role: 'model', text: data.text }]);
    } catch (error) {
      console.error('Error communicating with AI Advisor:', error);
      setMessages([
        ...updatedMessages,
        { 
          role: 'model', 
          text: lang === 'ar' 
            ? 'مرحباً بك يا غالي! لم أتمكن من الاتصال بشبكة الديوان، ولكن أنصحك بشدة بطلب **صينية السعادة الفاخرة** (تكفي ٤ أفراد) أو **مندي اللحم البلدي الدايب** اليوم! كيف يمكنني مساعدتك؟' 
            : 'Welcome! I could not connect to the court, but I highly recommend ordering our **Tray of Happiness** (for 4 people) or our tender **Mandi Baladi Lamb** today! How can I help you?' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 50 }}
          className="fixed bottom-6 right-6 z-50 w-full max-w-[420px] h-[600px] bg-[#1A1A1A] border border-white/5 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className="bg-[#111111] px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-lg shadow-md border border-white/5 text-black">
                👑
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#D4AF37] flex items-center gap-1.5">
                  <span>{t[lang].advisorName}</span>
                  <Sparkles size={12} className="text-amber-300 animate-pulse" />
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5">{t[lang].advisorTitle}</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-[#D4AF37] bg-black/30 border border-white/5 transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-black/20">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-md ${
                      isUser
                        ? 'bg-[#D4AF37] text-black font-semibold rounded-br-none'
                        : 'bg-[#222222] border border-white/5 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {/* Render formatting nicely */}
                    <div className="whitespace-pre-wrap">
                      {msg.text.split('**').map((part, partIdx) => 
                        partIdx % 2 === 1 ? <strong key={partIdx} className={isUser ? "text-black underline" : "text-[#D4AF37] font-bold"}>{part}</strong> : part
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-[#222222] border border-white/5 text-gray-400 rounded-bl-none flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-xs font-medium italic ml-1">{t[lang].loadingText}</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat form footer */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-[#1A1A1A] border-t border-white/5 flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t[lang].placeholder}
              className="flex-grow bg-black/30 border border-white/5 hover:border-white/10 focus:border-[#D4AF37]/50 focus:outline-none rounded-xl px-4 py-3.5 text-xs sm:text-sm text-gray-100 placeholder-gray-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-extrabold transition disabled:opacity-50 disabled:hover:bg-[#D4AF37] cursor-pointer flex items-center justify-center shrink-0"
            >
              <Send size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
