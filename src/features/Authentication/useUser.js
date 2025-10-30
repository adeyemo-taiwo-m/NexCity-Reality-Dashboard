import { useState, useEffect } from "react";
import supabase from "../../services/supabase";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setIsPending(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        setIsPending(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return {
    user,
    userData: user?.user_metadata,
    isAuthenticated: Boolean(user),
    isPending,
  };
}
