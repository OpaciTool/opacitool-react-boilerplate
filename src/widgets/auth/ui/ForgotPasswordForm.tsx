import { Button, Field, Fieldset, Input, Label, Link } from "@/shared/ui";
import { firebaseAuth } from "@/shared/config/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";

export function ForgotPasswordForm() {
  const [resetPasswordStatus, setResetPasswordStatus] = useState<
    "idle" | "sending" | "sent"
  >("idle");

  async function onSubmit(event: React.FormEvent) {
    setResetPasswordStatus("sending");
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;

    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      toast.success("Password reset email sent.");
      setResetPasswordStatus("sent");
    } catch (error) {
      setResetPasswordStatus("idle");
      toast.error("Failed to send password reset email.");
    }
  }

  return (
    <form className="grid gap-6" onSubmit={onSubmit}>
      <Fieldset
        className="space-y-8"
        disabled={resetPasswordStatus === "sending"}
      >
        <Field>
          <Label>Email</Label>
          <Input name="email" />
        </Field>
      </Fieldset>
      <Button
        disabled={resetPasswordStatus !== "idle"}
        loading={resetPasswordStatus === "sending"}
        type="submit"
      >
        Send recovery email
      </Button>
      <p
        className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400"
        data-slot="text"
      >
        Remembered your password?{" "}
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
