import {
  X,
  FolderOpen,
  Target,
  MessageSquare,
  Users,
} from "lucide-react";


function Sidebar({ open, onClose, active, onSelect }) {

    const NAV_ITEMS = [
  { id: "planner", label: "My Planner", icon: FolderOpen },
  { id: "tracker", label: "Shared Tracker", icon: Target },
  { id: "chats", label: "Study Chats", icon: MessageSquare },
  { id: "connections", label: "Connections", icon: Users },
];

  return (
    <>
      {/* backdrop (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
          onClick={onClose}
        />
      )}
 
      {/* sidebar panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col justify-between border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out md:sticky md:top-[57px] md:h-[calc(100vh-57px)] md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* mobile-only header inside drawer */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 md:hidden">
            <span className="font-bold text-slate-900">Menu</span>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>
 
          {/* nav links */}
          <nav className="space-y-1 px-3 py-4">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelect(item.id);
                    onClose();
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
 
        {/* profile footer */}
        <div className="border-t border-slate-100 px-3 py-4">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
              FP
            </div>
            <div className="text-sm">
              <p className="font-semibold text-slate-900">Francis Paul</p>
              <p className="text-slate-400">Information Technology</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar