import { useState } from "react";
import { Text, Button } from "@/shared/ui";
import type { Quiz as QuizType } from "../types/quiz";
import clsx from "clsx";

interface QuizProps {
  quiz: QuizType;
  onComplete: (score: number) => void;
}

export function Quiz({ quiz, onComplete }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);


  const handleOptionSelect = (questionId: string, optionId: string, type: "single" | "multiple") => {
    setAnswers(prev => {
      if (type === "single") {
        return { ...prev, [questionId]: [optionId] };
      }
      
      const currentAnswers = prev[questionId] || [];
      if (currentAnswers.includes(optionId)) {
        return {
          ...prev,
          [questionId]: currentAnswers.filter(id => id !== optionId)
        };
      }
      return {
        ...prev,
        [questionId]: [...currentAnswers, optionId]
      };
    });
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      const selectedAnswers = answers[question.id] || [];
      const correctOptions = question.options.filter(opt => opt.isCorrect);
      
      if (question.type === "single") {
        if (selectedAnswers[0] === correctOptions[0]?.id) {
          correctAnswers++;
        }
      } else {
        const isCorrect = selectedAnswers.length === correctOptions.length &&
          correctOptions.every(opt => selectedAnswers.includes(opt.id));
        if (isCorrect) correctAnswers++;
      }
    });
    
    return (correctAnswers / quiz.questions.length) * 100;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setSubmitted(true);
    onComplete(finalScore);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4 mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          {quiz.title}
        </h1>
        <Text className="text-zinc-600 dark:text-zinc-400">
          {quiz.description}
        </Text>
      </div>

      <form className="space-y-8">
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="space-y-4">
            <Text className="font-medium">
              {index + 1}. {question.text}
            </Text>
            
            <div className="space-y-2">
              {question.options.map(option => {
                const isSelected = (answers[question.id] || []).includes(option.id);
                const showCorrect = submitted && option.isCorrect;
                const showIncorrect = submitted && isSelected && !option.isCorrect;

                return (
                  <label
                    key={option.id}
                    className={clsx(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer",
                      !submitted && "hover:bg-zinc-50 dark:hover:bg-zinc-800",
                      isSelected && !submitted && "border-orange-600 bg-orange-50 dark:bg-orange-900/20",
                      showCorrect && "border-green-600 bg-green-50 dark:bg-green-900/20",
                      showIncorrect && "border-red-600 bg-red-50 dark:bg-red-900/20"
                    )}
                  >
                    <input
                      type={question.type === "single" ? "radio" : "checkbox"}
                      name={question.id}
                      value={option.id}
                      checked={isSelected}
                      onChange={() => handleOptionSelect(question.id, option.id, question.type)}
                      disabled={submitted}
                      className="text-orange-600"
                    />
                    <Text>{option.text}</Text>
                  </label>
                );
              })}
            </div>

            {submitted && question.explanation && (
              <Text className="text-sm italic text-zinc-600 dark:text-zinc-400">
                {question.explanation}
              </Text>
            )}
          </div>
        ))}

        {!submitted ? (
          <Button onClick={handleSubmit} disabled={Object.keys(answers).length !== quiz.questions.length}>
            Submit Quiz
          </Button>
        ) : (
          <div className="space-y-4">
            <Button onClick={handleReset}>
              Take Again
            </Button>
          </div>
        )}
      </form>
    </div>
  );
} 