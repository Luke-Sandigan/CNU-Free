import { X } from 'lucide-react';


function SideBar ({open, close, active}) {
    
    return (
<>
    {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 "
          onClick={close}
        />
      )}

    <aside
      className={`
        p-2 w-64 min-h-screen bg-white border-r border-gray-200
        fixed top-0 left-0 z-40
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
>
      <div className="flex justify-end">
        <button 
          onClick={close}
        >
          <X/>
        </button> 
      </div>
      

      <nav className="flex flex-col">
        <a href="#" className="p-4 hover:bg-gray-100">
          Dashboard
        </a>

        <a href="#" className="p-4 hover:bg-gray-100">
          Profile
        </a>

        <a href="#" className="p-4 hover:bg-gray-100">
          Settings
        </a>
      </nav>
    </aside>
  </>
    );
}

export default SideBar