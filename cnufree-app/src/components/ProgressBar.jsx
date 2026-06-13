

function ProgressBar({ percentage, progress }) {
  return (
<div className="  flex flex-col items-center w-full">
  <h1 className="mt-6 text-sm text-[#A3A3A3] text-center"> {percentage} complete </h1>

  <div className="mt-4 w-full max-w-md h-2 bg-gray-200 ">
    <div className="h-full bg-blue-600  transition-all duration-500 ease-in-out "  style={{ width: `${progress}%` }}></div>
  </div>
</div>
  )
}

export default ProgressBar