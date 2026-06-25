import { useState, useEffect } from "react";
import SideBar from "../components/SideBar.jsx";
import HomeNavBar from "../components/HomeNavBar";
import { mockFriends } from "../mockFriends";


function getStatus(friendSchedule) {
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = days[now.getDay()];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const isBusy = friendSchedule.some((item) => {
    if (item.day !== today) return false;
    const [sh, sm] = item.startTime.split(":").map(Number);
    const [eh, em] = item.endTime.split(":").map(Number);
    return currentMinutes >= sh * 60 + sm && currentMinutes < eh * 60 + em;
  });

  return isBusy ? "Busy" : "Free";
}

function SharedTracker() {
  const [isOpen, setIsOpen] = useState(false);
  const [connections, setConnections] = useState([]);
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("connections");
    if (saved) {
      const all = JSON.parse(saved);
      const connected = all.filter((c) => c.status === "connected");
      setConnections(connected);
      // default all toggles ON
      const initial = {};
      connected.forEach((c) => { initial[c.id] = true; });
      setVisible(initial);
    }
  }, []);

  const toggleVisible = (id) => {
    setVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const shown = connections.filter((c) => visible[c.id]);

  return (
    <div className="flex flex-col">
      <SideBar open={isOpen} close={() => setIsOpen(false)} />
      <HomeNavBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="pt-[61.8px] px-5 py-5 sm:px-20 w-full sm:w-4/5 mx-auto">
        <h1 className="text-[25px] font-extrabold mb-1">Friends Tracker</h1>
        <p className="text-sm text-gray-500 mb-6">Find who's friend is free!</p>

        <div className="border border-gray-200 rounded-xl p-5 max-w-xl">
          <p className="font-extrabold mb-1">Friends</p>
          <p className="text-xs text-gray-500 mb-4">Choose whose friend is visible on your tracker</p>

          {connections.length === 0 && (
            <p className="text-sm text-gray-400">No connected friends yet. Go to Connections to add some.</p>
          )}

          {connections.map((friend) => {
            // Always use the latest schedule from mockFriends (not the stale localStorage copy)
            const latestData = mockFriends.find((f) => f.id === friend.id);
            const status = getStatus(latestData ? latestData.schedule : friend.schedule);
            return (
              <div key={friend.id} className="flex items-center justify-between py-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${status === "Free" ? "bg-green-400" : "bg-red-400"}`} />
                  <span className="text-sm font-bold">{friend.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${status === "Free"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                    }`}>
                    {status}
                  </span>

                  {/* Toggle */}
                  <button
                    onClick={() => toggleVisible(friend.id)}
                    className={`w-11 h-6 rounded-full transition-all duration-300 relative ${visible[friend.id] ? "bg-[#111827]" : "bg-gray-300"
                      }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${visible[friend.id] ? "left-6" : "left-1"
                      }`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default SharedTracker;