import React, { useState, useEffect } from 'react';

const LocalProgressBar = ({ value, color = '#111827' }) => {
  return (
    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
      <div 
        className="h-full transition-all duration-300"
        style={{ backgroundColor: color, width: `${value}%` }}
      />
    </div>
  );
};

function Chat({ showNotification, peers }) {
  const [chatRooms, setChatRooms] = useState(() => {
    const saved = localStorage.getItem('cnufree_chatRooms');
    return saved ? JSON.parse(saved) : [];
  });
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('cnufree_chatMessages');
    return saved ? JSON.parse(saved) : {};
  });
  const [chatPolls, setChatPolls] = useState(() => {
    const saved = localStorage.getItem('cnufree_chatPolls');
    return saved ? JSON.parse(saved) : {};
  });
  const [activeRoom, setActiveRoom] = useState(() => {
    const savedRooms = localStorage.getItem('cnufree_chatRooms');
    if (savedRooms) {
      const parsed = JSON.parse(savedRooms);
      if (parsed.length > 0) return parsed[0].id;
    }
    return '';
  });

  const [chatInput, setChatInput] = useState('');
  const [createChannelOpen, setCreateChannelOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelIcon, setNewChannelIcon] = useState('👥');
  const [selectedPeerIds, setSelectedPeerIds] = useState([]);

  useEffect(() => {
    localStorage.setItem('cnufree_chatRooms', JSON.stringify(chatRooms));
  }, [chatRooms]);

  useEffect(() => {
    localStorage.setItem('cnufree_chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('cnufree_chatPolls', JSON.stringify(chatPolls));
  }, [chatPolls]);

  // Clean up memberIds that are no longer connected peers
  useEffect(() => {
    const connectedPeerIds = new Set((peers || []).filter(p => p.status === 'Connected').map(p => p.id));
    let changed = false;
    const updatedRooms = chatRooms.map(room => {
      const activeMembers = (room.memberIds || []).filter(id => connectedPeerIds.has(id));
      if (activeMembers.length !== (room.memberIds || []).length) {
        changed = true;
        return { ...room, memberIds: activeMembers, members: activeMembers.length };
      }
      return room;
    });

    if (changed) {
      setChatRooms(updatedRooms);
      // If activeRoom members changed, check if it's still in the list or set to first available
      if (updatedRooms.length > 0 && !updatedRooms.some(r => r.id === activeRoom)) {
        setActiveRoom(updatedRooms[0].id);
      } else if (updatedRooms.length === 0) {
        setActiveRoom('');
      }
    }
  }, [peers]);

  const handleCreateChannelSubmit = (e) => {
    e.preventDefault();
    if (!newChannelName.trim()) return;

    const roomId = `room-${Date.now()}`;
    const newRoom = {
      id: roomId,
      name: newChannelName.trim(),
      icon: newChannelIcon,
      memberIds: selectedPeerIds,
      preview: 'No messages yet',
      members: selectedPeerIds.length
    };

    setChatRooms([...chatRooms, newRoom]);
    setChatMessages({
      ...chatMessages,
      [roomId]: []
    });
    setChatPolls({
      ...chatPolls,
      [roomId]: []
    });

    setNewChannelName('');
    setNewChannelIcon('👥');
    setSelectedPeerIds([]);
    setCreateChannelOpen(false);
    setActiveRoom(roomId);
    showNotification(`💬 Created chat channel: "${newRoom.name}"`);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim() || !activeRoom) return;

    const newMsg = {
      id: Date.now(),
      author: 'Me',
      avatar: 'ME',
      text: chatInput.trim(),
      type: 'user'
    };

    const updatedRoomMsgs = [...(chatMessages[activeRoom] || []), newMsg];
    setChatMessages({
      ...chatMessages,
      [activeRoom]: updatedRoomMsgs
    });
    setChatInput('');

    // Update room preview
    setChatRooms(chatRooms.map(r => r.id === activeRoom ? { ...r, preview: `Me: ${newMsg.text}` } : r));

    // Simulate reply if there are peers in the channel
    const currentRoom = chatRooms.find(r => r.id === activeRoom);
    const roomMembers = currentRoom ? (currentRoom.memberIds || []) : [];
    
    if (roomMembers.length > 0) {
      setTimeout(() => {
        const activePeers = (peers || []).filter(p => p.status === 'Connected' && roomMembers.includes(p.id));
        if (activePeers.length === 0) return;
        
        const randomPeer = activePeers[Math.floor(Math.random() * activePeers.length)];
        const initials = randomPeer.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
        
        const replies = [
          'Awesome, let\'s vote on the scheduling option below!',
          'Should we study in the library or the CS lab?',
          'I\'ll bring the class slides and notes folder.',
          'Sounds good! Let me know if you want to sync up.',
          'Count me in, I am free during that slot!'
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const responseMsg = {
          id: Date.now() + 1,
          author: randomPeer.name,
          avatar: initials,
          text: randomReply,
          type: 'friend'
        };
        
        setChatMessages(prev => ({
          ...prev,
          [activeRoom]: [...(prev[activeRoom] || []), responseMsg]
        }));

        setChatRooms(prevRooms => prevRooms.map(r => 
          r.id === activeRoom ? { ...r, preview: `${randomPeer.name}: ${randomReply}` } : r
        ));
      }, 1200);
    }
  };

  const handleAddChatPoll = () => {
    if (!activeRoom) return;
    const question = prompt('Enter Poll Question:', 'Group Study Session Meeting Time');
    if (!question) return;
    const opt1 = prompt('Enter Option 1:', 'Mon 1:00 PM');
    if (!opt1) return;
    const opt2 = prompt('Enter Option 2:', 'Fri 1:00 PM');
    if (!opt2) return;

    const newPoll = {
      id: Date.now(),
      question,
      opt1,
      opt2,
      votes: { 1: 0, 2: 0 },
      userVotedOption: null
    };

    setChatPolls({
      ...chatPolls,
      [activeRoom]: [...(chatPolls[activeRoom] || []), newPoll]
    });
    showNotification('📊 Poll created successfully!');
  };

  const handleVoteCustomPoll = (pollId, optionId) => {
    if (!activeRoom) return;
    const updated = (chatPolls[activeRoom] || []).map(p => {
      if (p.id === pollId && p.userVotedOption === null) {
        const userVotes = { ...p.votes, [optionId]: p.votes[optionId] + 1 };
        
        // Simulate other channel members voting too
        const currentRoom = chatRooms.find(r => r.id === activeRoom);
        const memberCount = currentRoom ? (currentRoom.memberIds || []).length : 0;
        
        if (memberCount > 0) {
          for (let i = 0; i < memberCount; i++) {
            const randomOpt = Math.random() > 0.5 ? 1 : 2;
            userVotes[randomOpt] = userVotes[randomOpt] + 1;
          }
        }

        return {
          ...p,
          votes: userVotes,
          userVotedOption: optionId
        };
      }
      return p;
    });

    setChatPolls({
      ...chatPolls,
      [activeRoom]: updated
    });
    showNotification('🎯 Your vote has been recorded.');
  };

  const connectedPeers = (peers || []).filter(p => p.status === 'Connected');

  return (
    <section className="animate-fadeIn">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Study Chat Channels</h2>
        <p className="text-sm text-gray-500 font-medium">Context-aware messaging for study circles and folder coordination.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden h-[540px] shadow-sm">
        
        {/* Thread sidebar */}
        <aside className="border-r border-[#E2E8F0] p-4 bg-gray-50 overflow-y-auto flex flex-col gap-2.5 col-span-1 border-b md:border-b-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-extrabold uppercase text-gray-400 tracking-wider block">Channels</span>
            <button 
              className="text-[9px] font-black bg-[#111827] text-white py-1 px-2.5 rounded-lg hover:bg-black transition shadow-xs"
              onClick={() => setCreateChannelOpen(true)}
            >
              + Create
            </button>
          </div>
          
          {chatRooms.length === 0 ? (
            <div className="text-center py-8 text-[10px] text-gray-400 font-bold border border-dashed border-gray-200 rounded-xl bg-white mt-1">
              No channels created yet.
            </div>
          ) : (
            chatRooms.map(room => (
              <button 
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                className={`flex items-center gap-3 p-3 rounded-xl transition text-left w-full ${
                  activeRoom === room.id ? 'bg-[#111827] text-white shadow-sm' : 'hover:bg-white text-gray-700 hover:shadow-xs border border-transparent hover:border-gray-100'
                }`}
              >
                <span className="text-xl">{room.icon}</span>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold truncate">{room.name}</div>
                  <div className={`text-[10px] mt-0.5 truncate ${activeRoom === room.id ? 'text-white/60' : 'text-gray-400'}`}>
                    {(chatMessages[room.id] || []).length > 0
                      ? `${chatMessages[room.id][chatMessages[room.id].length - 1].author}: ${chatMessages[room.id][chatMessages[room.id].length - 1].text}`
                      : room.preview}
                  </div>
                </div>
              </button>
            ))
          )}
        </aside>

        {/* Chat frame */}
        {chatRooms.length === 0 || !activeRoom ? (
          <div className="flex flex-col items-center justify-center col-span-3 h-full p-8 bg-slate-50/50 text-center">
            <span className="text-4xl mb-4">💬</span>
            <h3 className="font-extrabold text-[15px] text-[#111827] mb-1">No Chat Channels</h3>
            <p className="text-xs text-gray-400 font-semibold mb-6 max-w-xs leading-relaxed mx-auto">
              Create a dedicated study circle channel with your connected classmates to coordinate timetables and coordinate folders.
            </p>
            <button 
              className="bg-[#111827] text-white hover:bg-black py-2.5 px-5 rounded-xl font-bold text-xs transition shadow-sm"
              onClick={() => setCreateChannelOpen(true)}
            >
              + Create Study Channel
            </button>
          </div>
        ) : (
          <div className="flex flex-col col-span-3 h-full">
            
            {/* Header */}
            <div className="border-b border-[#E2E8F0] py-3.5 px-6 flex items-center gap-3 bg-white">
              <span className="text-xl">{chatRooms.find(r => r.id === activeRoom)?.icon || '👥'}</span>
              <div>
                <h3 className="font-extrabold text-sm text-[#111827]">{chatRooms.find(r => r.id === activeRoom)?.name}</h3>
                <p className="text-[10px] text-gray-400 font-semibold">{chatRooms.find(r => r.id === activeRoom)?.members || 0} members linked</p>
              </div>
            </div>

            {/* Message feed */}
            <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 flex flex-col gap-4">
              {(chatMessages[activeRoom] || []).length === 0 ? (
                <div className="my-auto text-center py-12 text-gray-400 font-semibold text-xs">
                  No messages yet. Send a message to start coordinating!
                </div>
              ) : (
                (chatMessages[activeRoom] || []).map(msg => (
                  <div key={msg.id} className={`flex items-start ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.type !== 'user' && (
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center mr-2.5 shadow-sm border border-indigo-200">
                        {msg.avatar}
                      </div>
                    )}
                    <div className={`max-w-[70%] rounded-xl p-3 shadow-xs border ${
                      msg.type === 'user' 
                        ? 'bg-[#111827] text-white border-black rounded-tr-none' 
                        : 'bg-white text-gray-800 border-slate-100 rounded-tl-none'
                    }`}>
                      <div className={`text-[9px] font-extrabold uppercase mb-1 ${msg.type === 'user' ? 'text-white/50' : 'text-gray-400'}`}>
                        {msg.author}
                      </div>
                      <p className="text-xs font-semibold leading-relaxed">{msg.text}</p>
                    </div>
                    {msg.type === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-[#111827] text-white font-black text-xs flex items-center justify-center ml-2.5 shadow-sm border border-black">
                        {msg.avatar}
                      </div>
                    )}
                  </div>
                ))
              )}

              {/* Custom Poll list */}
              {(chatPolls[activeRoom] || []).map(poll => {
                const total = poll.votes[1] + poll.votes[2];
                const pct1 = total ? Math.round((poll.votes[1] / total) * 100) : 0;
                const pct2 = total ? Math.round((poll.votes[2] / total) * 100) : 0;
                const hasVoted = poll.userVotedOption !== null;

                return (
                  <div className="flex justify-start" key={poll.id}>
                    <div className="bg-white border border-[#111827]/10 rounded-xl p-4 w-full max-w-[440px] shadow-sm animate-fadeIn">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Interactive Poll</span>
                      <h4 className="font-extrabold text-sm text-gray-900 mb-1">{poll.question}</h4>
                      <p className="text-[10px] text-gray-400 font-semibold mb-4">Cast your vote to coordinate schedules</p>
                      
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-xs font-bold text-gray-700">
                            <span>{poll.opt1}</span>
                            <span>{poll.votes[1]} votes ({pct1}%)</span>
                          </div>
                          <div className="flex gap-3 items-center">
                            <LocalProgressBar value={pct1} color="#111827" />
                            <button 
                              className="bg-[#111827] hover:bg-black text-white py-1 px-3 rounded-md text-[10px] font-bold transition disabled:opacity-40"
                              disabled={hasVoted}
                              onClick={() => handleVoteCustomPoll(poll.id, 1)}
                            >
                              {poll.userVotedOption === 1 ? 'Voted' : 'Vote'}
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-xs font-bold text-gray-700">
                            <span>{poll.opt2}</span>
                            <span>{poll.votes[2]} votes ({pct2}%)</span>
                          </div>
                          <div className="flex gap-3 items-center">
                            <LocalProgressBar value={pct2} color="#111827" />
                            <button 
                              className="bg-[#111827] hover:bg-black text-white py-1 px-3 rounded-md text-[10px] font-bold transition disabled:opacity-40"
                              disabled={hasVoted}
                              onClick={() => handleVoteCustomPoll(poll.id, 2)}
                            >
                              {poll.userVotedOption === 2 ? 'Voted' : 'Vote'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <div className="border-t border-[#E2E8F0] p-4 flex gap-3 items-center bg-white">
              <button className="bg-gray-100 hover:bg-gray-200 py-2 px-3 rounded-lg text-lg transition border border-gray-200" onClick={handleAddChatPoll} title="Create Poll">
                📊
              </button>
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] bg-[#F9FAFB]"
              />
              <button className="bg-[#111827] hover:bg-black text-white font-extrabold text-xs py-2.5 px-5 rounded-xl transition shadow-xs" onClick={handleSendMessage}>
                Send
              </button>
            </div>

          </div>
        )}
      </div>

      {/* Create Channel Modal */}
      {createChannelOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-[400px] w-full p-6 shadow-xl animate-scaleIn">
            <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-sm text-[#111827]">Create Chat Channel</h3>
              <button className="text-gray-400 hover:text-gray-600 transition p-1" onClick={() => setCreateChannelOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateChannelSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Channel Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. ITMC212 - Study Group" 
                  required 
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#111827]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Emoji Icon</label>
                <select 
                  value={newChannelIcon}
                  onChange={(e) => setNewChannelIcon(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#111827] bg-white text-gray-700"
                >
                  <option value="👥">👥 Group</option>
                  <option value="💬">💬 Chat</option>
                  <option value="🚀">🚀 Project</option>
                  <option value="💻">💻 Lab</option>
                  <option value="📚">📚 Exam Study</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Select Connected Peers to Invite</label>
                {connectedPeers.length === 0 ? (
                  <div className="text-[10px] text-amber-600 font-bold bg-amber-50 border border-amber-100 p-3 rounded-lg leading-relaxed">
                    ⚠️ No connected peers found. Please add classmates on the Connections page first so you can select them here!
                  </div>
                ) : (
                  <div className="max-h-28 overflow-y-auto border border-slate-200 rounded-lg p-2 flex flex-col gap-1 bg-slate-50">
                    {connectedPeers.map(peer => (
                      <label key={peer.id} className="flex items-center gap-2.5 p-1.5 hover:bg-white rounded-md cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={selectedPeerIds.includes(peer.id)}
                          onChange={() => {
                            if (selectedPeerIds.includes(peer.id)) {
                              setSelectedPeerIds(selectedPeerIds.filter(id => id !== peer.id));
                            } else {
                              setSelectedPeerIds([...selectedPeerIds, peer.id]);
                            }
                          }}
                          className="w-4 h-4 accent-[#111827]"
                        />
                        <span className="text-xs font-bold text-gray-700">{peer.name} <span className="text-[10px] text-gray-400 font-semibold">({peer.major})</span></span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button type="button" className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-bold text-xs hover:bg-gray-50 transition" onClick={() => setCreateChannelOpen(false)}>Cancel</button>
                <button type="submit" className="bg-[#111827] text-white hover:bg-black py-2 px-4 rounded-lg font-bold text-xs transition" disabled={connectedPeers.length === 0}>Create Room</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Chat;
