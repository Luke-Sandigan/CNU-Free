import { useState, useEffect } from "react";
import { mockFriends } from "../mockFriends";
import SideBar from "../components/SideBar.jsx";
import HomeNavBar from "../components/HomeNavBar";

function Connection() {
  const [isOpen, setIsOpen] = useState(false);
  const [connections, setConnections] = useState(() => {
    const saved = localStorage.getItem("connections");
    return saved ? JSON.parse(saved) : [];
  });
  const [addInput, setAddInput] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("connections", JSON.stringify(connections));
  }, [connections]);

  const handleAdd = () => {
    const username = addInput.trim().toLowerCase();
    if (!username) return;

    const found = mockFriends.find((f) => f.username === username);
    if (!found) {
      setError("Username not found.");
      return;
    }
    if (connections.find((c) => c.id === found.id)) {
      setError("Already added.");
      return;
    }

    setConnections([...connections, { ...found, status: "pending" }]);
    setAddInput("");
    setError("");
    setShowAddModal(false);
  };

  const handleAccept = (id) => {
    setConnections(connections.map((c) =>
      c.id === id ? { ...c, status: "connected" } : c
    ));
  };

  const handleRemove = (id) => {
    setConnections(connections.filter((c) => c.id !== id));
  };

  const connected = connections.filter((c) => c.status === "connected");
  const pending = connections.filter((c) => c.status === "pending");

  return (
    <div className="flex flex-col">
      <SideBar open={isOpen} close={() => setIsOpen(false)} />
      <HomeNavBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="pt-[61.8px] px-5 py-5 sm:px-20 w-full sm:w-4/5 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[25px] font-extrabold">Connected Peer Network</h1>
            <p className="text-sm text-gray-500">Manage classmates sharing schedules with your workspace.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#111827] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#3b4a6a] transition-all"
          >
            + Add Connection
          </button>
        </div>

        {/* Connected */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {connected.map((c) => (
            <ConnectionCard
              key={c.id}
              person={c}
              type="connected"
              onAction={() => handleRemove(c.id)}
              onRemove={() => handleRemove(c.id)}
            />
          ))}
        </div>

        {/* Pending */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pending.map((c) => (
            <ConnectionCard
              key={c.id}
              person={c}
              type="pending"
              onAction={() => handleAccept(c.id)}
              onRemove={() => handleRemove(c.id)}
            />
          ))}
        </div>

        {connected.length === 0 && pending.length === 0 && (
          <p className="text-center text-gray-400 mt-20">No connections yet. Add a classmate by username.</p>
        )}
      </main>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm">
            <h2 className="font-extrabold text-lg mb-1">Add Connection</h2>
            <p className="text-sm text-gray-500 mb-4">Enter a classmate's username.</p>
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm mb-2"
              placeholder="e.g. lukesandigan"
              value={addInput}
              onChange={(e) => { setAddInput(e.target.value); setError(""); }}
            />
            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
            <div className="flex gap-2 justify-end mt-3">
              <button
                onClick={() => { setShowAddModal(false); setError(""); setAddInput(""); }}
                className="border px-4 py-2 rounded-lg text-sm font-bold"
              >Cancel</button>
              <button
                onClick={handleAdd}
                className="bg-[#111827] text-white px-4 py-2 rounded-lg text-sm font-bold"
              >Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ConnectionCard({ person, type, onAction, onRemove }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
        {person.initials}
      </div>
      <div className="text-center">
        <p className="font-extrabold text-sm">{person.name}</p>
        <p className="text-xs text-gray-500">{person.program} - {person.year}</p>
        <span className="text-xs text-gray-400 mt-1 block">
          {type === "connected" ? "Connected" : "Pending Request"}
        </span>
      </div>
      <div className="flex gap-2 w-full">
        <button
          onClick={onAction}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === "connected"
            ? "bg-red-500 text-white hover:bg-red-400"
            : "bg-[#111827] text-white hover:bg-[#3b4a6a]"
            }`}
        >
          {type === "connected" ? "Unfriend" : "Accept"}
        </button>
        <button
          onClick={onRemove}
          className="border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-100"
        >✕</button>
      </div>
    </div>
  );
}

export default Connection;