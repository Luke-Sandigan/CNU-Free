import { useEffect, useState, useCallback } from "react";
import {
  getPendingFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
} from "../services/friendService";
import { useToast } from "../context/ToastContext";

function NotificationModal({ open, close }) {
  const { showToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRequests = useCallback(async () => {
    if (!open) {
      return;
    }

    try {
      setLoading(true);

      const data = await getPendingFriendRequests();

      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  async function handleAccept(request) {
    try {
      await acceptFriendRequest(request);
      showToast({
        type: "success",
        message: "Friend request accepted!",
      });
      await loadRequests();
    } catch (error) {
      console.error(error);
      showToast({
        type: "error",
        message: error.message,
      });
    }
  }

  async function handleReject(requestId) {
    try {
      await rejectFriendRequest(requestId);
      showToast({
        type: "success",
        message: "Rejected successfully!",
      });
      await loadRequests();
    } catch (error) {
      console.error(error);
      showToast({
        type: "error",
        message: error.message,
      });
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="
                fixed
                inset-0
                bg-black/40
                z-[9999]
                flex
                items-center
                justify-center
            "
      onClick={close}
    >
      <div
        className="
                    bg-white
                    w-[95%]
                    max-w-md
                    rounded-xl
                    shadow-lg
                    p-5
                "
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-extrabold">Notifications</h2>

          <button onClick={close} className="font-bold">
            ✕
          </button>
        </div>

        {!loading && requests.length === 0 && (
          <p className="text-center text-slate-500">
            No pending friend requests.
          </p>
        )}

        <div className="space-y-3">
          {requests.map((request) => (
            <div
              key={request.request_id}
              className=" flex justify-between rounded-lg border p-4"                            
            >
              <div className="flex flex-col ">
                <h3 className="font-bold">
                  {request.sender.firstname} {request.sender.lastname}
                </h3>

                <p className="text-sm text-slate-500">
                  @{request.sender.username}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(request)}
                  className=" rounded-lg bg-[#111824] hover:bg-slate-600 px-4 transition-all duration-300 ease-linear
                              py-2  text-white  font-bold "
                >
                  Accept
                </button>

                <button
                  onClick={() => handleReject(request.request_id)}
                  className=" rounded-lg bg-red-500 hover:bg-slate-600 px-4 transition-all duration-300 ease-linear
                              py-2 text-white font-bold"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex flex-col gap-2 items-center">
            <div
              className="
                        h-5
                        w-5
                        rounded-full
                        border-4
                        border-slate-300
                        border-t-[#111824]
                        animate-spin
                    "
            />

            <p className="text-center text-slate-500">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationModal;
