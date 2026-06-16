import { X, Calendar, Compass, MessageSquare, Users, User } from 'lucide-react';

function SideBar ({ open, close, activeTab, onTabChange, onTriggerProfile, userName, userCourse }) {
    const getInitials = (name) => {
      if (!name) return 'FP';
      return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    };

    const menuItems = [
      { id: 'planner', label: 'My Planner', icon: <Calendar size={18} /> },
      { id: 'tracker', label: 'Shared Tracker', icon: <Compass size={18} /> },
      { id: 'chats', label: 'Chat', icon: <MessageSquare size={18} /> },
      { id: 'connections', label: 'Connections', icon: <Users size={18} /> }
    ];
    
    return (
      <>
        {open && (
            <div
              className="fixed inset-0 bg-black/50 z-30"
              onClick={close}
            />
          )}

        <aside
          className={`
            p-4 w-64 min-h-screen bg-white border-r border-gray-200
            fixed top-0 left-0 z-40 flex flex-col justify-between
            transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-extrabold text-[18px] text-[#111827]">Workspace</span>
              <button 
                onClick={close}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20}/>
              </button> 
            </div>
            
            <nav className="flex flex-col gap-1">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    close();
                  }}
                  className={`flex items-center gap-3 p-3 text-[14px] font-semibold rounded-lg text-left transition-all w-full ${
                    activeTab === item.id 
                      ? 'bg-gray-100 text-[#111827]' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#111827]'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              
              <button
                onClick={() => {
                  onTriggerProfile();
                  close();
                }}
                className="flex items-center gap-3 p-3 text-[14px] font-semibold rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-[#111827] mt-4 border-t border-gray-100 pt-4 w-full"
              >
                <User size={18} />
                Student ID Profile
              </button>
            </nav>
          </div>

          <div className="border-t border-gray-100 pt-4 mt-auto">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-100 text-[#111827] font-extrabold text-sm border border-gray-200">
                {getInitials(userName)}
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-sm text-[#111827] truncate">{userName || 'Francis Paul'}</div>
                <div className="text-xs text-gray-400 truncate">{userCourse || 'BS Computer Science'}</div>
              </div>
            </div>
          </div>
        </aside>
      </>
    );
}

export default SideBar;