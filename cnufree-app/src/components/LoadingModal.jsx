import logo from '../assets/logo2.png';

function LoadingModal({ open }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-slate-200 px-10 py-10 flex flex-col items-center gap-6">

        <div className="relative flex items-center justify-center w-[90px] h-[90px]">
          <div
            className="absolute inset-0 rounded-[22px] bg-[#1e2a3a]/10"
            style={{ animation: 'pulse-ring 1.1s cubic-bezier(0.4,0,0.6,1) infinite' }}
          />
          <div
            className="absolute inset-0 rounded-[22px] bg-[#1e2a3a]/10"
            style={{ animation: 'pulse-ring2 1.1s cubic-bezier(0.4,0,0.6,1) infinite' }}
          />
          <img
            src={logo}
            alt="logo"
            className="w-[72px] h-[72px] rounded-[18px] object-cover relative z-10"
            style={{ animation: 'heartbeat 1.1s cubic-bezier(0.4,0,0.6,1) infinite' }}
          />
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="font-bold text-[15px] text-[#111824]">Loading</p>
          <div className="flex gap-1">
            <span className="w-[6px] h-[6px] rounded-full bg-slate-400 inline-block" style={{ animation: 'fade-dot 1.1s ease-in-out infinite', animationDelay: '0ms' }} />
            <span className="w-[6px] h-[6px] rounded-full bg-slate-400 inline-block" style={{ animation: 'fade-dot 1.1s ease-in-out infinite', animationDelay: '200ms' }} />
            <span className="w-[6px] h-[6px] rounded-full bg-slate-400 inline-block" style={{ animation: 'fade-dot 1.1s ease-in-out infinite', animationDelay: '400ms' }} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoadingModal