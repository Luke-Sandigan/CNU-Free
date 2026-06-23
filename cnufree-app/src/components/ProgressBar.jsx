

function ProgressBar({ percentage, progress }) {
  return (
<div className="flex flex-col items-center w-full">
  <h1 className="mt-6 text-sm text-white text-center"> {percentage} complete </h1>
    
  <div className="mt-4 w-full max-w-md h-2 bg-slate-600 sm:rounded">
    <div className="h-full bg-white transition-all duration-500 ease-in-out sm:rounded"  style={{ width: `${progress}%` }}></div>
  </div>
</div>
  )
}

export default ProgressBar