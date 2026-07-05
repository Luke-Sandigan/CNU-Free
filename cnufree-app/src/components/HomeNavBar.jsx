import { useNavigate } from "react-router-dom";
import { Menu, Search, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo2.png";
import ProfileModal from "./ProfileModal";
import SideBar from "./SideBar";
import { supabase } from "../utils/supabase";
import NotificationModal from "./NotificationModal";
import { searchFriends } from "../services/friendService";
import SearchResultCard from "./SearchResultCard";
import { useToast } from "../context/ToastContext";

function HomeNavBar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const { showToast } = useToast();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);

  const [hasNotification, setHasNotification] = useState(false);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    navigate("/");
  }

  useEffect(() => {
    let channel;

    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);

      channel = supabase
        .channel(`profile-${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "profiles",
            filter: `id=eq.${user.id}`,
          },
          (payload) => {
            setProfile(payload.new);
          },
        )
        .subscribe();

      return channel;
    }

    loadProfile();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!search.trim()) {
        setResults([]);
        return;
      }

      try {
        const data = await searchFriends(search);
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function loadNotificationCount() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { count } = await supabase
        .from("friend_requests")
        .select("*", { count: "exact", head: true })
        .eq("receiver_id", user.id)
        .eq("status", "pending");

      setHasNotification(count > 0);
    }

    loadNotificationCount();
  }, []);

  useEffect(() => {
    let channel;

    async function subscribe() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      channel = supabase
        .channel("friend-request-listener")

        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "friend_requests",
            filter: `receiver_id=eq.${user.id}`,
          },
          async (payload) => {
            setHasNotification(true);

            const senderId = payload.new.sender_id;

            const { data: sender } = await supabase
              .from("profiles")
              .select("firstname, lastname")
              .eq("id", senderId)
              .single();

            showToast({
              type: "info",
              message: `${sender.firstname} ${sender.lastname} added you.`,
            });
          },
        )

        .subscribe();
    }

    subscribe();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="w-full fixed bg-white z-30">
      <ProfileModal open={isProfileOpen} close={() => setProfileOpen(false)} />
      <NotificationModal
        open={isNotificationOpen}
        close={() => setNotificationOpen(false)}
      />
      <SideBar open={isOpen} close={() => setIsOpen(false)} />

      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className=" px-3 w-full border-b  border-[#e2e2e2] z-60"
      >
        <div className=""> </div>

        <div className=" flex items-center justify-between h-[61px]">
          <div className="flex items-center gap-2 ">
            <button className="block" onClick={() => setIsOpen(!isOpen)}>
              {" "}
              <Menu />{" "}
            </button>
            <img
              className="block ml-[10px]"
              width="35px"
              src={logo}
              alt="CNU-logo"
            />
            <div className="hidden sm:block ">
              <p className="font-extrabold text-[#111827] ">
                {" "}
                CNU <span> Free </span>
              </p>
            </div>
          </div>

          <div ref={searchRef} className="relative w-1/2 md:w-[400px]">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a friend..."
              className="w-full rounded-full border border-slate-200 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#111827]"
            />

            {search.trim() !== "" && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                {results.length > 0 ? (
                  results.map((user) => (
                    <SearchResultCard key={user.id} user={user} />
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No users found.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="items-center flex gap-1">
            <button
              onClick={() => {
                setNotificationOpen(true);
                setHasNotification(false);
              }}
              className="relative rounded-md border border-slate-200 p-2 hover:bg-slate-100"
            >
              <Bell size={20} />

              {hasNotification && (
                <span className="  absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white bg-red-500 " />
              )}
            </button>
            <button
              className=" hover:bg-[#111827] hover:text-white border border-slate-200 hidden sm:block  rounded-[5px] px-4 py-2 text-[15px] font-bold transition-all duration-300 ease-in-out"
              onClick={handleLogout}
            >
              {" "}
              Log Out
            </button>
            <div
              onClick={() => setProfileOpen(true)}
              className="hover:bg-[#111827be] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:scale-105 py-2 px-4  text-[15px] bg-[#111827] font-extrabold rounded-[5px] text-white px-4  transition-all duration-300 ease-in-out "
            >
              {" "}
              {profile?.firstname?.charAt(0).toUpperCase() || "?"}{" "}
            </div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}

export default HomeNavBar;
