import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

const useSessionValidation = (fallbackRoute = "/profissional/login") => {
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading && !session) {
      signIn("credentials", { callbackUrl: fallbackRoute });
    }
  }, [session, loading, fallbackRoute]);
};

export { useSessionValidation };
