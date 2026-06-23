

function OnboardingWrap( {children} ) {
  return (
    <div className=" w-full max-w-lg  bg-white flex flex-col items-center py-7 px-4 sm:rounded-3xl">
      
      <div className="flex flex-col w-full items-center ">
            <div className="  py-2 px-3 rounded-xl  bg-[#111827] mb-10">
              <span className="text-lg font-extrabold text-white "> CNU Free </span>
            </div>
          
        {children}
      </div>
    </div>
  );
}

export default OnboardingWrap