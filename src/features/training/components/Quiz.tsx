import { useState, useEffect } from "react";
import { Text } from "@/shared/ui";
import type { Quiz as QuizType } from "../types/quiz";
import clsx from "clsx";

interface QuizProps {
  quiz: QuizType;
  onComplete: (score: number) => void;
}

export function Quiz({ quiz, onComplete }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
  }, [quiz.moduleId]);

  const handleOptionSelect = (
    questionId: string,
    optionId: string,
    type: "single" | "multiple",
  ) => {
    setAnswers((prev) => {
      if (type === "single") {
        return { ...prev, [questionId]: [optionId] };
      }

      const currentAnswers = prev[questionId] || [];
      if (currentAnswers.includes(optionId)) {
        return {
          ...prev,
          [questionId]: currentAnswers.filter((id) => id !== optionId),
        };
      }
      return {
        ...prev,
        [questionId]: [...currentAnswers, optionId],
      };
    });
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question) => {
      const selectedAnswers = answers[question.id] || [];
      const correctOptions = question.options.filter((opt) => opt.isCorrect);

      if (question.type === "single") {
        if (selectedAnswers[0] === correctOptions[0]?.id) {
          correctAnswers++;
        }
      } else {
        const isCorrect =
          selectedAnswers.length === correctOptions.length &&
          correctOptions.every((opt) => selectedAnswers.includes(opt.id));
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
    <div className="mx-auto w-[90%] pt-10 lg:w-[50%]">
      <div className="mb-8 space-y-4">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          {quiz.title}
        </h1>
        <p className="text-zinc-900 dark:text-zinc-400">{quiz.description}</p>
      </div>

      <form className="space-y-8">
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="space-y-4">
            <p className="text-base font-medium text-zinc-900">
              {index + 1}. {question.text}
            </p>

            <div className="space-y-2">
              {question.options.map((option) => {
                const isSelected = (answers[question.id] || []).includes(
                  option.id,
                );
                const showCorrect = submitted && option.isCorrect;
                const showIncorrect =
                  submitted && isSelected && !option.isCorrect;

                return (
                  <label
                    key={option.id}
                    className={clsx(
                      "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-zinc-900",
                      !submitted && "hover:bg-zinc-50 dark:hover:bg-zinc-800",
                      isSelected &&
                        !submitted &&
                        "border-brand-blue-800 bg-orange-50 dark:bg-orange-900/20",
                      showCorrect &&
                        "border-green-600 bg-green-50 dark:bg-green-900/20",
                      showIncorrect &&
                        "border-red-600 bg-red-50 dark:bg-red-900/20",
                    )}
                  >
                    <input
                      type={question.type === "single" ? "radio" : "checkbox"}
                      name={question.id}
                      value={option.id}
                      checked={isSelected}
                      onChange={() =>
                        handleOptionSelect(
                          question.id,
                          option.id,
                          question.type,
                        )
                      }
                      disabled={submitted}
                      className="text-brand-blue-800"
                    />
                    <Text>{option.text}</Text>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== quiz.questions.length}
            className="w-full rounded-[50px] bg-orange-500 p-3 text-lg text-white disabled:bg-orange-300 lg:w-[30%]"
          >
            Submit Quiz
          </button>
        ) : (
          <div className="w-full rounded-[50px] bg-orange-500 p-3 text-lg text-white  lg:w-[30%] text-center">
            <button onClick={handleReset}>Take Again</button>
          </div>
        )}
      </form>
    </div>
  );
}
