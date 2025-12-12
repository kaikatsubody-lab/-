import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import DiagnosisResult from "./DiagnosisResult";

export default function Diagnosis() {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    answers,
    isFinished,
    result,
    handleAnswer,
    nextQuestion,
    prevQuestion,
    resetDiagnosis
  } = useDiagnosis();

  const [isStarted, setIsStarted] = useState(false);

  // If diagnosis is finished and we have a result, show the result page
  if (isFinished && result) {
    return <DiagnosisResult result={result} onRetry={resetDiagnosis} />;
  }

  // Landing Page
  if (!isStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-2xl w-full text-center space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block"
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                現実創造の才能
                <br />
                発掘診断
              </h1>
            </motion.div>
          </div>

          <Card className="glass-card border-white/10 bg-black/40 backdrop-blur-md">
            <CardContent className="p-8 space-y-6 text-left">
              <div className="space-y-4 text-blue-50">
                <p className="leading-relaxed">
                  今あなたが抱えている悩みは、実は「<span className="text-yellow-300 font-bold">強すぎる才能が、誤った方向に使われている</span>」サインかもしれません。
                </p>
                <p className="leading-relaxed">
                  この診断を通して、あなたの中に眠っている「<span className="text-yellow-300 font-bold">現実創造の才能</span>」を見つけにいきましょう。
                </p>
              </div>

              <div className="pt-4 flex justify-center">
                <Button 
                  onClick={() => setIsStarted(true)}
                  size="lg"
                  className="glass-button text-lg px-12 py-6 rounded-full group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    診断を始める <Sparkles className="w-5 h-5 animate-pulse" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Question Page
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-3xl w-full space-y-8 z-10">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-blue-200 font-medium">
            <span>Question {currentQuestionIndex + 1} / {totalQuestions}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-blue-400 [&>div]:to-purple-400" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="glass-card border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
              <CardContent className="p-6 md:p-10 space-y-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-relaxed">
                  Q{currentQuestion.id}. {currentQuestion.text}
                  <span className="block text-base font-sans font-normal text-blue-200 mt-2">（当てはまるもの全て選んでください）</span>
                </h2>

                <div className="grid gap-4">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id]?.includes(option.type);
                    return (
                      <motion.div
                        key={option.type}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div
                          onClick={() => {
                            const currentSelected = answers[currentQuestion.id] || [];
                            const newSelected = isSelected
                              ? currentSelected.filter(t => t !== option.type)
                              : [...currentSelected, option.type];
                            handleAnswer(currentQuestion.id, newSelected);
                          }}
                          className={`
                            cursor-pointer p-4 rounded-xl border transition-all duration-300 flex items-center gap-4
                            ${isSelected 
                              ? 'bg-blue-500/30 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}
                          `}
                        >
                          <div className={`
                            w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors
                            ${isSelected ? 'bg-blue-400 border-blue-400' : 'border-white/30'}
                          `}>
                            {isSelected && <Star className="w-3 h-3 text-white fill-white" />}
                          </div>
                          <span className="text-lg text-blue-50">{option.text}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="ghost"
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="text-blue-200 hover:text-white hover:bg-white/10"
                  >
                    戻る
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    disabled={!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0}
                    className="glass-button px-8"
                  >
                    {currentQuestionIndex === totalQuestions - 1 ? '診断結果を見る' : '次へ'} <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
