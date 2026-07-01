import { supabase } from "../utils/supabase";


export async function searchUser(username) {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not logged in.");
    }

    const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select(`
            id,
            firstname,
            lastname,
            username,
            year,
            program
        `)
        .ilike("username", `%${username}%`)
        .neq("id", user.id);

    if (profileError) {
        throw profileError;
    }

    const { data: requests, error: requestError } = await supabase
        .from("friend_requests")
        .select("*")
        .or(
            `sender_id.eq.${user.id},receiver_id.eq.${user.id}`
        );

    if (requestError) {
        throw requestError;
    }

    const { data: friendships, error: friendshipError } = await supabase
        .from("friendships")
        .select("*")
        .eq("user_id", user.id);

    if (friendshipError) {
        throw friendshipError;
    }

    return profiles.map((profile) => {

        const friendship = friendships.find(
            (friendship) => friendship.friend_id === profile.id
        );

        const request = requests.find((request) =>

            (
                request.sender_id === user.id &&
                request.receiver_id === profile.id
            ) ||

            (
                request.receiver_id === user.id &&
                request.sender_id === profile.id
            )

        );

        return {

            ...profile,

            friendshipStatus: friendship
                ? "accepted"
                : request
                    ? request.status
                    : "none",

        };

    });

}

export async function sendFriendRequest(receiverId) {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not logged in.");
    }

    const { error } = await supabase
        .from("friend_requests")
        .insert({
            sender_id: user.id,
            receiver_id: receiverId,
            status: "pending",
        });

    if (error) {
        throw error;
    }
}

export async function getPendingFriendRequests() {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not logged in.");
    }

    const { data, error } = await supabase
        .from("friend_requests")
        .select(`
            request_id,
            sender_id,
            receiver_id,
            status,
            sender:profiles!friend_requests_sender_id_fkey(
                id,
                firstname,
                lastname,
                username,
                year,
                program
            )
        `)
        .eq("receiver_id", user.id)
        .eq("status", "pending");

    if (error) {
        throw error;
    }

    return data;
}


export async function acceptFriendRequest(request) {

    const { error: requestError } = await supabase
        .from("friend_requests")
        .update({
            status: "accepted",
        })
        .eq("request_id", request.request_id);

    if (requestError) {
        throw requestError;
    }

    const { error: friendshipError } = await supabase
        .from("friendships")
        .insert([
            {
                user_id: request.sender_id,
                friend_id: request.receiver_id,
            },

            {
                user_id: request.receiver_id,
                friend_id: request.sender_id,
            },
        ]);

    if (friendshipError) {
        throw friendshipError;
    }

}

export async function rejectFriendRequest(requestId) {

    const { error } = await supabase
        .from("friend_requests")
        .update({
            status: "rejected",
        })
        .eq("request_id", requestId);

    if (error) {
        throw error;
    }

}

export async function getFriends() {

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not logged in.");
    }

    const { data, error } = await supabase
        .from("friendships") 
        .select(`
            friend:profiles!friendships_friend_id_fkey(
                id,
                firstname,
                lastname,
                username,
                year,
                program
            )
        `)
        .eq("user_id", user.id);

        if (error) {
            throw error;
        }

        return data;
}


export async function getFriendSchedules() {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not logged in.");
    }

    const { data, error } = await supabase
        .from("friendships")
        .select(`
            friend:profiles!friendships_friend_id_fkey(
                id,
                firstname,
                lastname,
                username,
                year,
                program,
                schedules(
                    schedule_id,
                    subject,
                    room,
                    day,
                    start_time,
                    end_time,
                    color
                )
            )
        `)
        .eq("user_id", user.id)
        .eq("friend.schedules.is_archived", false);

    if (error) {
        throw error;
    }

    return data;
}