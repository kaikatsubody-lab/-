import { useState } from 'react';
import { DIAGNOSIS_TYPES, DiagnosisType, QUESTIONS } from '@/lib/diagnosis-data';

export type DiagnosisResult = {
  mainType: DiagnosisType;
  subType: DiagnosisType;
  scores: Record<string, number>;
};

export function useDiagnosis() {
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUESTIONS.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswer = (questionId: number, selectedTypes: string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedTypes
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishDiagnosis();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const finishDiagnosis = () => {
    const scores: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };

    // Calculate scores
    Object.values(answers).forEach(selectedTypes => {
      selectedTypes.forEach(type => {
        if (scores[type] !== undefined) {
          scores[type]++;
        }
      });
    });

    // Sort types by score
    const sortedTypes = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    
    const mainTypeId = sortedTypes[0][0];
    // If there's a tie for first place, the second one is the sub type
    // If not, the second highest score is the sub type
    const subTypeId = sortedTypes[1][0];

    setResult({
      mainType: DIAGNOSIS_TYPES[mainTypeId],
      subType: DIAGNOSIS_TYPES[subTypeId],
      scores
    });
    setIsFinished(true);
  };

  const resetDiagnosis = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsFinished(false);
    setResult(null);
  };

  return {
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
  };
}
