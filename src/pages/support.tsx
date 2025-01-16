import { Heading, Text } from "@/shared/ui";
import { SupportForm } from "@/features/support";
import { BoltIcon, FaceSmileIcon, StarIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

export function SupportPage() {
  return (
    <motion.div
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="relative isolate h-full w-full"
      exit={{
        opacity: 0,
        x: -10,
      }}
      initial={{
        opacity: 0,
        x: -10,
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-zinc-50 ring-1 ring-zinc-900/10 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full stroke-zinc-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    height={200}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    patternUnits="userSpaceOnUse"
                    width={200}
                    x="100%"
                    y={-1}
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect fill="white" height="100%" strokeWidth={0} width="100%" />
                <svg className="overflow-visible fill-zinc-50" x="100%" y={-1}>
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  height="100%"
                  strokeWidth={0}
                  width="100%"
                />
              </svg>
            </div>
            <div className="space-y-6">
              <Heading>Get in touch</Heading>
              <div className="space-y-3">
                <p className="text-lg leading-8 text-zinc-600">
                  If you have a question about OpaciTool or visible emissions
                  observations, let us help.
                </p>
                <p className="text-lg leading-8 text-zinc-600">
                  Our team has over 40 years of experience performing visible
                  emissions observations including Method 9, Method 22 and
                  Method 203a-c.
                </p>
              </div>
              <Heading>What you&apos;ll get:</Heading>
            </div>
            <dl className="mt-10 space-y-4 text-base leading-7 text-zinc-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <BoltIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-brand-orange-500"
                  />
                </dt>
                <dd>
                  <Text>Quick Response - Usually less than 12 hours</Text>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <FaceSmileIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-brand-orange-500"
                  />
                </dt>
                <dd>
                  <Text>Friendly, US-Based Team</Text>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <StarIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-brand-orange-500"
                  />
                </dt>
                <dd>
                  <Text>Thorough and accurate answers</Text>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <SupportForm />
      </div>
    </motion.div>
  );
}
