import {
  Badge,
  Button,
  Divider,
  Heading,
  Skeleton,
  Subheading,
  Text,
} from "@/shared/ui";
import { useAuthState, useSubscriptionStatus } from "@/shared/hooks";
import { firebaseAuth } from "@/shared/config/firebaseConfig";
import clsx from "clsx";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

export function AccountSettingsPage() {
  const { auth } = useAuthState();
  const [verificationEmailStatus, setVerificationEmailStatus] = useState<
    "idle" | "sending" | "sent"
  >("idle");
  const [resetPasswordStatus, setResetPasswordStatus] = useState<
    "idle" | "sending" | "sent"
  >("idle");

  async function onSendVerificationEmail() {
    if (!auth) return;
    try {
      setVerificationEmailStatus("sending");
      await sendEmailVerification(auth, {
        url: `${window.location.href}/account`,
      });
      setVerificationEmailStatus("sent");
    } catch (error) {
      setVerificationEmailStatus("idle");
      console.error(error);
    }
  }

  async function onResetPassword() {
    if (!auth || !auth.email) return;
    try {
      await sendPasswordResetEmail(firebaseAuth, auth.email);
      toast.success("Password reset email sent.");
      setResetPasswordStatus("sent");
    } catch (error) {
      setResetPasswordStatus("idle");
      console.error(error);
      toast.error("Failed to send password reset email.");
    }
  }

  return (
    <motion.div
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -10,
      }}
      initial={{
        opacity: 0,
        x: -10,
      }}
    >
      <Heading>Account Settings</Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Email</Subheading>
          <Text>
            The email address is used for authentication, notifications and
            password recovery.
          </Text>
        </div>
        <div className="flex items-center space-x-2">
          {auth?.emailVerified ? (
            <Badge color="green">Verified</Badge>
          ) : (
            <Badge color="red">Not verified</Badge>
          )}
          <Text>{auth?.email}</Text>
        </div>
        <div className="col-span-2 flex justify-end">
          {auth?.emailVerified ? (
            <Button disabled outline>
              <span>Email verified</span>
            </Button>
          ) : (
            <Button
              disabled={verificationEmailStatus !== "idle"}
              outline
              onClick={onSendVerificationEmail}
            >
              <span>Verify email</span>
            </Button>
          )}
        </div>
      </section>
      <Divider className="my-10" soft />
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Reset password</Subheading>
        </div>
        <div>
          <Text>You will receive an email with instructions to reset.</Text>
        </div>
        <div className="col-span-2 flex justify-end">
          <Button
            disabled={resetPasswordStatus !== "idle"}
            outline
            onClick={onResetPassword}
          >
            <span>Reset password</span>
          </Button>
        </div>
      </section>
      <Divider className="my-10" soft />
      <SubscriptionStatusSection />
    </motion.div>
  );
}

function SubscriptionStatusSection() {
  const { subscription, isLoading } = useSubscriptionStatus();

  const textClassName = clsx(
    "text-sm",
    subscription?.status &&
      [
        "incomplete",
        "incomplete_expired",
        "past_due",
        "canceled",
        "unpaid",
      ].includes(subscription?.status) &&
      "text-red-600",
    subscription?.status &&
      ["paused"].includes(subscription?.status) &&
      "text-zinc-600",
    subscription?.status &&
      ["trialing", "active"].includes(subscription?.status) &&
      "text-green-600",
  );

  const message =
    subscription?.status &&
    ["trialing", "active"].includes(subscription?.status)
      ? "active"
      : subscription?.status === "paused"
        ? "paused"
        : "inactive";

  return (
    <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <div className="space-y-1">
        <Subheading>Subscription</Subheading>
        <Text>Manage your subscription, billing and payment information.</Text>
      </div>
      <div>
        {isLoading ? (
          <div className="flex flex-col space-y-4">
            <Skeleton data-testid="subscription-skeleton" />
            <Skeleton data-testid="subscription-skeleton" />
            <Skeleton
              className="ml-auto w-1/4"
              data-testid="subscription-skeleton"
            />
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            <Text className={textClassName}>
              Your subscription is{" "}
              <span className="font-semibold" data-testid="subscription-status">
                {message}
              </span>
              .
            </Text>
          </div>
        )}
      </div>
      <div className="col-span-2 flex justify-end">
        <Button outline>
          <span>Manage subscription</span>
        </Button>
      </div>
    </section>
  );
}
