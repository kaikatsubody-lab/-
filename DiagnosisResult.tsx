import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiagnosisResult as ResultType } from "@/hooks/useDiagnosis";
import { generatePDF } from "@/lib/pdf-generator";
import { motion } from "framer-motion";
import { ArrowRight, Download, RefreshCw, Share2, Sparkles } from "lucide-react";
import { useState } from "react";

type Props = {
  result: ResultType;
  onRetry: () => void;
};

export default function DiagnosisResult({ result, onRetry }: Props) {
  const [activeTab, setActiveTab] = useState<'main' | 'sub'>('main');
  
  const displayType = activeTab === 'main' ? result.mainType : result.subType;
  const isMain = activeTab === 'main';

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full space-y-8 z-10"
      >
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white drop-shadow-lg">
            診断結果：5つの現実創造タイプ
          </h1>
          <p className="text-blue-200 text-lg">
            あなたの才能が明らかになりました
          </p>
        </div>

        {/* Result Tabs */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveTab('main')}
            className={`px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 ${
              isMain 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-105' 
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            メインタイプ
          </button>
          <button
            onClick={() => setActiveTab('sub')}
            className={`px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 ${
              !isMain 
                ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-[0_0_20px_rgba(96,165,250,0.4)] scale-105' 
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            サブタイプ
          </button>
        </div>

        {/* Main Content Card */}
        <Card id="diagnosis-result-content" className="glass-card border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
          <div className={`h-2 w-full bg-gradient-to-r ${isMain ? 'from-yellow-400 via-orange-500 to-red-500' : 'from-blue-400 via-purple-500 to-pink-500'}`} />
          
          <CardContent className="p-6 md:p-10 space-y-10">
            {/* Type Header */}
            <div className="text-center space-y-4">
              <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/80 text-sm mb-2">
                {isMain ? 'あなたの本質的な才能' : 'あなたを支える補助的な才能'}
              </div>
              <h2 className={`text-3xl md:text-5xl font-serif font-bold ${displayType.color} drop-shadow-md`}>
                {displayType.title}
              </h2>
              <p className="text-xl md:text-2xl text-white font-medium">
                {displayType.subtitle}
              </p>
              
              <div className="flex justify-center py-6">
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-b from-white/10 to-transparent p-1">
                  <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse" />
                  <img 
                    src={displayType.icon} 
                    alt={displayType.title} 
                    className="w-full h-full object-contain p-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6 text-blue-50 leading-relaxed text-lg border-b border-white/10 pb-8">
              <p>{displayType.description}</p>
            </div>

            {/* Talents Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-yellow-300 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> あなたの魅力的な才能
                </h3>
                <ul className="space-y-3">
                  {displayType.talents.map((talent, i) => (
                    <li key={i} className="flex items-start gap-3 text-blue-50">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-300 shrink-0" />
                      <span>{talent}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-red-300 flex items-center gap-2">
                  <span className="text-xl">⚠️</span> でも才能が暴走すると...
                </h3>
                <p className="text-blue-50 text-sm leading-relaxed bg-red-900/20 p-4 rounded-lg border border-red-500/20">
                  {displayType.runaway}
                </p>
              </div>
            </div>

            {/* Usage & Affirmation Section */}
            <div className="bg-white/5 rounded-2xl p-6 md:p-8 space-y-8 border border-white/10">
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold text-green-300 text-center">
                  才能を正しく使うと？
                </h3>
                <p className="text-blue-50 leading-relaxed text-center">
                  {displayType.usage}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                  <h4 className="font-bold text-purple-300 text-center">あなたのためのアファメーション</h4>
                  <div className="bg-black/30 p-4 rounded-lg space-y-2 text-center">
                    {displayType.affirmations.map((text, i) => (
                      <p key={i} className="text-white italic">"{text}"</p>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-blue-300 text-center">今日からできるアクション</h4>
                  <div className="bg-black/30 p-4 rounded-lg space-y-2">
                    {displayType.actions.map((text, i) => (
                      <div key={i} className="flex items-center gap-2 text-blue-50">
                        <ArrowRight className="w-4 h-4 text-blue-300 shrink-0" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8 pb-16">
          <Button 
            onClick={() => generatePDF("diagnosis-result-content")}
            className="glass-button gap-2 h-12 px-8"
          >
            <Download className="w-4 h-4" /> 結果をPDFで保存
          </Button>
          <Button 
            variant="outline" 
            onClick={onRetry}
            className="border-white/20 text-white hover:bg-white/10 gap-2 h-12 px-8 bg-transparent"
          >
            <RefreshCw className="w-4 h-4" /> もう一度診断する
          </Button>
        </div>

        {/* Share Buttons */}
        <div className="flex flex-col items-center gap-4 pb-16">
          <p className="text-blue-200 text-sm">診断結果をシェアする</p>
          <div className="flex flex-wrap justify-center gap-3">
            {/* X (Twitter) */}
            <Button 
              className="bg-black hover:bg-black/80 text-white gap-2 h-10 px-6 border border-white/20"
              onClick={() => {
                const text = `私の現実創造タイプは【${result.mainType.title}】でした！\n#現実創造の才能発掘診断`;
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              Xでシェア
            </Button>

            {/* Facebook */}
            <Button 
              className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white gap-2 h-10 px-6 border-none"
              onClick={() => {
                const url = window.location.href;
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              Facebook
            </Button>

            {/* LINE */}
            <Button 
              className="bg-[#06C755] hover:bg-[#06C755]/90 text-white gap-2 h-10 px-6 border-none"
              onClick={() => {
                const text = `私の現実創造タイプは【${result.mainType.title}】でした！\n#現実創造の才能発掘診断`;
                const url = window.location.href;
                window.open(`https://line.me/R/msg/text/?${encodeURIComponent(text + '\n' + url)}`, '_blank');
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.365 9.863c.349.403.68 1.039.68 1.917 0 1.956-1.354 3.726-3.061 4.925-1.742 1.223-4.046 1.903-6.54 1.903-1.164 0-2.271-.15-3.317-.423l-3.382 1.147c-.372.126-.73.021-.896-.23-.171-.26-.102-.62.148-.896l1.871-2.032c-1.78-1.495-2.653-3.425-2.653-5.402 0-4.298 4.626-7.785 10.334-7.785 2.73 0 5.231.813 7.076 2.123 1.659 1.178 2.481 2.886 2.481 4.656 0 .006 0 .013-.004.019-.01.16-.14.286-.301.286h-.001c-.145 0-.268-.102-.295-.242a5.223 5.223 0 00-.143-.664z" clipRule="evenodd" /></svg>
              LINE
            </Button>

            {/* Native Share (for Instagram etc) */}
            <Button 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 gap-2 h-10 px-6 bg-transparent"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: '現実創造の才能発掘診断',
                    text: `私の現実創造タイプは【${result.mainType.title}】でした！\n#現実創造の才能発掘診断`,
                    url: window.location.href,
                  }).catch(console.error);
                } else {
                  alert('お使いのブラウザはシェア機能に対応していません。URLをコピーしてシェアしてください。');
                }
              }}
            >
              <Share2 className="w-4 h-4" /> その他
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
