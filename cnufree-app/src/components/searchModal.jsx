import { useState, useEffect } from "react";
import { searchUser, sendFriendRequest } from "../services/friendService";


function SearchProfileModal({ open, close }) {

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

      async function loadUsers() {

          if (!searchTerm.trim()) {
              setResults([]);
              return;
          }

          try {
              setLoading(true);

              const users = await searchUser(searchTerm);
              
              setResults(users);
          }
          catch (error) {
              console.error(error);
          }
          finally {
              setLoading(false);

          }
      }
      loadUsers();
  }, [searchTerm]);


  async function handleAddFriend(receiverId) {
      try {

          await sendFriendRequest(receiverId);
          alert("Friend request sent!");

      }

      catch (error) {
          console.error(error);
          alert(error.message);
      }
  }


  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0
        bg-black/40
        z-[9999]
        flex items-center justify-center
        p-4
      "
    >

      <div
        className="
          bg-white
          w-full
          max-w-lg
          rounded-2xl
          shadow-xl
          p-5
          max-h-[80vh]
          overflow-y-auto
        "
      >

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-extrabold">
            Add Friend
          </h2>

          <button
            onClick={close}
            className="font-bold text-slate-500"
          >
            ✕
          </button>
        </div>

      

        <input
          type="text"
          placeholder="Search username..."
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            px-4
            py-3
            mb-4
          "
        />

    

        <div className="flex flex-col gap-3">

         <div className="space-y-3">

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
                
                  <p className="text-center text-slate-500">
                      Searching...
                  </p>
                </div>
              )}

              {!loading && results.length === 0 && searchTerm.trim() && (
                  <p className="text-center text-slate-500">
                      No users found.
                  </p>
              )}

              {!loading &&
                  results.map((user) => (

                      <div
                          key={user.id}
                          className="flex items-center justify-between rounded-lg border p-4"
                      >

                          <div>

                              <h3 className="font-bold">
                                  {user.firstname} {user.lastname}
                              </h3>

                              <p className="text-sm text-slate-500">
                                  @{user.username}
                              </p>

                          </div>

                            <button
                                disabled={user.friendshipStatus !== "none"}
                                onClick={() => handleAddFriend(user.id)}
                                className={`
                                    rounded-lg
                                    px-4
                                    py-2
                                    font-bold
                                    ${
                                        user.friendshipStatus === "none"
                                            ? "bg-[#111827] text-white"
                                            : "bg-slate-300 text-slate-600 cursor-not-allowed"
                                    }
                                `}
                            >
                                {
                                    user.friendshipStatus === "accepted"
                                        ? "Friends"
                                        : user.friendshipStatus === "pending"
                                            ? "Pending"
                                            : "Add"
                                }
                            </button>

                      </div>

                  ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default SearchProfileModal;