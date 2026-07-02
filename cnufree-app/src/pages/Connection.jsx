import { useState, useEffect, useCallback } from "react";
import { supabase } from "../utils/supabase";
import { UserRoundPlus } from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";
import HomeNavBar from "../components/HomeNavBar";
import SearchProfileModal from "../components/searchModal";
import { useToast } from "../context/ToastContext";
import {
  getFriends,
  getSentFriendRequests,
  cancelFriendRequest,
  getPendingFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  unfriend,
} from "../services/friendService";

function Connection() {
  const { showToast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState("friends");
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const [friends, setFriends] = useState([]);
  const [friendsLoading, setFriendsLoading] = useState(false);

  const [pendingRequests, setPendingRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);

  const [sentRequests, setSentRequests] = useState([]);
  const [sentLoading, setSentLoading] = useState(false);

  const [showUnfriendModal, setShowUnfriendModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const [processingRequest, setProcessingRequest] = useState({
    id: null,
    action: null,
  });
  const [processingFriendId, setProcessingFriendId] = useState(null);

  async function handleUnfriend() {
    if (!selectedFriend) return;
    try {
      setProcessingFriendId(selectedFriend.friend.id);
      await unfriend(selectedFriend.friend.id);

      showToast({
        type: "success",
        message: "Friend removed successfully.",
      });

      setShowUnfriendModal(false);
      setSelectedFriend(null);
      await loadFriends();
    } catch (error) {
      console.error(error);
      showToast({
        type: "error",
        message: error.message,
      });
    }
  }

  async function handleAcceptRequest(request) {
    try {
      setProcessingRequest({
        id: request.request_id,
        action: "accept",
      });
      await acceptFriendRequest(request);

      showToast({
        type: "success",
        message: "Friend request accepted.",
      });
      await Promise.all([loadPendingRequests(), loadFriends()]);
    } catch (error) {
      console.error(error);
      showToast({
        type: "error",
        message: error.message,
      });
    } finally {
      setProcessingRequest({
        id: null,
        action: null,
      });
    }
  }

  async function handleRejectRequest(requestId) {
    try {
      setProcessingRequest({
        id: requestId,
        action: "reject",
      });
      await rejectFriendRequest(requestId);
      showToast({
        type: "success",
        message: "Friend request rejected.",
      });
      await loadPendingRequests();
    } catch (error) {
      showToast({
        type: "error",
        message: error.message,
      });
      setProcessingRequest({
        id: null,
        action: null,
      });
      console.error(error);
    } finally {
      setProcessingRequest({ id: null, action: null });
    }
  }

  const loadFriends = useCallback(async () => {
    try {
      setFriendsLoading(true);
      const data = await getFriends();
      setFriends(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setFriendsLoading(false);
    }
  }, []);

   async function handleCancelRequest(requestId) {
    try {
      await cancelFriendRequest(requestId);
      showToast({
        type: "success",
        message: "Friend request cancelled.",
      });
      await loadSentRequests();
    } catch (error) {
      console.error(error);
      showToast({
        type: "error",
        message: error.message,
      });
    }
  }

  const loadSentRequests = useCallback(async () => {
    try {
      setSentLoading(true);
      const data = await getSentFriendRequests();
      setSentRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setSentLoading(false);
    }
  }, []);

  const loadPendingRequests = useCallback(async () => {
    try {
      setRequestsLoading(true);
      const data = await getPendingFriendRequests();
      setPendingRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setRequestsLoading(false);
    }
  }, []);


  useEffect(() => {
    loadFriends();
    loadPendingRequests();
    loadSentRequests();
  }, []);

  useEffect(() => {
    const reload = () => {
      loadFriends();
      loadPendingRequests();
      loadSentRequests();
    };

    const channel = supabase
      .channel("friend-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "friend_requests",
        },
        reload,
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "friendships",
        },
        reload,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <HomeNavBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="max-w-7xl w-full flex flex-col items-center mt-20 p-4">
        <div className="sticky top-15.25 z-20 flex flex-col gap-5 sm:flex-row justify-between w-full items-center mb-5  bg-white">
          <div className=" bg-white flex flex-col w-full ">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#111824]">
              {" "}
              Connected Peer Network{" "}
            </h1>
            <p className="text-[13px] sm:text-lg">
              {" "}
              Manage classmates sharing schedules with your work space.{" "}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full ">
            <div className="relative flex-1 w-full  ">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="
                  w-full
                  border border-slate-300
                  rounded-lg
                  px-4 py-2
                  font-bold
                  bg-white
                  flex items-center justify-between
                
                "
              >
                {isActive === "friends" && "Friends"}
                {isActive === "friendReq" && "Friend Requests"}
                {isActive === "PendingReq" && "Pending Requests"}
              </button>

              <div
                className={`
                  absolute
                  right-0
                  top-full
                  mt-2
                  w-full
                  bg-white
                  border
                  border-slate-300
                  rounded-lg
                  shadow-lg
                  overflow-hidden
                  transition-all
                  duration-200
                  ${
                    showMenu
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }
                `}
              >
                <button
                  onClick={() => {
                    setIsActive("friends");
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-slate-100"
                >
                  Friends
                </button>

                <button
                  onClick={() => {
                    setIsActive("friendReq");
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-slate-100"
                >
                  Friend Requests
                </button>

                <button
                  onClick={() => {
                    setIsActive("PendingReq");
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-slate-100"
                >
                  Pending Requests
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowSearchModal(true)}
              className="shrink-0 border px-3 py-2 font-extrabold rounded-lg text-white bg-[#111824] flex items-center"
            >
              <UserRoundPlus size={20} />
            </button>
          </div>
        </div>

        {isActive === "friends" &&
          (friendsLoading ? (
            <div className="flex w-full justify-center py-20">
              <div className="flex flex-col items-center gap-3">
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
            </div>
          ) : friends.length === 0 ? (
            <div className="w-full py-20 flex flex-col items-center">
              <span className="text-6xl mb-3">👥</span>

              <h2 className="text-xl font-bold">No friends yet</h2>

              <p className="text-slate-500 mt-2 text-center">
                Search for classmates and send them a friend request.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap w-full gap-4 sm:gap-5 items-center justify-center sm:items-start sm:justify-start">
              {friends.map((friend) => (
                <div
                  key={friend.friend.id}
                  className="flex-[1_1_auto] sm:flex-[0_0_auto] border border-slate-300 w-sm flex flex-col rounded-xl items-center justify-center p-5"
                >
                  <div
                    className="
                            hover:bg-[#111827be]
                            hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]
                            flex
                            hover:scale-105
                            py-3
                            text-lg
                            bg-slate-400
                            font-extrabold
                            rounded-[5px]
                            px-4
                            mb-2
                            transition-all
                            duration-300
                            ease-in-out
                        "
                  >
                    {friend.friend.firstname.charAt(0)}
                    {friend.friend.lastname.charAt(0)}
                  </div>

                  <div className="font-extrabold text-md">
                    {friend.friend.firstname} {friend.friend.lastname}
                    <span className="font-light"> • </span>
                    <span className="font-light text-sm">
                      {friend.friend.year} - {friend.friend.program}
                    </span>
                  </div>

                  <div className="font-extrabold text-[12px] text-slate-600 mb-3">
                    @{friend.friend.username}
                  </div>

                  <div className="font-extrabold text-sm bg-[#E1F6EF] rounded-xl px-3 py-2 text-[#10B981] mb-8">
                    Connected
                  </div>

                  <button
                    onClick={() => {
                      setSelectedFriend(friend);
                      setShowUnfriendModal(true);
                    }}
                    className="w-full bg-[#EF4444] font-extrabold hover:bg-[#e06161] 
                               transition-all duration-300 ease-linear hover:text-[#e9c5c5] 
                             text-[#111824] py-2 rounded-xl"
                  >
                    Unfriend
                  </button>
                </div>
              ))}
            </div>
          ))}
        {isActive === "friendReq" &&
          (requestsLoading ? (
            <div className="flex w-full justify-center py-20">
              <div className="flex flex-col items-center gap-3">
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

                <p className="text-slate-500 font-medium">
                  Loading pending requests...
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap w-full gap-4 sm:gap-5 items-center justify-center sm:items-start sm:justify-start">
              {pendingRequests.length === 0 ? (
                <div className="w-full text-center text-slate-500 font-medium py-10">
                  No friend requests.
                </div>
              ) : (
                pendingRequests.map((request) => (
                  <div
                    key={request.request_id}
                    className="flex-[1_1_auto] sm:flex-[0_0_auto] border border-slate-300 w-full sm:w-sm flex flex-col rounded-xl items-center justify-center p-5"
                  >
                    <div
                      className="
                        hover:bg-[#111827be]
                        hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]
                        hover:scale-105
                        text-xl
                        text-white
                        items-center
                        transition-all
                        font-extrabold
                        rounded-md
                        mb-2
                        bg-slate-400
                        h-16
                        w-16
                        justify-center
                        duration-300
                        flex
                        ease-in-out
                    "
                    >
                      {request.sender.firstname.charAt(0)}
                      {request.sender.lastname.charAt(0)}
                    </div>

                    <div className="font-extrabold text-md text-center">
                      {request.sender.firstname} {request.sender.lastname}
                      {" • "}
                      <span className="font-light text-sm">
                        {request.sender.year} - {request.sender.program}
                      </span>
                    </div>

                    <div className="font-extrabold text-[12px] text-slate-600 mb-3">
                      @{request.sender.username}
                    </div>

                    <div className="font-extrabold text-sm bg-slate-100 rounded-xl px-3 py-2 text-slate-800 mb-8">
                      wants to connect with you..
                    </div>

                    <div className="flex gap-2 w-full">
                      <button
                        disabled={processingRequest.id === request.request_id}
                        onClick={() => handleAcceptRequest(request)}
                        className="
                                w-full
                                bg-[#111824]
                                font-extrabold
                                text-white
                                py-2
                                rounded-xl
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                      >
                        {processingRequest.id === request.request_id &&
                        processingRequest.action === "accept"
                          ? "Accepting..."
                          : "Accept"}
                      </button>

                      <button
                        disabled={processingRequest.id === request.request_id}
                        onClick={() => handleRejectRequest(request.request_id)}
                        className="w-full bg-[#EF4444] font-extrabold text-white py-2 
                                   rounded-xl hover:bg-[#e06161] transition-all duration-300 ease-linear"
                      >
                        {processingRequest.id === request.request_id &&
                        processingRequest.action === "reject"
                          ? "Rejecting..."
                          : "Reject"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}

        {isActive === "PendingReq" &&
          (sentLoading ? (
            <div className="flex w-full justify-center py-20">
              <div className="flex flex-col items-center gap-3">
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

                <p className="text-slate-500 font-medium">
                  Loading pending requests...
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap w-full gap-4 sm:gap-5 items-center justify-center sm:items-start sm:justify-start">
              {sentRequests.length === 0 ? (
                <div className="w-full text-center text-slate-500 font-medium py-10">
                  No pending requests.
                </div>
              ) : (
                sentRequests.map((request) => (
                  <div
                    key={request.request_id}
                    className="flex-[1_1_auto] sm:flex-[0_0_auto] border border-slate-300 w-full sm:w-sm flex flex-col rounded-xl items-center justify-center p-5"
                  >
                    <div
                      className="
                                  hover:bg-[#111827be]
                                  hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]
                                  hover:scale-105 text-xl text-white items-center
                                  transition-all font-extrabold rounded-md
                                  mb-2 bg-slate-400 h-16 w-16 justify-center
                                  duration-300  flex ease-in-out
                              "
                    >
                      {request.receiver.firstname.charAt(0)}
                      {request.receiver.lastname.charAt(0)}
                    </div>

                    <div className="font-extrabold text-md text-center">
                      {request.receiver.firstname} {request.receiver.lastname} •{" "}
                      <span className="font-light text-sm">
                        {request.receiver.year} - {request.receiver.program}
                      </span>
                    </div>

                    <div className="font-extrabold text-[12px] text-slate-600 mb-3">
                      @{request.receiver.username}
                    </div>

                    <div className="font-extrabold text-sm bg-slate-100 rounded-xl px-3 py-2 text-slate-800 mb-8">
                      Pending
                    </div>

                    <button
                      className="w-full bg-slate-600 hover:bg-red-600 transition-colors font-extrabold text-white py-2 rounded-xl"
                      onClick={() => handleCancelRequest(request.request_id)}
                    >
                      Cancel
                    </button>
                  </div>
                ))
              )}
            </div>
          ))}
      </main>

      <SearchProfileModal
        open={showSearchModal}
        close={() => setShowSearchModal(false)}
      />

      <ConfirmModal
        open={showUnfriendModal}
        close={() => {
          if (processingFriendId) return;

          setShowUnfriendModal(false);
          setSelectedFriend(null);
        }}
        title="Remove Friend"
        message={
          selectedFriend
            ? `${selectedFriend.friend.firstname} ${selectedFriend.friend.lastname}`
            : ""
        }
        confirmText={processingFriendId ? "Removing..." : "Unfriend"}
        confirmColor="bg-red-600 hover:bg-red-700"
        loading={!!processingFriendId}
        onConfirm={handleUnfriend}
      />
    </div>
  );
}

export default Connection;
