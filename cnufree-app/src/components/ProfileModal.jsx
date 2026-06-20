import logo from '../assets/logo2.png';

function ProfileModal({open, close, edit}) {
    if (!open) return null; 

  return (

    <>
    <div
        className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center"
        onClick={close}
     >

     </div>

        <div
        className="
            fixed flex flex-col 
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-120
            bg-white 
            border-none
            rounded-[15px]
            z-40
            shadow-[0_8px_12px_-4px_rgba(255,255,255,0.5)]
        "
        >

        <div className="h-23 bg-[#111827]  rounded-t-[15px]"/>
 
        <div className="w-full py-4 px-3">
            
            
            <div className=" -mt-21 flex items-center gap-2 justify-center mb-10">
                <div className="hidden sm:block ">
                    <p className="font-extrabold text-white text-[30px] "> CNU <span > Free </span></p>
                </div>
            </div>

            <div>
                Profile
            </div>
        </div>    
    </div>

   

    </>
  )
}

export default ProfileModal