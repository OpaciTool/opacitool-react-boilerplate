import { Module, navigationData } from "@/features/training/data/navigation";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@/shared/ui";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronDownIcon, ArrowLeftIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import clsx from "clsx";
import { getExpandedModuleId } from "@/helpers/getExpandedModuleId.helper";
import { Link } from "react-router-dom";

interface TrainingSidebarProps {
  onClose?: () => void;
  onLectureSelect?: () => void;
}

export function TrainingSidebar({ onClose, onLectureSelect }: TrainingSidebarProps) {
  const { lectureSlug } = useParams();

  // Initialize expanded modules state
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>(() => ({
    [getExpandedModuleId()]: true
  }));

  // Toggle module expansion
  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  return (
    <Sidebar className="border-r border-zinc-950/5 dark:border-white/5 h-full lg:h-screen">
      <SidebarHeader>
        {/* Close button - mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-2  text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 lg:hidden"
          >
            <XMarkIcon className="size-7" />
          </button>
        )}

        {/* Logo Section */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-[95%] lg:w-full">
            <img 
              src="/images/logo.png" 
              alt="OpaciTool Logo" 
              className="w-full"
            />
          </div>
        </div>

        {/* Dashboard Link */}
        <Link 
          to="/"
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-1"
        >
          <ArrowLeftIcon className="size-5" />
          <span className="font-medium">Back to Homepage</span>
        </Link>

      </SidebarHeader>

      <SidebarBody className="[&>[data-slot=section]+[data-slot=section]]:mt-4">
        {navigationData.map((module: Module) => (
          <SidebarSection key={module.id}>
            <button 
              onClick={() => toggleModule(module.id)}
              className="flex w-full items-center justify-between px-2 py-2 hover:bg-zinc-950/5 dark:hover:bg-white/5 rounded-lg"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-400 text-sm font-medium text-zinc-900 dark:bg-teal-400 dark:text-zinc-900">
                  {module.id}
                </div>
                <SidebarLabel className="text-sm font-semibold truncate text-zinc-900 dark:text-zinc-100">
                  {module.title}
                </SidebarLabel>
              </div>
              <ChevronDownIcon 
                className={clsx(
                  "size-5 text-zinc-500 transition-transform duration-200 shrink-0 ml-2",
                  expandedModules[module.id] ? "rotate-180" : ""
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
                    to={`/training/${module.slug}/${lecture.slug}`}
                    className="relative py-1"
                    onClick={() => onLectureSelect?.()}
                  >
                    <SidebarLabel className={clsx(
                      "text-sm transition-colors",
                      lectureSlug === lecture.slug
                        ? "text-orange-600 dark:text-white font-medium"
                        : "text-zinc-600 dark:text-zinc-400"
                    )}>
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