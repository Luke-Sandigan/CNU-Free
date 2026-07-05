import { useState } from "react";
import { Eye } from "lucide-react";
import { getCurrentStatus } from "../services/getCurrentStatus";
import { formatTime } from "../utils/formatTime";
import FriendScheduleModal from "../components/FriendScheduleModal.jsx";

function SearchResultCard({ user }) {
  const status = getCurrentStatus(user.schedules);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-3 sm:px-4 py-3 hover:bg-gray-100 gap-2">
      <FriendScheduleModal
        open={scheduleOpen}
        close={() => setScheduleOpen(false)}
        friendId={user.id}
      />

      <div className="flex gap-2 sm:gap-4 items-center min-w-0 flex-1">
        <div
          className={`rounded-full size-2 shrink-0
            ${status.status === "Busy" ? "bg-red-500" : "bg-green-500"}
          `}
        />

        <div className="flex flex-col min-w-0">
          <h2 className="font-bold truncate text-sm sm:text-base">
            {user.firstname} {user.lastname}
          </h2>
          <p className="text-xs text-slate-500 truncate">@{user.username}</p>
        </div>
      </div>

      <div
        className={`shrink-0 border rounded-lg p-3 sm:px-3 sm:py-2 
          ${status.status === "Busy" ? "bg-red-100 border-red-400" : "bg-green-100 border-green-400"}
        `}
      >
        <div className="flex gap-1 sm:gap-2 items-center">
          <div
            className={`rounded-full size-2 shrink-0
              ${status.status === "Busy" ? "bg-red-500" : "bg-green-500"}
            `}
          />
          <span
            className={`hidden sm:inline text-xs font-bold whitespace-nowrap
              ${status.status === "Busy" ? "text-red-600" : "text-green-600"}
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
        onClick={() => setScheduleOpen(true)}
        className="flex items-center gap-1 rounded-lg bg-[#111824] text-white p-2 sm:px-3 sm:py-2 hover:bg-blue-700 shrink-0"
      >
        <Eye size={16} />
      </button>
    </div>
  );
}

export default SearchResultCard;