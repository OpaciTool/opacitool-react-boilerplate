import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { navigationData } from "../data/navigation";


export function LectureNavigation() {
  const { moduleSlug, lectureSlug } = useParams();
  const navigate = useNavigate();


  // Regular lecture navigation logic
  const currentModule = navigationData.find((m) => m.slug === moduleSlug);
  const currentLectureIndex = currentModule?.lectures.findIndex(
    (l) => l.slug === lectureSlug,
  );

  if (!currentModule || currentLectureIndex === undefined) return null;

  const currentModuleIndex = navigationData.findIndex(
    (m) => m.slug === moduleSlug,
  );
  const isFirstLecture = currentModuleIndex === 0 && currentLectureIndex === 0;
  const isLastModuleQuiz =
    moduleSlug === "module-7" && lectureSlug === "module-7-quiz";

  let prevLecture = null;
  let nextLecture = null;

  // Calculate previous lecture
  if (!isFirstLecture) {
    if (currentLectureIndex > 0) {
      prevLecture = {
        moduleTitle: currentModule.title,
        moduleSlug: currentModule.slug,
        lectureTitle: currentModule.lectures[currentLectureIndex - 1].title,
        lectureSlug: currentModule.lectures[currentLectureIndex - 1].slug,
      };
    } else {
      const prevModule = navigationData[currentModuleIndex - 1];
      if (prevModule) {
        prevLecture = {
          moduleTitle: prevModule.title,
          moduleSlug: prevModule.slug,
          lectureTitle: prevModule.lectures[prevModule.lectures.length - 1].title,
          lectureSlug: prevModule.lectures[prevModule.lectures.length - 1].slug,
        };
      }
    }
  }

  // Calculate next lecture
  if (!isLastModuleQuiz) {
    if (currentLectureIndex < currentModule.lectures.length - 1) {
      nextLecture = {
        moduleTitle: currentModule.title,
        moduleSlug: currentModule.slug,
        lectureTitle: currentModule.lectures[currentLectureIndex + 1].title,
        lectureSlug: currentModule.lectures[currentLectureIndex + 1].slug,
      };
    } else {
      const nextModule = navigationData[currentModuleIndex + 1];
      if (nextModule) {
        nextLecture = {
          moduleTitle: nextModule.title,
          moduleSlug: nextModule.slug,
          lectureTitle: nextModule.lectures[0].title,
          lectureSlug: nextModule.lectures[0].slug,
        };
      }
    }
  }

  return (
    <div className="lg:h-40 bg-black ">
      <div className="mx-auto h-full max-w-7xl">
        <div className="flex h-full items-center justify-between px-4 py-6">
          {/* Previous Module */}
          {prevLecture && (
            <div
              className="group flex cursor-pointer flex-col items-center space-x-2"
              onClick={() =>
                navigate(
                  `/training/${prevLecture.moduleSlug}/${prevLecture.lectureSlug}`,
                )
              }
            >
              <div className="flex transition-transform duration-300 ease-in-out group-hover:-translate-x-2">
                <ChevronLeftIcon className="h-8 w-8 text-[#40E0D0] transition-colors duration-300 group-hover:text-[#20B2AA]" />
                <ChevronLeftIcon className="h-8 w-8 text-[#80E0D0] transition-colors duration-300 group-hover:text-[#40E0D0]" />
                <ChevronLeftIcon className="h-8 w-8 text-white transition-colors duration-300 group-hover:text-[#80E0D0]" />
              </div>
              <div className="text-center">
                <div className="text-lg lg:text-2xl font-bold text-white dark:text-zinc-300">{prevLecture.moduleTitle}</div>
                <div className="text-lg lg:text-2xl text-white  dark:text-zinc-400">{prevLecture.lectureTitle}</div>
              </div>
            </div>
          )}

          {/* Next Module */}
          {nextLecture && (
            <div
              className="group flex cursor-pointer flex-col items-center space-x-2"
              onClick={() =>
                navigate(
                  `/training/${nextLecture.moduleSlug}/${nextLecture.lectureSlug}`,
                )
              }
            >
              <div className="flex transition-transform duration-300 ease-in-out group-hover:translate-x-2">
                <ChevronRightIcon className="h-8 w-8 text-white transition-colors duration-300 group-hover:text-[#80E0D0]" />
                <ChevronRightIcon className="h-8 w-8 text-[#80E0D0] transition-colors duration-300 group-hover:text-[#40E0D0]" />
                <ChevronRightIcon className="h-8 w-8 text-[#40E0D0] transition-colors duration-300 group-hover:text-[#20B2AA]" />
              </div>
              <div className="text-center">
                <div className="text-lg lg:text-2xl font-bold text-white dark:text-zinc-300">{nextLecture.moduleTitle}</div>
                <div className="text-lg lg:text-2xl text-white dark:text-zinc-400">{nextLecture.lectureTitle}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
