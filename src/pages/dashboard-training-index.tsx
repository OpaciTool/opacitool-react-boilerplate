import { getLectureMediaUrl } from "@/features/training/lib/getLectureMedia";
import { Card, Divider, Heading } from "@/shared/ui";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export function DashboardTrainingIndex() {
  return (
    <motion.div
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="row-auto grid grid-cols-1 grid-rows-none gap-8 lg:grid-cols-2 lg:grid-rows-3 xl:grid-cols-5 xl:grid-rows-3"
      exit={{
        opacity: 0,
        x: -10,
      }}
      initial={{
        opacity: 0,
        x: -10,
      }}
    >
      <RecentObservationsPanel />

    </motion.div>
  );
}

function RecentObservationsPanel() {
  return (
    <Card className="lg:col-span-2 lg:row-span-2 xl:col-span-12 xl:row-span-1">
      <Heading>OpaciTool Training Index</Heading>
      <Divider className="mt-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <Link to="/training-index/basics/overview-and-settings" className="col-span-1 border-2 border-red-500 rounded-lg p-4 cursor-pointer hover:scale-105 transition-all duration-300">
          <img  src={getLectureMediaUrl('training-index/1.png') || "/placeholder.svg"}alt="" />
          <p className="mt-4 text-center text-lg font-semibold dark:text-white">OpaciTool App - Overview & Settings</p>
        </Link>
        <Link to="/training-index/reference-mode-tutorial/reference-mode-using-the-app" className="col-span-1 border-2 border-red-500 rounded-lg p-4 cursor-pointer hover:scale-105 transition-all duration-300">
          <img  src={getLectureMediaUrl('training-index/2.png') || "/placeholder.svg"}alt="" />
          <p className="mt-4 text-center text-lg font-semibold dark:text-white">Reference Mode Tutorial</p>
        </Link>
        <Link to="training-index/test-mode-tutorial/test-mode-using-the-app" className="col-span-1 border-2 border-red-500 rounded-lg p-4 cursor-pointer hover:scale-105 transition-all duration-300">
          <img  src={getLectureMediaUrl('training-index/3.png') || "/placeholder.svg"}alt="" />
          <p className="mt-4 text-center text-lg font-semibold dark:text-white">Test Mode Tutorial</p>
        </Link>

      </div>
    </Card>
  );
}


