import { useQuery } from "@tanstack/react-query";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { firebaseAuth } from "@/shared/config";
import { axiosClient } from "@/shared/lib";
import { User } from "@/shared/model";

export function useAuthState() {
  const [auth, setAuth] = useState<FirebaseUser | null>();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const {
    isError,
    isPending,
    data: user,
  } = useQuery<User>({
    enabled: !!auth && !!accessToken,
    queryKey: ["user", auth?.uid],
    queryFn: () =>
      axiosClient
        .get("/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setAuth(user);
        user.getIdToken().then((token) => {
          setAccessToken(token);
          axiosClient.defaults.headers.common["Authorization"] =
            `Bearer ${token}`;
        });
      } else {
        setAuth(null);
        setAccessToken(null);
        axiosClient.defaults.headers.common["Authorization"] = "";
      }
    });
    return unsubscribe;
  }, []);

  return { accessToken, auth, user, isPending, isError };
}
