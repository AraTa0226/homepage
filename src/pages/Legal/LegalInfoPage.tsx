import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, FileText, ChevronRight } from 'lucide-react';

interface LegalInfoPageProps {
    onBack: () => void;
}

export const LegalInfoPage: React.FC<LegalInfoPageProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-600 selection:text-white">
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
                        <span className="font-black tracking-tighter text-xl">LEGAL INFO</span>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-24 max-w-4xl mx-auto px-4">
                {/* Page Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black tracking-[0.2em] uppercase mb-4">
                        Safety & Standards
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
                        プライバシーポリシー <br />
                        および ご利用規定
                    </h1>
                    <p className="text-gray-500 font-bold leading-relaxed max-w-2xl">
                        Sound ANG（サウンドエナジー）は、お客様の個人情報を大切に扱い、
                        安心してサービスをご利用いただける環境づくりに努めております。
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {/* Privacy Policy Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-black tracking-tight">個人情報保護方針</h2>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-3">01. 個人情報の取得について</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    当サイトでは、来店予約やお問合わせなどのサービス提供にあたり、お名前、お電話番号、車種情報などの必要な範囲で個人情報を収集させていただきます。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-3">02. 利用目的について</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    お預かりした個人情報は、以下の目的のみに使用いたします。
                                </p>
                                <ul className="mt-4 space-y-2">
                                    {[
                                        "来店予約の管理および確認のご連絡",
                                        "お問い合わせ内容への回答・資料送付",
                                        "施工サービスに関する技術的な確認事項の連絡",
                                        "サービス向上を目的とした統計データの分析（匿名化）"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-500 font-bold text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-200 mt-2 shrink-0"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-3">03. 第三者への開示について</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    法令に基づく場合を除き、お客様の同意なく個人情報を第三者に開示・提供することはありません。管理責任者のもと、厳重なセキュリティ体制で保護いたします。
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Terms of Service Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                                <FileText className="w-6 h-6 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-black tracking-tight">ご利用規定・予約時の注意</h2>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-sm font-black text-orange-600 uppercase tracking-widest mb-3">01. ご予約の変更・キャンセル</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    健全な店舗運営のため、ご予約日時の変更やキャンセルを希望される場合は、お早めにお電話または公式LINEにてご連絡をお願いいたします。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-black text-orange-600 uppercase tracking-widest mb-3">02. 施工に関する免責事項</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    車両の状態（過度な経年劣化、不正改造など）により、事前の承諾なく施工をお断り、あるいは条件付きでの施工となる場合がございます。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-black text-orange-600 uppercase tracking-widest mb-3">03. 著作権について</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    当サイトに掲載されている施工写真、文章、デザイン等の著作権はSound ANGに帰属します。無断での転載・複製は固くお断りいたします。
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Contact Info Footer */}
                    <div className="text-center pt-8">
                        <p className="text-gray-400 text-xs font-bold mb-8 italic">
                            最終更新日：2026年4月18日
                        </p>
                        <button
                            onClick={onBack}
                            className="group inline-flex items-center gap-4 bg-gray-900 text-white px-10 py-5 rounded-3xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all shadow-2xl shadow-gray-200"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            トップページに戻る
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};
