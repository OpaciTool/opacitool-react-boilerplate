import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-500 shadow-lg transition-all duration-300 hover:bg-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          aria-label="Scroll to top"
        >
          <ChevronUpIcon className="h-6 w-6 text-zinc-100 dark:text-zinc-400" />
        </button>
      )}
    </>
  );
} 