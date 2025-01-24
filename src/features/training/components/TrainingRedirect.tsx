import { Navigate } from "react-router-dom";

export function TrainingRedirect() {
  const bookmarkedLecture = localStorage.getItem('lastVisitedLecture');
  return (
    <Navigate 
      to={bookmarkedLecture || "/training/introduction/about-course"} 
      replace 
    />
  );
} 