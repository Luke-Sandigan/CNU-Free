import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import LoadingModal from "../components/LoadingModal";

function AuthCallback() {

    const navigate = useNavigate();

    useEffect(() => {

        const handleUser = async (session) => {

            if (!session) {
                navigate("/SignInPage");
                return;
            }

            const user = session.user;

            const {
                data: profile,
                error: profileError
                } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .maybeSingle();

            if (profileError) {
                console.error(profileError);
                navigate("/SignInPage");
                return;
            }

            if (!profile?.onboarding_complete) {
                navigate("/Onboarding");
            } else {
                navigate("/Home");
            }
        };

        // Listen for auth events
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (session) {
                    await handleUser(session);
                }
            }
        );

        // Also check if session already exists
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                handleUser(data.session);
            }
        });

        return () => { subscription.unsubscribe(); };

    }, [navigate]);

    return <LoadingModal open={true} />;
}

export default AuthCallback;