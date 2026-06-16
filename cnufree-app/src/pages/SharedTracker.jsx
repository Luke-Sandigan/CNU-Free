import React, { useEffect, useState } from 'react';

function SharedTracker({ peers, onPeerToggle, showNotification, onNavigateToChats }) {
  const trackerTimeSlots = ['09:00', '11:00', '13:00', '15:00'];
  const trackerDays = ['mon', 'tue', 'wed', 'thu', 'fri'];



  const [trackerOverlapSlots, setTrackerOverlapSlots] = useState([]);
  const [trackerSuggestion, setTrackerSuggestion] = useState('');

  const formatTrackerHour = (t) => {
    const h = parseInt(t.split(':')[0]);
    if (h === 9) return '9:00 AM';
    if (h === 11) return '11:00 AM';
    if (h === 13) return '1:00 PM';
    if (h === 15) return '3:00 PM';
    return t;
  };

  useEffect(() => {
    const activeConnectedPeers = peers.filter(p => p.status === 'Connected' && p.active);
    const activeCount = activeConnectedPeers.length;
    let commonMatches = [];

    trackerTimeSlots.forEach(time => {
      trackerDays.forEach(day => {
        let isOverlappedBusy = false;
        activeConnectedPeers.forEach(peer => {
          const slots = peer.busySlots || [];
          if (slots.some(s => s.day === day && s.hour === time)) {
            isOverlappedBusy = true;
          }
        });
        if (!isOverlappedBusy && activeCount > 0) {
          commonMatches.push({ day: day.toUpperCase(), time: time });
        }
      });
    });

    setTrackerOverlapSlots(commonMatches);

    if (activeCount === 0) {
      setTrackerSuggestion('❌ Activate a connection toggle.');
    } else if (commonMatches.length === 0) {
      setTrackerSuggestion('❌ No common vacant times.');
    } else {
      const formatted = commonMatches.slice(0, 2).map(m => `${m.day} at ${formatTrackerHour(m.time)}`).join(' & ');
      setTrackerSuggestion(`🟢 Meetup: ${formatted} (${activeCount} Free)`);
    }
  }, [peers]);

  return (
    <section className="animate-fadeIn">
      <div className="flex flex-wrap gap-4 justify-between items-start mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Shared Timetable Tracker</h2>
          <p className="text-sm text-gray-500 font-medium">Select group connections to find overlapping vacancy slots instantly.</p>
        </div>
        <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-bold text-xs hover:bg-gray-50 transition" onClick={() => showNotification('🔄 Synced shared calendars!')}>
          🔄 Sync Google Calendar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Overlap Grid */}
        <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="font-extrabold text-[15px] text-[#111827]">Shared Vacancy Matrix</span>
            <span className="text-[10px] font-extrabold bg-green-50 text-emerald-600 py-1 px-3 rounded-full border border-emerald-100 uppercase tracking-wider">Active Overlay</span>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-6 bg-[#F9FAFB] border-b border-gray-100">
                <div className="py-3 px-4 text-[11px] font-extrabold text-gray-400 text-center uppercase border-r border-gray-100">Time</div>
                {trackerDays.map(day => (
                  <div key={day} className="py-3 px-4 text-[11px] font-extrabold text-gray-400 text-center uppercase border-r last:border-r-0 border-gray-100">{day}</div>
                ))}
              </div>

              <div className="divide-y divide-gray-100 bg-white">
                {trackerTimeSlots.map(time => (
                  <div className="grid grid-cols-6 divide-x divide-gray-100" key={time}>
                    <div className="py-4 px-3 text-xs font-bold text-gray-500 text-center flex items-center justify-center bg-[#F9FAFB]">{formatTrackerHour(time)}</div>
                    {trackerDays.map(day => {
                      const activePeers = peers.filter(p => p.status === 'Connected' && p.active);
                      let busyList = [];
                      
                      activePeers.forEach(peer => {
                        const slots = peer.busySlots || [];
                        if (slots.some(s => s.day === day && s.hour === time)) {
                          busyList.push(peer.id);
                        }
                      });

                      if (busyList.length > 0) {
                        return (
                          <div key={day} className="p-2 h-[68px] flex items-center justify-center bg-gray-50 text-[10px] font-extrabold text-gray-300 select-none">
                            Class
                          </div>
                        );
                      } else if (activePeers.length > 0) {
                        return (
                          <div key={day} className="p-2 h-[68px] flex items-center justify-center bg-emerald-50/45 border-l-2 border-emerald-400">
                            <div className="text-center">
                              <div className="text-[10px] font-extrabold text-emerald-800">Vacant</div>
                              <div className="text-[9px] font-semibold text-emerald-500 mt-0.5">{activePeers.length} Free</div>
                            </div>
                          </div>
                        );
                      } else {
                        return <div key={day} className="h-[68px]" />;
                      }
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="flex flex-col gap-6">
          
          {/* Toggles */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
            <h4 className="font-extrabold text-sm text-[#111827] mb-1">Toggle Shared Calendars</h4>
            <p className="text-xs text-gray-400 font-semibold mb-4 leading-relaxed">Choose whose calendar is visible on your vacancy overlay grid.</p>
            
            <div className="flex flex-col gap-3">
              {peers.filter(p => p.status === 'Connected').map(peer => (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition" key={peer.id}>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: peer.color }}></span>
                    <span className="text-xs font-bold text-gray-900">{peer.name}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={peer.active} 
                      onChange={() => onPeerToggle(peer.id)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:height-4 after:h-4 after:w-4 after:transition-all peer-checked:bg-[#111827]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestion box */}
          <div className="bg-[#111827] text-white rounded-2xl p-6 shadow-md border border-black flex flex-col gap-3">
            <h4 className="font-extrabold text-sm tracking-tight">Suggested Study Meetup</h4>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">Optimal matching vacant slots where selected peers are free.</p>
            <div className="bg-white/10 text-white border border-white/20 text-xs font-bold py-2.5 px-4 rounded-xl inline-block mt-2 self-start">
              {trackerSuggestion}
            </div>
            <button className="bg-white text-[#111827] hover:bg-gray-100 py-2.5 px-4 rounded-xl font-bold text-xs mt-2 transition w-full" onClick={onNavigateToChats}>
              Create Meetup Poll
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default SharedTracker;
