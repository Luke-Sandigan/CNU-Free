function SearchProfileModal({ open, close }) {

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0
        bg-black/40
        z-[9999]
        flex items-center justify-center
        p-4
      "
    >

      <div
        className="
          bg-white
          w-full
          max-w-lg
          rounded-2xl
          shadow-xl
          p-5
          max-h-[80vh]
          overflow-y-auto
        "
      >

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-extrabold">
            Add Friend
          </h2>

          <button
            onClick={close}
            className="font-bold text-slate-500"
          >
            ✕
          </button>
        </div>

      

        <input
          type="text"
          placeholder="Search username..."
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            px-4
            py-3
            mb-4
          "
        />

        {/* Results */}

        <div className="flex flex-col gap-3">

          <div className="border rounded-xl p-3 flex justify-between items-center">
            <div>
              <p className="font-bold">
                Luke Sandigan
              </p>

              <p className="text-sm text-slate-500">
                @ilovemybabygirl
              </p>
            </div>

            <button
              className="
                bg-[#111824]
                text-white
                px-4
                py-2
                rounded-lg
                font-bold
              "
            >
              Add
            </button>
          </div>

          <div className="border rounded-xl p-3 flex justify-between items-center">
            <div>
              <p className="font-bold">
                John Doe
              </p>

              <p className="text-sm text-slate-500">
                @johndoe
              </p>
            </div>

            <button
              className="
                bg-[#111824]
                text-white
                px-4
                py-2
                rounded-lg
                font-bold
              "
            >
              Add
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default SearchProfileModal;