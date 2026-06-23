import { useState } from "react";

function EditProfile({openEdit, closeEdit, profile, onUpdateProfile}) {


    if (!openEdit) return null;

  return (
    <>
        <div
            className="fixed inset-0 bg-black/50 z-70 flex items-center justify-center"
            onClick={closeEdit}
        />

        <div>

        </div>

    </>
  )
}

export default EditProfile