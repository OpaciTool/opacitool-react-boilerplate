/**
 * Checks if the given lecture is bookmarked
 * @param moduleSlug Current module slug
 * @param lectureSlug Current lecture slug
 * @returns boolean indicating if the lecture is bookmarked
 */
export const isLectureBookmarked = (moduleSlug?: string, lectureSlug?: string): boolean => {
  if (!moduleSlug || !lectureSlug) return false;
  
  const bookmarkedLecture = localStorage.getItem('lastVisitedLecture');
  return bookmarkedLecture === `/training/${moduleSlug}/${lectureSlug}`;
}; 