import { useState } from "react";
import { faqData } from "../data/faq";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  // Convert \n\n to <br/><br/> for line breaks
  const formattedAnswer = answer.replace(/\n\n/g, '<br/><br/>');
  
  return (
    <div className="border-b border-gray-200 dark:bg-zinc-900">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center border-t border-gray-200 justify-between bg-gray-100 dark:bg-zinc-700/50 px-6 py-4 text-left hover:bg-gray-300 dark:hover:bg-zinc-600 "
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-zinc-300">{question}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-zinc-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? "max-h-[500px]" : "max-h-0"}`}>
        <div className="bg-white dark:bg-zinc-800 px-6 py-4">
          <p 
            className="text-lg text-gray-600 dark:text-zinc-400"
            dangerouslySetInnerHTML={{ __html: formattedAnswer }}
          />
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion() {
  return (
    <div className="px-4 py-8 lg:px-14 dark:bg-zinc-900">
      {faqData.map((category) => (
        <div key={category?.id} className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-[#ff6b6b]">{category.title}</h2>
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-800">
            {category.questions.map((item) => (
              <AccordionItem key={item.id} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}