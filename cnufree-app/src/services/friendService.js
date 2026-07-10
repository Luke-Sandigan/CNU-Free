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
    .select(
      `
            id,
            firstname,
            lastname,
            username,
            year,
            program
        `,
    )
    .ilike("username", `%${username}%`)
    .neq("id", user.id);

  if (profileError) {
    throw profileError;
  }

  const { data: requests, error: requestError } = await supabase
    .from("friend_requests")
    .select("*")
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

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
      (friendship) => friendship.friend_id === profile.id,
    );

    const request = requests.find(
      (request) =>
        (request.sender_id === user.id && request.receiver_id === profile.id) ||
        (request.receiver_id === user.id && request.sender_id === profile.id),
    );

    return {
      ...profile,

      friendshipStatus: friendship
        ? "accepted"
        : request
          ? request.status
          : "none",

      requestId: request?.request_id ?? null,
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

  // (for guide lang) Check if an old request already exists
  const { data: existingRequest, error: fetchError } = await supabase
    .from("friend_requests")
    .select("request_id")
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id})`,
    )
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  if (existingRequest) {
    // (for guide lang) Reuse old request
    const { error } = await supabase
      .from("friend_requests")
      .update({
        sender_id: user.id,
        receiver_id: receiverId,
        status: "pending",
      })
      .eq("request_id", existingRequest.request_id);

    if (error) throw error;
  } else {
    // (for guide lang) No request exists
    const { error } = await supabase.from("friend_requests").insert({
      sender_id: user.id,
      receiver_id: receiverId,
      status: "pending",
    });

    if (error) throw error;
  }
}

export async function getSentFriendRequests() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const { data, error } = await supabase
    .from("friend_requests")
    .select(
      `
            request_id,
            sender_id,
            receiver_id,
            status,
            receiver:profiles!friend_requests_receiver_id_fkey(
                id,
                firstname,
                lastname,
                username,
                year,
                program
            )
        `,
    )
    .eq("sender_id", user.id)
    .eq("status", "pending");

  if (error) {
    throw error;
  }

  return data;
}

export async function cancelFriendRequest(requestId) {
  const { error } = await supabase
    .from("friend_requests")
    .delete()
    .eq("request_id", requestId);

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
    .select(
      `
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
        `,
    )
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

  const { error: friendshipError } = await supabase.from("friendships").insert([
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const { data, error } = await supabase
    .from("friendships")
    .select(
      `
            friend:profiles!friendships_friend_id_fkey(
                id,
                firstname,
                lastname,
                username,
                year,
                program
            )
        `,
    )
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }

  return data;
}

export async function unfriend(friendId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const { error: friendshipError } = await supabase
    .from("friendships")
    .delete()
    .or(
      `and(user_id.eq.${user.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${user.id})`,
    );

  if (friendshipError) {
    throw friendshipError;
  }

  const { error: requestError } = await supabase
    .from("friend_requests")
    .delete()
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${user.id})`,
    );

  if (requestError) {
    throw requestError;
  }
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
    .select(
      `
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
        `,
    )
    .eq("user_id", user.id)
    .eq("friend.schedules.is_archived", false);

  if (error) {
    throw error;
  }

  return data;
}

export async function getFriendSchedule(friendId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const { data: friendship, error: friendshipError } = await supabase
    .from("friendships")
    .select("friendship_id")
    .eq("user_id", user.id)
    .eq("friend_id", friendId)
    .maybeSingle();

  if (friendshipError) {
    throw friendshipError;
  }

  if (!friendship) {
    throw new Error("Friend not found.");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
            id,
            firstname,
            lastname,
            username,
            year,
            program,
            school_name,
            schedules (
                schedule_id,
                subject,
                room,
                day,
                start_time,
                end_time,
                color,
                is_archived
            )
        `,
    )
    .eq("id", friendId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function searchFriends(searchText) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not logged in.");
  }

  if (!searchText.trim()) return [];

  const { data, error } = await supabase
    .from("friendships")
    .select(`
      friend:profiles!friendships_friend_id_fkey(
        id,
        firstname,
        lastname,
        username,
        schedules(
          schedule_id,
          subject,
          day,
          start_time,
          end_time,
          is_archived
        )
      )
    `)
    .eq("user_id", user.id);

  if (error) throw error;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const now = new Date();

  return data
    .map(({ friend }) => friend)
    .filter((friend) => {
      const search = searchText.toLowerCase();

      return (
        friend.firstname.toLowerCase().includes(search) ||
        friend.lastname.toLowerCase().includes(search) ||
        friend.username.toLowerCase().includes(search)
      );
    })
    .map((friend) => {
      const todaysSchedule =
        friend.schedules?.filter(
          (schedule) =>
            schedule.day === today &&
            !schedule.is_archived
        ) || [];

      let status = "Free";

      for (const schedule of todaysSchedule) {
        const start = new Date();
        const end = new Date();

        const [sh, sm] = schedule.start_time.split(":");
        const [eh, em] = schedule.end_time.split(":");

        start.setHours(Number(sh), Number(sm), 0, 0);
        end.setHours(Number(eh), Number(em), 0, 0);

        if (now >= start && now <= end) {
          status = "Busy";
          break;
        }
      }

      return {
        ...friend,
        schedules:
          friend.schedules?.filter((s) => !s.is_archived) ?? [],
        status,
      };
    });
}