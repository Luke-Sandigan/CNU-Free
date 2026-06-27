import { supabase } from "../utils/supabase";


export async function updateProfile(profileData) {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not found.");
    }

    const { error } = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", user.id);

    if (error) {
        throw error;
    }
}


export async function getCurrentProfile() {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not found.");
    }

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        throw error;
    }

    return data;
}