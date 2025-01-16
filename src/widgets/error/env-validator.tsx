import { ReactNode, useEffect } from "react";

// Helper function to check required environment variables
const checkEnvVars = (requiredEnvVars: string[]): void => {
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !import.meta.env[envVar],
  );

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing ENV variable: ${missingEnvVars.join(", ")}`);
  }
};

interface EnvValidatorProps {
  requiredEnvVars: string[];
  children: ReactNode;
}

function EnvValidator({ requiredEnvVars, children }: EnvValidatorProps) {
  useEffect(() => {
    checkEnvVars(requiredEnvVars);
  }, [requiredEnvVars]);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export { EnvValidator };
