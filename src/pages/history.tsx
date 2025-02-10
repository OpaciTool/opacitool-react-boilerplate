import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { Tooltip } from "@/shared/ui";
import { BookmarkIcon as BookmarkOutlineIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkFilledIcon } from "@heroicons/react/24/solid";
import { TrainingSidebar } from "@/features/training/components/TrainingSidebar";
import { SectionDivider } from "@/features/training/components/SectionDivider";
import Timeline from "@/features/training/components/TimelineEvent";
import { LectureNavigation } from "@/features/training/components/LectureNavigation";
import { ScrollToTop } from "@/shared/components/ScrollToTop";
import QuestionMarkTooltip from "@/features/training/components/QuestionMarkTooltip";

export function History() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  console.log("location", pathname);

  const [isBookmarked, setIsBookmarked] = useState(
    () => localStorage.getItem("lastVisitedLecture") === pathname,
  );

  // Update bookmark state when route changes
  useEffect(() => {
    setIsBookmarked(localStorage.getItem("lastVisitedLecture") === pathname);
  }, [pathname]);

  // Add this useEffect to scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Dependencies ensure this runs on route change

  const handleBookmark = () => {
    if (isBookmarked) {
      localStorage.removeItem("lastVisitedLecture");
      setIsBookmarked(false);
      toast.success("Bookmark removed");
    } else {
      localStorage.setItem("lastVisitedLecture", pathname);
      setIsBookmarked(true);
      toast.success("Lecture bookmarked");
    }
  };

  // if (!currentModule || !currentLecture) {
  //   return (
  //     <div className="p-6">
  //       <Text>Lecture not found</Text>
  //     </div>
  //   );
  // }

  return (
    <div className="flex min-h-svh flex-col dark:bg-zinc-900 lg:flex-row">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-4 left-4 z-30 rounded-full bg-white p-3 shadow-lg dark:bg-zinc-800 lg:hidden"
      >
        <Bars3Icon className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
      </button>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-950/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

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
            <h3 className="text-2xl text-zinc-300">Module 8</h3>
            <h2 className="text-4xl font-bold text-white dark:text-white">
              History of Visible Emissions Observations
            </h2>
          </div>
          <div>
            <QuestionMarkTooltip />

            <Tooltip content="Bookmark this lecture">
              <button
                onClick={handleBookmark}
                className="flex items-center gap-2 rounded-lg pt-1 transition-colors hover:text-white dark:hover:bg-zinc-800"
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                {isBookmarked ? (
                  <>
                    <BookmarkFilledIcon className="size-10 text-teal-400" />
                    <span className="text-lg font-medium text-teal-400">
                      Bookmarked
                    </span>
                  </>
                ) : (
                  <>
                    <BookmarkOutlineIcon className="group size-10 text-zinc-400 hover:text-white dark:hover:text-zinc-300" />
                    <span className="text-lg font-medium text-zinc-200 hover:text-white dark:hover:text-zinc-300">
                      Bookmark
                    </span>
                  </>
                )}
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <div className="bg-[#E4EAED] px-4 py-8 lg:px-14">
            <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
              A Brief History of Air Pollution & The Need to Monitor Visible
              Emissions
            </h1>
            <div className="dark:prose-invert text-lg text-zinc-900">
              <p>
                Air pollution, often thought of as a modern issue, has been a
                concern since ancient times. During the Roman Empire, large
                cities experienced "graioris caeli," or "heavy heaven," the term
                used to describe smog-like conditions.
              </p>
              <p className="my-6">
                As history progressed, expanding cities, evolving agricultural
                practices, and industrialization transformed air pollution from
                a minor inconvenience to a significant nuisance and, ultimately,
                a public health crisis.
              </p>
              <p>
                In response, the Environmental Protection Agency (EPA) was
                established, and the visible emission observation methods we’ve
                discussed—such as EPA Method 9 and Method 22—were developed to
                help monitor and reduce emissions. Below is a brief timeline
                highlighting key events that led to the creation of these
                methods.
              </p>
            </div>
          </div>
          <SectionDivider className="h-1 bg-orange-500" />
          <Timeline />
          {/* Add the navigation component */}
          <LectureNavigation />
          <ScrollToTop />
        </div>
      </div>
    </div>
  );
}
