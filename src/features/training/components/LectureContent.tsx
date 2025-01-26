import { useParams } from "react-router-dom";
import { navigationData } from "@/features/training/data/navigation";
import { Divider, Heading, Text } from "@/shared/ui";
import { BookmarkIcon as BookmarkOutlineIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkFilledIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { Tooltip } from "@/shared/ui";
import { useState, useEffect } from "react";

export function LectureContent() {
  const { moduleSlug, lectureSlug } = useParams();
  const lecturePath = `/training/${moduleSlug}/${lectureSlug}`;
  
  const [isBookmarked, setIsBookmarked] = useState(() => 
    localStorage.getItem('lastVisitedLecture') === lecturePath
  );

  // Update bookmark state when route changes
  useEffect(() => {
    setIsBookmarked(localStorage.getItem('lastVisitedLecture') === lecturePath);
  }, [moduleSlug, lectureSlug, lecturePath]);

  const handleBookmark = () => {
    if (isBookmarked) {
      localStorage.removeItem('lastVisitedLecture');
      setIsBookmarked(false);
      toast.success('Bookmark removed');
    } else {
      localStorage.setItem('lastVisitedLecture', lecturePath);
      setIsBookmarked(true);
      toast.success('Lecture bookmarked');
    }
  };

  // Find current module by moduleSlug
  const currentModule = navigationData.find(
    (module) => module.slug === moduleSlug
  );

  // Find current lecture in the module
  const currentLecture = currentModule?.lectures.find(
    (lecture) => lecture.slug === lectureSlug
  );

  if (!currentModule || !currentLecture) {
    return (
      <div className="p-6">
        <Text>Lecture not found</Text>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="lg:flex justify-between items-center">
        <div className="space-y-1">
          <Text className="text-sm text-zinc-500">{currentModule.title}</Text>
          <Heading>{currentLecture.title}</Heading>
        </div>
        <Tooltip content="Bookmark this lecture">
          <button
            onClick={handleBookmark}
            className="flex items-center gap-2 lg:px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? (
              <>
                <BookmarkFilledIcon className="size-5 text-teal-400" />
                <span className="text-sm font-medium text-teal-400">Bookmarked</span>
              </>
            ) : (
              <>
                <BookmarkOutlineIcon className="size-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" />
                <span className="text-sm font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">Bookmark</span>
              </>
            )}
          </button>
        </Tooltip>
      </div>
      <Divider className="mt-6" />
      
      {/* Placeholder for lecture content */}
      <div className="mt-6">
        <Text>Content for {currentLecture.title} will be displayed here.</Text>
      </div>
    </div>
  );
} 