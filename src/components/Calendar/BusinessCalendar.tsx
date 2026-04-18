import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Speaker,
  ShieldCheck,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { useCalendar } from '../../contexts/CalendarContext';
import { useNavigate } from 'react-router-dom';

const LineIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.477 2 2 6.145 2 11.259c0 4.545 3.197 8.353 7.502 9.079.292.062.69.193.791.442.091.226.059.58.029.809l-.128.767c-.039.226-.188.885.811.483 1-.399 5.39-3.161 7.352-5.411 1.33-1.521 1.604-2.775 1.604-4.17C22 6.145 17.523 2 12 2zm-5.415 12.083h-1.58c-.255 0-.462-.207-.462-.462V8.267c0-.255.207-.462.462-.462h1.58c.255 0 .462.207.462.462v.336c0 .255-.207.462-.462.462h-1.117v.606h1.117c.255 0 .462.207.462.462v.336c0 .255-.207.462-.462.462h-1.117v.606h1.117c.255 0 .462.207.462.462v.336c0 .255-.207.462-.462.462zM9.081 13.621h-1.58c-.255 0-.462-.207-.462-.462V8.267c0-.255.207-.462.462-.462h.336c.255 0 .462.207.462.462v2.893h.782c.255 0 .462.207.462.462v.336c0 .255-.207.462-.462.462zm1.831 0h-.336c-.255 0-.462-.207-.462-.462V8.267c0-.255.207-.462.462-.462h.336c.255 0 .462.207.462.462v4.892c0 .255-.207.462-.462.462zm3.833 0h-1.58c-.255 0-.462-.207-.462-.462V8.267c0-.255.207-.462.462-.462h.336c.255 0 .462.207.462.462v2.352l.991-2.558c.059-.153.211-.256.375-.256h.371c.32 0 .538.336.404.623l-.809 1.75 1.059 2.053c.143.239-.029.543-.307.543h-.344c-.164 0-.312-.088-.391-.231l-.735-1.23v.91c0 .255-.207.462-.462.462z" />
  </svg>
);

// 定休日の初期設定（火曜・金曜）
const DEFAULT_WEEKLY_HOLIDAYS = [2, 5]; // 0:日, 1:月, 2:火, 3:水, 4:木, 5:金, 6:土

export const BusinessCalendar = () => {
  const navigate = useNavigate();
  const [viewDate, setViewDate] = useState(new Date());
  const { holidays } = useCalendar();

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const monthKey = `${year}-${month + 1}`;

  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50"></div>

        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-blue-500 font-bold tracking-widest uppercase text-sm block cursor-default select-none">
                  Calendar
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                営業日のご案内
              </h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                Sound ANGは、お客様一人ひとりと向き合う時間を大切にするため、予約優先制となっております。
                カレンダーより定休日をご確認の上、お気軽にお問い合わせください。
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {/* Audio Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-500/5 border border-gray-50 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                      <Speaker className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-black text-xl tracking-tighter">AUDIO</h3>
                  </div>
                  <div className="space-y-3 text-sm flex-grow">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-gray-600 leading-tight">〒816-0912<br />福岡県大野城市御笠川5-4-14</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-900 font-bold text-base">092-503-5421</p>
                        <p className="text-gray-400 text-[10px]">FAX: 092-503-5492</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <a href="mailto:ang@soundang.com" className="text-gray-600 break-all font-medium hover:text-blue-500 transition-colors">ang@soundang.com</a>
                    </div>
                  </div>
                </div>

                {/* Security Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xl shadow-red-500/5 border border-gray-50 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-xl tracking-tighter leading-none">SECURITY</h3>
                      <p className="text-[10px] text-gray-400 font-bold mt-1">オートセキュリティーエナジー</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm flex-grow">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-gray-600 leading-tight">〒816-0912<br />福岡県大野城市御笠川5-4-14</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-900 font-bold text-base">092-503-5437</p>
                        <p className="text-gray-400 text-[10px]">FAX: 092-503-5492</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <a href="mailto:ang@sec-ang.com" className="text-gray-600 break-all font-medium hover:text-red-500 transition-colors">ang@sec-ang.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100/50 rounded-[2rem] p-6 mb-8 border border-gray-100">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-sm mb-1">営業時間</h4>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>月・水・木・土：9:30 〜 18:30</p>
                        <p>日・祝日：9:30 〜 17:00</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-sm mb-1">定休日</h4>
                      <p className="text-red-500 font-bold text-xs">毎週火曜日 / 金曜日</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200/50 flex justify-between items-center">
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">
                    Invoice: <span className="text-gray-600 font-mono">T4290002038758</span>
                  </p>
                </div>
              </div>

              <motion.a
                href="https://page.line.me/312qjhsq?openQrModal=true"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-6 p-6 bg-white rounded-[2rem] shadow-xl shadow-green-500/10 border border-green-50 transition-all group cursor-pointer relative overflow-hidden mb-10"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 relative z-10">
                  <img
                    src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
                    alt="LINE友達追加"
                    className="h-12 w-auto object-contain shadow-lg shadow-green-500/20 rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Official LINE</span>
                    <span className="text-green-600 animate-pulse flex items-center gap-1 text-[9px] font-bold">
                      <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                      受付中
                    </span>
                  </div>
                  <p className="text-gray-900 text-sm font-bold leading-tight">
                    ラインからでも来店予約・お問い合わせ可能
                  </p>
                </div>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 p-8 md:p-10 border border-white relative"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold">{year}.{String(month + 1).padStart(2, '0')}</h3>
              <div className="flex gap-2">
                <button
                  onClick={prevMonth}
                  className="p-3 hover:bg-gray-50 rounded-2xl border border-gray-100 transition-colors"
                  aria-label="前の月"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-3 hover:bg-gray-50 rounded-2xl border border-gray-100 transition-colors"
                  aria-label="次の月"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-6">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, i) => (
                <div key={day} className={`text-center text-[10px] font-black tracking-tighter ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-300'}`}>
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayOfWeek = new Date(year, month, day).getDay();

                // 毎週の定休日判定
                const isWeeklyHoliday = DEFAULT_WEEKLY_HOLIDAYS.includes(dayOfWeek);

                // 個別設定の休日判定
                const isManualHoliday = holidays[monthKey]?.includes(day) || false;

                // 最終的な休日判定（毎週の休み XOR 個別設定）
                const isClosed = isWeeklyHoliday !== isManualHoliday;

                const isToday = new Date().getFullYear() === year &&
                  new Date().getMonth() === month &&
                  new Date().getDate() === day;

                return (
                  <div
                    key={day}
                    className={`
                      aspect-square flex flex-col items-center justify-center rounded-2xl text-sm font-bold transition-all relative group
                      ${isClosed ? 'bg-red-50 text-red-500' : isToday ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'hover:bg-blue-50 hover:text-blue-600'}
                    `}
                  >
                    {day}
                    {isClosed && (
                      <span className="absolute bottom-2 w-1 h-1 bg-red-400 rounded-full"></span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 pt-8 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-medium">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span>定休日</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>本日</span>
                </div>
              </div>
              <span className="italic opacity-50">Sound ANG Official</span>
            </div>

            <div className="mt-10">
              <button
                onClick={() => navigate('/reservation')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5 mr-1" />
                <span className="text-lg">専用フォームで予約する</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
