import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "./useAuthState.hook";
import { axiosClient } from "@/shared/lib/axiosClient";

export type SubscriptionStatus =
  | "incomplete"
  | "incomplete_expired"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "paused";

type UserSubscription = {
  status: SubscriptionStatus;
  currentPeriodEnd: number;
};

export function useSubscriptionStatus() {
  const { user, accessToken } = useAuthState();

  const { data: subscription, isLoading } = useQuery<UserSubscription>({
    enabled:
      Boolean(!!user && !!accessToken) || process.env.NODE_ENV === "test",
    queryKey: ["subscription"],
    retry: false,
    queryFn: () =>
      axiosClient.get("/users/me/subscription").then((res) => res.data),
  });

  return { subscription, isLoading };
}
