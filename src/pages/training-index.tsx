import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { navigationData } from "@/features/training/data/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { TrainingIndexSidebar } from "@/features/training-index/components/TrainingIndexSidebar";
import { Lecture } from "@/features/training-index/components/Lecture";

export function TrainingIndexPage() {
  const navigate = useNavigate();
  const { moduleSlug, lectureSlug } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Redirect to first lecture if no specific lecture is selected
  useEffect(() => {
    if (!moduleSlug && !lectureSlug) {
      navigate(`/training/introduction/${navigationData[0].lectures[0].slug}`);
    }
  }, [moduleSlug, lectureSlug, navigate]);

  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
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
      <div className={`
        fixed inset-y-0 left-0  z-50 w-full sm:w-auto bg-white dark:bg-zinc-900
        transform transition-transform duration-300 ease-in-out
        border-r border-zinc-950/5 dark:border-white/5
        lg:translate-x-0 lg:h-screen lg:sticky lg:top-0 lg:w-[25%] xl:w-auto
        overflow-y-auto
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-zinc-300
        [&::-webkit-scrollbar-thumb]:rounded-full
        dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700
        hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400
        dark:hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600
        scrollbar-thin
        scrollbar-track-transparent
        scrollbar-thumb-zinc-300
        dark:scrollbar-thumb-zinc-700
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <TrainingIndexSidebar
          onClose={() => setIsSidebarOpen(false)}
          onLectureSelect={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Lecture />
      </div>
    </div>
  );
}
