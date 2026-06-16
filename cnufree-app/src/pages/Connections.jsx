import React, { useState } from 'react';
import { Mail, Trash2 } from 'lucide-react';

function Connections({ peers, setPeers, showNotification }) {
  const [addConnectionOpen, setAddConnectionOpen] = useState(false);
  const [connectionName, setConnectionName] = useState('');
  const [connectionMajor, setConnectionMajor] = useState('');
  const [connectionEmail, setConnectionEmail] = useState('');
  const [connectionColor, setConnectionColor] = useState('#8B5CF6'); // Purple default
  const [editingPeer, setEditingPeer] = useState(null);

  const handleAddConnectionSubmit = (e) => {
    e.preventDefault();
    if (!connectionName || !connectionMajor || !connectionEmail) return;

    if (!connectionEmail.endsWith('adnu.edu.ph') && !connectionEmail.endsWith('cnu.edu.ph')) {
      alert('Error: Please enter a valid student email address (ends with adnu.edu.ph or cnu.edu.ph)');
      return;
    }

    const newPeer = {
      id: Date.now(),
      name: connectionName.trim(),
      major: connectionMajor.trim(),
      color: connectionColor,
      status: 'Pending Request',
      active: false,
      email: connectionEmail.trim(),
      busySlots: [] // Initialize with empty slots
    };

    setPeers([...peers, newPeer]);
    setConnectionName('');
    setConnectionMajor('');
    setConnectionEmail('');
    setConnectionColor('#8B5CF6');
    setAddConnectionOpen(false);
    showNotification(`✉️ Connection request sent to ${newPeer.name}`);
  };

  const handleToggleSlot = (day, hour) => {
    if (!editingPeer) return;
    const isBusy = editingPeer.busySlots?.some(s => s.day === day && s.hour === hour);
    let updatedSlots;
    if (isBusy) {
      updatedSlots = (editingPeer.busySlots || []).filter(s => !(s.day === day && s.hour === hour));
    } else {
      updatedSlots = [...(editingPeer.busySlots || []), { day, hour }];
    }
    
    const updatedPeer = { ...editingPeer, busySlots: updatedSlots };
    setEditingPeer(updatedPeer);
    setPeers(peers.map(p => p.id === editingPeer.id ? updatedPeer : p));
  };

  const handleAcceptPeer = (peerId, peerName) => {
    setPeers(peers.map(p => p.id === peerId ? { ...p, status: 'Connected', active: true } : p));
    showNotification(`🟢 Connected with ${peerName}. Schedules synced!`);
  };

  const handleDeletePeer = (peerId, peerName) => {
    setPeers(peers.filter(p => p.id !== peerId));
    showNotification(`🗑️ Removed ${peerName} from your connection list.`);
  };

  return (
    <section className="animate-fadeIn">
      <div className="flex flex-wrap gap-4 justify-between items-start mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Connected Peer Network</h2>
          <p className="text-sm text-gray-500 font-medium">Manage classmates sharing schedules with your workspace.</p>
        </div>
        <button className="bg-[#111827] text-white hover:bg-black py-2 px-4 rounded-lg font-bold text-xs transition shadow-sm" onClick={() => setAddConnectionOpen(true)}>
          + Add Connection
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {peers.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-400 font-semibold text-xs border border-dashed border-slate-200 rounded-2xl bg-white p-6">
            No connected peers yet. Click "+ Add Connection" to sync calendars with a classmate!
          </div>
        ) : (
          peers.map(peer => {
            const initials = peer.name.split(' ').map(n => n[0]).join('');
            return (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col items-center text-center relative shadow-sm" key={peer.id}>
                <div 
                  style={{ backgroundColor: `${peer.color}15`, color: peer.color }}
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm mb-4 border border-gray-100"
                >
                  {initials}
                </div>
                <h4 className="font-extrabold text-[14px] text-gray-900 mb-0.5">{peer.name}</h4>
                <p className="text-[11px] text-gray-400 font-semibold mb-4">{peer.major}</p>
                
                <span className={`text-[9px] font-extrabold px-3 py-0.5 rounded-full border mb-6 ${
                  peer.status === 'Connected' 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                    : 'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {peer.status}
                </span>

                <div className="flex gap-2 w-full mt-auto pt-4 border-t border-slate-50">
                  {peer.status === 'Connected' ? (
                    <button 
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3 rounded-lg font-bold text-xs transition flex-1"
                      onClick={() => setEditingPeer(peer)}
                    >
                      Edit Schedule
                    </button>
                  ) : (
                    <button className="bg-[#111827] hover:bg-black text-white py-1.5 px-3 rounded-lg font-bold text-xs transition flex-1" onClick={() => handleAcceptPeer(peer.id, peer.name)}>
                      Accept
                    </button>
                  )}
                  <button className="bg-red-50 hover:bg-red-100 text-red-500 p-2 rounded-lg transition" onClick={() => handleDeletePeer(peer.id, peer.name)} title="Remove connection">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Invite Modal */}
      {addConnectionOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-[420px] w-full p-6 shadow-xl animate-scaleIn">
            <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-sm text-[#111827]">Add Connection</h3>
              <button className="text-gray-400 hover:text-gray-600 transition p-1" onClick={() => setAddConnectionOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleAddConnectionSubmit} className="flex flex-col gap-4">
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                Enter your classmate's details to invite them to sync calendars with your workspace.
              </p>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Classmate Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Luke Sandigan" 
                  required 
                  value={connectionName}
                  onChange={(e) => setConnectionName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#111827]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Course / Major</label>
                <input 
                  type="text" 
                  placeholder="e.g. BS Information Technology" 
                  required 
                  value={connectionMajor}
                  onChange={(e) => setConnectionMajor(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#111827]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Student Email Address</label>
                <div className="relative flex items-center">
                  <Mail size={14} className="absolute left-3.5 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="e.g. classmate@adnu.edu.ph" 
                    required 
                    value={connectionEmail}
                    onChange={(e) => setConnectionEmail(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 pl-10 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Theme Color</label>
                <select 
                  value={connectionColor}
                  onChange={(e) => setConnectionColor(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#111827] bg-white text-gray-700"
                >
                  <option value="#8B5CF6">Purple</option>
                  <option value="#F97316">Orange</option>
                  <option value="#10B981">Green</option>
                  <option value="#3B82F6">Blue</option>
                  <option value="#EF4444">Red</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button type="button" className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-bold text-xs hover:bg-gray-50 transition" onClick={() => setAddConnectionOpen(false)}>Cancel</button>
                <button type="submit" className="bg-[#111827] text-white hover:bg-black py-2 px-4 rounded-lg font-bold text-xs transition">Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Classmate Schedule Editor Modal */}
      {editingPeer && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-[600px] w-full p-6 shadow-xl animate-scaleIn">
            <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-[#111827]">Edit Classmate's Schedule</h3>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Configure {editingPeer.name}'s busy class periods for shared vacancy calculations.</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition p-1" onClick={() => setEditingPeer(null)}>✕</button>
            </div>

            <div className="mb-5 overflow-x-auto border border-gray-100 rounded-xl">
              <table className="min-w-[500px] w-full border-collapse">
                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-gray-100">
                    <th className="py-2 px-3 text-[10px] font-black text-gray-400 uppercase text-center border-r border-gray-100 w-24">Time</th>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                      <th key={day} className="py-2 px-3 text-[10px] font-black text-gray-400 uppercase text-center border-r last:border-r-0 border-gray-100">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {['09:00', '11:00', '13:00', '15:00'].map(hour => {
                    const formatHour = (h) => {
                      if (h === '09:00') return '9:00 AM';
                      if (h === '11:00') return '11:00 AM';
                      if (h === '13:00') return '1:00 PM';
                      if (h === '15:00') return '3:00 PM';
                      return h;
                    };
                    return (
                      <tr key={hour} className="divide-x divide-gray-100">
                        <td className="py-3 px-2 text-[10px] font-bold text-gray-500 text-center bg-[#F9FAFB]">{formatHour(hour)}</td>
                        {['mon', 'tue', 'wed', 'thu', 'fri'].map(day => {
                          const isBusy = editingPeer.busySlots?.some(s => s.day === day && s.hour === hour);
                          return (
                            <td key={day} className="p-1.5 h-[60px]">
                              <button
                                type="button"
                                onClick={() => handleToggleSlot(day, hour)}
                                className={`w-full h-full rounded-lg text-[10px] font-black transition flex flex-col justify-center items-center gap-0.5 border ${
                                  isBusy 
                                    ? 'bg-[#111827] text-white border-black shadow-xs' 
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'
                                }`}
                              >
                                <span>{isBusy ? 'BUSY' : 'VACANT'}</span>
                                <span className="text-[8px] opacity-75 font-semibold">{isBusy ? 'Class' : 'Free'}</span>
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
              <button 
                type="button" 
                className="bg-[#111827] text-white hover:bg-black py-2 px-6 rounded-lg font-bold text-xs transition" 
                onClick={() => {
                  setEditingPeer(null);
                  showNotification(`📅 Saved ${editingPeer.name}'s custom timetable.`);
                }}
              >
                Done / Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Connections;
