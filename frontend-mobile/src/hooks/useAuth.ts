import { useEffect } from "react";
import { getUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export const useAuth = () => {
  const setUser = useAuthStore((s) => s.login);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (err) {
        // setUser(null);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);
};