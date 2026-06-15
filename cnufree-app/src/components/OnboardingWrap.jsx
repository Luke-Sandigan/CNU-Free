

function OnboardingWrap( {children} ) {
  return (
    <div className="mt-[-40px] min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-lg   p-8">
        {children}
      </div>
    </div>
  );
}

export default OnboardingWrap