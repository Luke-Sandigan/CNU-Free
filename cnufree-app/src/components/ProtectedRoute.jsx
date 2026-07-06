import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import LoadingModal from "./LoadingModal";

function ProtectedRoute({ children }) {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session) {
        setSession(null);
        setOnboardingComplete(false);
        setLoading(false);
        return;
      }

      setSession(session);

      const { data, error } = await supabase
        .from("profiles")
        .select("onboarding_complete")
        .eq("id", session.user.id)
        .single();

      if (!mounted) return;

      if (error) {
        console.error(error);
        setOnboardingComplete(false);
      } else {
        setOnboardingComplete(data?.onboarding_complete ?? false);
      }

      setLoading(false);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [location.pathname]);

  if (loading) {
    return <LoadingModal open={true} />;
  }

  if (!session) {
    return <Navigate to="/SignInPage" replace />;
  }

  if (!onboardingComplete && location.pathname !== "/Onboarding") {
    return <Navigate to="/Onboarding" replace />;
  }

  if (onboardingComplete && location.pathname === "/Onboarding") {
    return <Navigate to="/Home" replace />;
  }

  return children;
}

export default ProtectedRoute;