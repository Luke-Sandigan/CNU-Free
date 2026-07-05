import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import { ArrowLeftToLine } from "lucide-react";
import { SquarePen } from "lucide-react";
import EditProfile from "./EditProfile";
import { supabase } from "../utils/supabase";
import { getCurrentProfile } from "../services/profileService";

function ProfileModal({ open, close }) {
  const navigate = useNavigate();
  const [editProfileOpen, setEditProfileClose] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {

  //     const savedProfile = localStorage.getItem("studentProfile");

  //     if (savedProfile) {setProfile(JSON.parse(savedProfile));}

  // }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      const data = await getCurrentProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!open) return;

    loadProfile();

    let channel;

    async function subscribeProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

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
          () => {
            loadProfile();
          },
        )
        .subscribe();
    }

    subscribeProfile();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [open]);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    navigate("/");
  }

  // useEffect(()=> {

  //     async function loadProfile() {
  //         const { data: { user }  } = await supabase.auth.getUser();

  //         if (!user) return;

  //         const { data, error } = await supabase
  //             .from("profiles")
  //             .select("*")
  //             .eq("id", user.id)
  //             .maybeSingle();

  //             if (error) {
  //                 console.error(error);
  //             return;
  //         }

  //         setProfile(data);
  //     }

  //     loadProfile();

  // }, [open])

  if (!open) return null;

  return (
    <>
      <EditProfile
        openEdit={editProfileOpen}
        closeEdit={() => setEditProfileClose(false)}
        profile={profile}
        refreshProfile={loadProfile}
        // onUpdateProfile={(updatedProfile) => setProfile(updatedProfile)}
      />

      <div
        className="fixed inset-0 bg-black/50 z-[40] flex items-center justify-center"
        onClick={close}
      ></div>

      <aside
        className={`
                py-9 px-4
                w-90 h-full
                min-h-screen
                bg-white
                border-l
                border-gray-200
                fixed
                top-0
                right-0
                z-50
                transition-transform
                duration-300
                flex
                flex-col

                ${open ? "translate-x-0" : "translate-x-full"}
            `}
      >
        <div className="w-full h-full flex flex-col items-center justify-between ">
          <div className="w-full">
            <div className="flex items-center justify-between  mb-5">
              <div className="flex gap-2 ">
                <img
                  className="block ml-[10px]"
                  width="25px"
                  src={logo}
                  alt="CNU-logo"
                />
                <span className="font-bold text-md"> Student Profile </span>
              </div>
              <div className="">
                <button
                  className="pt-2 hover:bg-slate-300 pb-2 hover:rounded-full transition-all duration-300 ease-in-out"
                  onClick={close}
                >
                  <ArrowLeftToLine size={20} />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="p-8 border rounded-[15px] mb-8 animate-pulse">
                <div className="flex justify-between mb-5">
                  <div className="h-5 w-24 bg-slate-200 rounded"></div>
                  <div className="h-4 w-28 bg-slate-200 rounded"></div>
                </div>

                <div className="flex gap-5 mb-8">
                  <div className="w-17 h-17 rounded bg-slate-200"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-40 bg-slate-200 rounded"></div>
                    <div className="h-4 w-28 bg-slate-200 rounded"></div>
                    <div className="h-4 w-44 bg-slate-200 rounded"></div>
                    <div className="h-4 w-36 bg-slate-200 rounded"></div>
                  </div>
                </div>
                <div className="border-t mb-5"></div>
                <div className="h-4 bg-slate-200 rounded"></div>
              </div>
            ) : (
              <div className="p-8 flex flex-col border rounded-[15px] mb-8">
                <div className="flex items-center justify-between gap-7 mb-3">
                  <span className="border px-1 font-extrabold max-w-[60%]">
                    <span className="block truncate text-sm">
                      {profile?.school_name}
                    </span>
                  </span>

                  <span className=" ml-40 fixed text-[12px] font-bold text-slate-400 shrink-0">
                    STUDENT ID CARD
                  </span>
                </div>

                <div className="flex gap-5 w-full mb-8">
                  <div className="flex items-center justify-center w-17 h-17 border rounded bg-slate-300 shrink-0">
                    <span className="font-extrabold text-slate-600 text-[30px]">
                      {profile?.firstname?.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="flex flex-col min-w-0">
                      <span className="font-extrabold truncate">
                        {profile?.lastname}
                      </span>

                      <span className="font-extrabold text-[13px] text-slate-400 truncate">
                        {profile?.firstname}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="font-extrabold text-[12px] text-slate-400 flex items-center gap-2 min-w-0">
                        <span className="shrink-0">ID No:</span>

                        <span className="text-black truncate flex-1 min-w-0">
                          {profile?.id_num}
                        </span>
                      </div>

                      <div className="font-extrabold text-[12px] text-slate-400 flex items-center gap-2 min-w-0">
                        <span className="shrink-0">Year:</span>

                        <span className="text-black truncate flex-1 min-w-0">
                          {profile?.year} - {profile?.program}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-300 mb-5"></div>

                <div className="w-full h-4 bg-[#111827]"></div>
              </div>
            )}

            <div
              className="w-full p-2 border rounded-xl mb-4
                       border-[#1DBD88] bg-[#E1F6EF] text-[#1DBD88] font-extrabold"
            >
              <div className="w-full truncate text-center">
                @{profile?.username}
              </div>
            </div>
            <div className="border-t border-slate-100 mb-2 "> </div>

            <div className="font-extrabold text-[13px] text-slate-400 mb-2">
              PROFILE OPTIONS
            </div>
            <div className="border-t border-slate-100 mb-2 "> </div>
            <div>
              <button
                onClick={() => setEditProfileClose(true)}
                className=" w-full p-2 flex items-center justify-center hover:bg-[#223151] transition-all duration-300 ease-in-out
                     gap-2 border rounded-[10px] bg-[#111827] font-extrabold text-white"
              >
                {" "}
                <SquarePen className="w-5" /> Edit Profile Data{" "}
              </button>
            </div>
          </div>

          <div className="w-full flex items-center">
            <button
              onClick={handleLogout}
              className="w-full py-2 flex items-center justify-center transition-all duration-300 ease-in-out
                border rounded-[10px] bg-red-600 font-extrabold text-white hover:bg-[#223151]
                "
            >
              {" "}
              Log Out{" "}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default ProfileModal;
