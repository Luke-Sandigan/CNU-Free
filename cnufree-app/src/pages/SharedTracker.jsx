import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import SideBar from "../components/SideBar.jsx";
import HomeNavBar from "../components/HomeNavBar";
import { Eye } from "lucide-react";
import { getFriendSchedules } from "../services/friendService";
import { getCurrentStatus } from "../services/getCurrentStatus";
import { formatTime } from "../utils/formatTime";
import FriendScheduleModal from "../components/FriendScheduleModal.jsx";
// import OnboardingWrap from "../components/OnboardingWrap.jsx";

function SharedTracker() {
  //   const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  async function loadFriends() {
    try {
      setLoading(true);
      const data = await getFriendSchedules();
      setFriends(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFriends();
    const channel = supabase
      .channel("friend-schedules")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "schedules",
        },
        () => {
          loadFriends();
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex flex-col items-center ">
      <FriendScheduleModal
        open={scheduleOpen}
        close={() => setScheduleOpen(false)}
        friendId={selectedFriendId}
      />

      <SideBar open={isOpen} close={() => setIsOpen(false)} />
      <HomeNavBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-col max-w-lg w-full mt-15 h-[calc(100vh-60px)]">
        {/* fixed header — no scroll */}
        <div className="flex justify-between items-center px-5 py-5 bg-[#111827] shrink-0">
          <div className="flex flex-col">
            <h1 className="font-extrabold text-xl sm:text-4xl text-white">
              Friend's Tracker
            </h1>
            <p className="text-md text-slate-400">
              Find out which friend is free!
            </p>
          </div>
          <div>
            <Eye className="size-20 text-white" />
          </div>
        </div>

        {/* scrollable section */}
        <div className="flex flex-col flex-1 overflow-hidden border-none sm:border rounded-2xl border-slate-300">
          {/* sticky label — doesn't scroll */}
          <div className="flex flex-col px-4 pt-4 pb-3 shrink-0">
            <h1 className="font-extrabold text-md">Friends</h1>
            <p className="sm:text-sm text-slate-500 flex items-center gap-1 text-[13px]">
              See your friend's schedule by pressing the "{" "}
              <Eye className="size-4" /> " button.
            </p>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto px-4 pb-4">
            {loading && (
              <div className="flex flex-col items-center justify-center gap-3 ">
                <div
                  className="
                        h-10
                        w-10
                        rounded-full
                        border-4
                        border-slate-300
                        border-t-[#111824]
                        animate-spin
                    "
                />

                <p className="text-slate-500 font-medium">Loading friends...</p>
              </div>
            )}

            {!loading && friends.length === 0 && (
              <p className="text-center text-slate-500">No friends yet.</p>
            )}

            {!loading &&
              friends.map((friend) => {
                const status = getCurrentStatus(friend.friend.schedules);

                return (
                  <div
                    key={friend.friend.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex gap-4 items-center">
                      <div
                        className={`rounded-full size-2
                                    ${
                                      status.status === "Busy"
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                    }
                                `}
                      />

                      <div className=" flex flex-col max-w-[90px] sm:max-w-[120px] min-w-0">
                        <h1 className="font-extrabold truncate">
                          {friend.friend.firstname}
                        </h1>

                        <p className=" text-xs text-slate-500 ">
                          @{friend.friend.username}
                        </p>
                      </div>
                    </div>

                    <div
                      className={` shrink-0 border rounded-lg px-3 py-2
                                ${
                                  status.status === "Busy"
                                    ? "bg-red-100 border-red-400"
                                    : "bg-green-100 border-green-400"
                                }
                            `}
                    >
                      <div className="flex gap-2 items-center">
                        <div
                          className={`
                                        rounded-full
                                        size-2
                                        ${
                                          status.status === "Busy"
                                            ? "bg-red-500"
                                            : "bg-green-500"
                                        }
                                    `}
                        />

                        <span
                          className={`
                                        text-xs
                                        font-bold
                                        ${
                                          status.status === "Busy"
                                            ? "text-red-600"
                                            : "text-green-600"
                                        }
                                    `}
                        >
                          {status.status === "Busy"
                            ? `Busy until ${formatTime(status.end)}`
                            : status.nextSubject
                              ? `Free until ${formatTime(status.start)}`
                              : "Free all day"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedFriendId(friend.friend.id);
                        setScheduleOpen(true);
                      }}
                      className="p-2 bg-[#111827] text-white rounded shrink-0 "
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                );
              })}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default SharedTracker;
