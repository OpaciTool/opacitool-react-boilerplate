import { navigationData } from "@/features/training/data/navigation";

/**
 * Returns the ID of the module that should be expanded in the training sidebar
 * If there's a bookmarked lecture, returns its module ID
 * Otherwise returns the first module's ID (1)
 */
export const getExpandedModuleId = () => {
  const bookmarkedLecture = localStorage.getItem('lastVisitedLecture');
  if (!bookmarkedLecture) return 1;

  const moduleWithBookmark = navigationData.find(module => 
    module.lectures.some(lecture => 
      `/training/${module.slug}/${lecture.slug}` === bookmarkedLecture
    )
  );

  return moduleWithBookmark?.id || 1;
}; 