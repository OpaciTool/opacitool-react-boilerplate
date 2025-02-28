import { Module } from "@/features/training-index/data/navigation-index-data";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@/shared/ui";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChevronDownIcon,
  ArrowLeftIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { navigationIndexData } from "../data/navigation-index-data";

interface TrainingSidebarProps {
  onClose?: () => void;
  onLectureSelect?: () => void;
}

export function TrainingIndexSidebar({
  onClose,
  onLectureSelect,
}: TrainingSidebarProps) {
  const { lectureSlug } = useParams();

  // Find active module based on current lecture
  const activeModule = navigationIndexData.find((module) =>
    module.lectures.some((lecture) => lecture.slug === lectureSlug)
  );

  // Initialize expanded modules state
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>(
    {}
  );

  // Update expanded modules when active module changes
  useEffect(() => {
    if (activeModule) {
      setExpandedModules((prev) => ({
        ...prev,
        [activeModule.id]: true,
      }));
    }
  }, [activeModule?.id]);

  // Toggle module expansion
  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <Sidebar className="h-full pb-6 border-r border-zinc-950/5 bg-zinc-900 dark:bg-black dark:border-white/5 lg:h-screen">
      <SidebarHeader>
        {/* Close button - mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="absolute right-2 top-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 lg:hidden"
          >
            <XMarkIcon className="size-7" />
          </button>
        )}

        {/* Logo Section */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <img
            src="/images/Logo.svg"
            alt="OpaciTool Logo"
            className="w-full max-w-[400px]"
          />
        </div>

        {/* Dashboard Link */}
        <Link
          to="/"
          className="mb-1 flex items-center gap-2 text-zinc-600 transition-colors hover:text-zinc-300 dark:text-zinc-400 dark:hover:text-white"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400">
            <ArrowLeftIcon className="size-5 text-black" />
          </div>
          <span className="font-medium text-white dark:text-zinc-300">
            Training Index
          </span>
        </Link>
      </SidebarHeader>

      <SidebarBody className="[&>[data-slot=section]+[data-slot=section]]:mt-4">
        {navigationIndexData.map((module: Module) => (
          <SidebarSection key={module.id}>
            <button
              onClick={() => toggleModule(module.id)}
              className="flex w-full items-center justify-between border-b border-zinc-100/20 px-2 py-2 hover:bg-zinc-950/5 dark:hover:bg-white/5"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-400 text-sm font-medium text-zinc-900 dark:bg-teal-400 dark:text-zinc-900">
                  {module.id}
                </div>
                <SidebarLabel className="truncate text-sm font-semibold text-white dark:text-zinc-300">
                  {module.title}
                </SidebarLabel>
              </div>
              <ChevronDownIcon
                className={clsx(
                  "ml-2 size-5 shrink-0 text-white transition-transform duration-200",
                  expandedModules[module.id] ? "rotate-180" : "",
                )}
              />
            </button>

            {expandedModules[module.id] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative pl-9 before:absolute before:left-[1.25rem] before:top-0 before:h-full before:w-px before:bg-zinc-200 dark:before:bg-zinc-800"
              >
                {module.lectures.map((lecture) => (
                  <SidebarItem
                    key={lecture.slug}
                    current={lectureSlug === lecture.slug}
                    to={`/training-index/${module.slug}/${lecture.slug}`}
                    className="relative py-1"
                    onClick={() => onLectureSelect?.()}
                  >
                    <SidebarLabel
                      className={clsx(
                        "text-sm transition-colors",
                        lectureSlug === lecture.slug
                          ? "font-medium text-teal-400 dark:text-white"
                          : "text-zinc-200 dark:text-zinc-400",
                      )}
                    >
                      {lecture.title}
                    </SidebarLabel>
                  </SidebarItem>
                ))}
              </motion.div>
            )}
          </SidebarSection>
        ))}
      </SidebarBody>
    </Sidebar>
  );
}
