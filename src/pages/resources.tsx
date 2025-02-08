import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { Tooltip } from "@/shared/ui";
import { BookmarkIcon as BookmarkOutlineIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkFilledIcon } from "@heroicons/react/24/solid";
import { TrainingSidebar } from "@/features/training/components/TrainingSidebar";
import ResourcesList from "@/features/training/components/ResourcesList";

export function Resources() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const [isBookmarked, setIsBookmarked] = useState(
    () => localStorage.getItem("lastVisitedLecture") === pathname,
  );

  // Update bookmark state when route changes
  useEffect(() => {
    setIsBookmarked(localStorage.getItem("lastVisitedLecture") === pathname);
  }, [pathname]);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleBookmark = () => {
    if (isBookmarked) {
      localStorage.removeItem("lastVisitedLecture");
      setIsBookmarked(false);
      toast.success("Bookmark removed");
    } else {
      localStorage.setItem("lastVisitedLecture", pathname);
      setIsBookmarked(true);
      toast.success("Page bookmarked");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-zinc-900 p-2 text-white lg:hidden"
      >
        <Bars3Icon className="size-6" />
      </button>

      {/* Sidebar */}
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full transform border-r border-zinc-950/5 bg-white transition-transform duration-300 ease-in-out dark:border-white/5 dark:bg-zinc-900 sm:w-auto lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        <TrainingSidebar
          onClose={() => setIsSidebarOpen(false)}
          onLectureSelect={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="items-center justify-between bg-zinc-900 px-4 py-8 lg:flex lg:px-14">
          <div className="space-y-1">
            <h3 className="text-2xl text-zinc-300">Module 10</h3>
            <h2 className="text-4xl font-bold text-white dark:text-white">
              Resources & Downloads
            </h2>
          </div>
          <Tooltip content="Bookmark this lecture">
            <button
              onClick={handleBookmark}
              className="flex items-center gap-2 rounded-lg py-2 transition-colors hover:text-white dark:hover:bg-zinc-800 lg:px-3"
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              {isBookmarked ? (
                <>
                  <BookmarkFilledIcon className="size-14 text-teal-400" />
                  <span className="text-xl font-medium text-teal-400">
                    Bookmarked
                  </span>
                </>
              ) : (
                <>
                  <BookmarkOutlineIcon className="group size-14 text-zinc-400 hover:text-white dark:hover:text-zinc-300" />
                  <span className="text-xl font-medium text-zinc-200 hover:text-white dark:hover:text-zinc-300">
                    Bookmark
                  </span>
                </>
              )}
            </button>
          </Tooltip>
        </div>
        <ResourcesList />
      </div>
    </div>
  );
}
