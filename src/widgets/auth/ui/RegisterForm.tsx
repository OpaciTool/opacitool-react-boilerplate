import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { z, ZodType } from "zod";

import { firebaseAuth } from "@/shared/config";
import { axiosClient, ERROR_CODES } from "@/shared/lib";
import { ApiError } from "@/shared/model";
import {
  Button,
  ErrorMessage,
  Field,
  Fieldset,
  Input,
  Label,
} from "@/shared/ui";

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterFormSchema: ZodType<RegisterForm> = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
  });

  async function onSubmit(data: RegisterForm) {
    const { email, password } = data;
    try {
      setIsLoading(true);
      await axiosClient.post("/auth", {
        email,
        password,
      });
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      navigate("/");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setIsLoading(false);
      if (isAxiosError<ApiError>(error)) {
        if (error?.response?.data?.code === ERROR_CODES.AUTH_EMAIL_EXISTS) {
          setError("email", {
            message: "An account with this email already exists",
          });
          return;
        }
        setError("email", { message: "An error occurred" });
      }
      return;
    }
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className="space-y-8">
        <Field>
          <Label>Email</Label>
          <Input invalid={!!errors.email} {...register("email")} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Field>
        <Field>
          <Label>Password</Label>
          <Input
            autoComplete="none"
            invalid={!!errors.password}
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </Field>
        <Field>
          <Label>Confirm password</Label>
          <Input
            autoComplete="none"
            invalid={!!errors.confirmPassword}
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </Field>
      </Fieldset>
      <Button loading={isLoading} type="submit">
        Register
      </Button>
      <p
        className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400"
        data-slot="text"
      >
        Already have an account?{" "}
        <Link
          className="font-semibold text-zinc-950 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
          to="/login"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
