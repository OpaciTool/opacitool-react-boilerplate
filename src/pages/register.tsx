import { Heading, Logo } from "@/shared/ui";
import { RegisterForm } from "@/widgets/auth/ui";
import { motion } from "framer-motion";

export function RegisterPage() {
  return (
    <motion.div
      animate={{
        opacity: 1,
        transition: { duration: 0.2, ease: "easeInOut" },
        y: 0,
      }}
      className="h-full bg-white"
      exit={{
        opacity: 0,
        transition: { duration: 0.2, ease: "easeInOut" },
        y: 12,
      }}
      initial={{
        opacity: 0,
        y: 12,
      }}
    >
      <div className="flex min-h-full flex-1">
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt="Background"
            className="absolute inset-0 h-full w-full object-cover"
            src="/images/abstract-background-2.jpg"
          />
          <div className="absolute inset-0 bg-zinc-900 opacity-75" />
        </div>
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:w-1/2">
          <div className="mx-auto -mt-8 w-full max-w-sm lg:w-96">
            <Logo className="w-48" />
            <Heading className="mt-8 text-2xl font-bold leading-9 tracking-tight text-zinc-900">
              Create an account
            </Heading>
            <div className="mt-10">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
