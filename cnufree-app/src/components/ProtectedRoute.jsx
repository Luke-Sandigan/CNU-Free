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
    async function checkUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setSession(null);
        setLoading(false);
        return;
      }

      setSession(session);

      const { data, error } = await supabase
        .from("profiles")
        .select("onboarding_complete")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error(error);
      }

      setOnboardingComplete(data?.onboarding_complete ?? false);

      setLoading(false);
    }

    checkUser();
  }, []);

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
