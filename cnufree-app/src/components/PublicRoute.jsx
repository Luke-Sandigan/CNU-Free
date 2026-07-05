import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import LoadingModal from "./LoadingModal";

function PublicRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setLoading(false);
        return;
      }

      setAuthenticated(true);

      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_complete")
        .eq("id", session.user.id)
        .single();

      setOnboardingComplete(profile?.onboarding_complete ?? false);

      setLoading(false);
    }

    checkUser();
  }, []);

  if (loading) {
    return <LoadingModal open={true} />;
  }

  if (authenticated) {
    return (
      <Navigate
        to={onboardingComplete ? "/Home" : "/Onboarding"}
        replace
      />
    );
  }

  return children;
}

export default PublicRoute;