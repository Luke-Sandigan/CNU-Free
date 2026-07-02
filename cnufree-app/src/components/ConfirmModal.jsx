import { X } from "lucide-react";

function ConfirmModal({
  open,
  close,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-red-600 hover:bg-red-700",
  onConfirm, loading,
}) {
  if (!open) return null;

  return (
    <>
      <div onClick={close} className="fixed inset-0 bg-black/50 z-40" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#111824] rounded-t-2xl  p-5">
            <h2 className="text-xl font-extrabold text-white">{title}</h2>

            <button
              onClick={close}
              className="rounded-full p-2 hover:bg-slate-100"
            >
              <X size={20} color={"white"} />
            </button>
          </div>

          <div className="p-5 ">
            <p className="text-slate-600"> Are you sure you want to remove  <span className="font-bold text-[#111824]"> {message} </span> from your friends list? </p>
          </div>

          <div className="flex gap-3 justify-end p-5">
            <button
              disabled={loading}
              onClick={close}
              className="rounded-lg border border-slate-300 px-5 py-2 font-bold hover:bg-slate-100"
            >
              {cancelText}
            </button>

            <button
              disabled={loading}
              onClick={onConfirm}
              className={`${confirmColor} rounded-lg px-5 py-2 font-bold text-white transition`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmModal;
