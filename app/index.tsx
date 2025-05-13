import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function IndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    // attendre la prochaine frame pour s'assurer que le layout est monté
    const timeout = requestAnimationFrame(() => {
      router.replace("/SearchSetScreen");
    });

    return () => cancelAnimationFrame(timeout);
  }, []);

  return null;
}
