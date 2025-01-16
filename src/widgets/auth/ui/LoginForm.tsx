import { Button, Field, Fieldset, Input, Label, Link } from "@/shared/ui";

import { firebaseAuth } from "@/shared/config/firebaseConfig";
import { ERROR_CODES } from "@/shared/lib";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useNavigate();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const res = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      if (!res?.user) {
        throw new Error("User not found");
      }
      router("/");
    } catch (error) {
      setLoading(false);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case ERROR_CODES.AUTH_INVALID_CREDENTIALS:
            toast.error("An error occurred. Please try again.");
            setError("Invalid credentials, please try again.");
            break;
          case ERROR_CODES.AUTH_TOO_MANY_REQUESTS:
            toast.error("An error occurred. Please try again.");
            setError(
              "Too many requests. Please try again later or reset your password.",
            );
            break;
          default:
            toast.error("An error occurred. Please try again.");
            setError("An error occurred. Please try again.");
            break;
        }
      }
    }
  }

  return (
    <form className="grid gap-6" onSubmit={onSubmit}>
      <Fieldset className="space-y-8" disabled={loading}>
        <Field>
          <Label>Email</Label>
          <Input autoComplete="email" name="email" />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input
            autoComplete="current-password"
            name="password"
            type="password"
          />
        </Field>
      </Fieldset>
      <Link
        className="ml-auto text-base/6 font-semibold text-zinc-950 hover:text-zinc-700 sm:text-sm/6 dark:text-white dark:hover:text-zinc-300"
        to="/forgot-password"
      >
        Forgot password?
      </Link>
      <Button loading={loading} type="submit">
        Sign in
      </Button>
      {error && (
        <p className="text-base/6 text-red-600 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-red-500">
          {error}
        </p>
      )}

      <p
        className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400"
        data-slot="text"
      >
        Don&apos;t have an account?{" "}
        <Link
          className="font-semibold text-zinc-950 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
          to="/register"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
