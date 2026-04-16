import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    Calendar as CalendarIcon,
    User,
    Phone,
    Car,
    MessageSquare,
    Send,
    ArrowLeft,
    Clock,
    CheckCircle2
} from 'lucide-react';

interface ReservationFormPageProps {
    onBack: () => void;
}

export const ReservationFormPage: React.FC<ReservationFormPageProps> = ({ onBack }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        carInfo: '',
        date1: '',
        date2: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Construct mailto link
        const subject = encodeURIComponent('【来店予約】ANG専用フォームより');
        const body = encodeURIComponent(
            `※ANG専用予約フォームからの送信です。\n\n` +
            `■お名前：${formData.name}\n` +
            `■お電話番号：${formData.phone}\n` +
            `■車種 / 年式：${formData.carInfo}\n\n` +
            `■ご希望の来店日時（第1希望）：${formData.date1}\n` +
            `■ご希望の来店日時（第2希望）：${formData.date2}\n\n` +
            `■ご相談内容 / ご希望のメニュー：\n${formData.message}`
        );

        window.location.href = `mailto:ang@soundang.com?subject=${subject}&body=${body}`;
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-lg border border-gray-100"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-black mb-4 tracking-tighter">送信準備が整いました</h2>
                    <p className="text-gray-500 font-bold leading-relaxed mb-8">
                        メールソフトが起動しました。内容をご確認の上、そのまま送信ボタンを押してください。<br />
                        通常2営業日以内に担当者よりご連絡いたします。
                    </p>
                    <button
                        onClick={onBack}
                        className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                    >
                        トップページに戻る
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-500 selection:text-white pb-20">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 h-16 md:h-20 flex items-center">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors font-black text-xs uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>
                    <div className="flex-grow text-center pr-12">
                        <span className="font-black tracking-tighter text-xl">RESERVATION</span>
                    </div>
                </div>
            </header>

            <div className="pt-32 pb-12 max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100"
                >
                    {/* Form Banner */}
                    <div className="bg-blue-600 p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="relative z-10">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-[10px] font-black tracking-[0.2em] uppercase mb-4 mb-4">
                                Reservation Form
                            </span>
                            <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">来店予約・お問い合わせ</h1>
                            <p className="text-blue-100 font-bold opacity-90 max-w-2xl text-sm md:text-base">
                                車種別適合のご確認、お見積りのご相談、作業予約などお気軽にお問い合わせください。
                                入力後、メールソフトが起動します。
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                                    <User className="w-3.5 h-3.5 text-blue-500" />
                                    お名前 <span className="text-red-500 font-bold ml-1">*</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="姓名"
                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold transition-all outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                                    お電話番号 <span className="text-red-500 font-bold ml-1">*</span>
                                </label>
                                <input
                                    required
                                    type="tel"
                                    placeholder="090-0000-0000"
                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold transition-all outline-none"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Car Info */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                                <Car className="w-3.5 h-3.5 text-blue-500" />
                                車種 / 年式 <span className="text-red-500 font-bold ml-1">*</span>
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="例：トヨタ ランドクルーザー300 / 2024年式"
                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold transition-all outline-none"
                                value={formData.carInfo}
                                onChange={(e) => setFormData({ ...formData, carInfo: e.target.value })}
                            />
                        </div>

                        {/* Dates */}
                        <div className="grid md:grid-cols-2 gap-8 pt-4">
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                                    <CalendarIcon className="w-3.5 h-3.5 text-blue-500" />
                                    希望日時（第1希望）
                                </label>
                                <input
                                    type="text"
                                    placeholder="月 日 時頃"
                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold transition-all outline-none"
                                    value={formData.date1}
                                    onChange={(e) => setFormData({ ...formData, date1: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                                    希望日時（第2希望）
                                </label>
                                <input
                                    type="text"
                                    placeholder="月 日 時頃"
                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold transition-all outline-none"
                                    value={formData.date2}
                                    onChange={(e) => setFormData({ ...formData, date2: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                                <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                                ご相談内容 <span className="text-red-500 font-bold ml-1">*</span>
                            </label>
                            <textarea
                                required
                                rows={5}
                                placeholder="ご検討中のパッケージや、お悩みについてお書きください。"
                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold transition-all outline-none resize-none"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-3xl font-black text-lg tracking-widest shadow-2xl shadow-blue-500/20 transition-all flex items-center justify-center gap-4 hover:-translate-y-1 transform-gpu"
                            >
                                内容を確認してメールを起動する
                                <Send className="w-6 h-6" />
                            </button>
                            <p className="text-center text-gray-400 text-[10px] font-bold mt-6 uppercase tracking-widest">
                                ※公式LINEからのご相談も24時間受け付けております
                            </p>
                        </div>
                    </form>
                </motion.div>

                <div className="mt-12 text-center">
                    <button
                        onClick={onBack}
                        className="text-gray-400 hover:text-blue-600 transition-colors font-black text-xs uppercase tracking-widest border-b border-gray-200 pb-1"
                    >
                        トップページへ戻る
                    </button>
                </div>
            </div>
        </div>
    );
};
