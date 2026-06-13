
// import logo from '../assets/logo.png';

function CardWrapper({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
        <div className="mb-8">
            <img  className="block w-[250px] sm:w-[200px] md:w-[300px]"   src="" alt="hirestreet-logo"/> 
        </div>

      <div className="w-full max-w-lg border border-gray-200 rounded-2xl shadow-sm p-8">
        {children}
      </div>
    </div>
  );
}

export default CardWrapper