import { Logo } from "@/shared/ui";
import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error }: FallbackProps) {
  return (
    <div className="grid min-h-full grid-cols-1 grid-rows-[1fr,auto,1fr] bg-white lg:grid-cols-[max(50%,36rem),1fr]">
      <header className="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
        <span className="sr-only">OpaciTool</span>
        <Logo className="w-48" />
      </header>
      <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
        <div className="flex max-w-lg flex-col">
          <p className="text-base font-semibold leading-8 text-red-600">
            Error
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Something went wrong
          </h1>
          <p className="mt-4 text-zinc-600">
            An error occurred while trying to render this page. Please try
            refreshing the page or contact support on{" "}
            <a className="text-blue-600" href="mailto:info@opacitool.com">
              info@opacitool.com
            </a>
          </p>
          <code className="mt-6">{error.toString()}</code>
        </div>
      </main>
      <div className="relative hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
        <img
          alt="A person inspecting factory equipment"
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/error-background.jpg"
        />
        <div className="absolute inset-0 bg-zinc-900 opacity-75" />
      </div>
    </div>
  );
}

function EnvErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}

export { EnvErrorBoundary };
