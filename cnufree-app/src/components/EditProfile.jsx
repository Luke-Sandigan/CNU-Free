import { useState } from "react";

function EditProfile({openEdit, closeEdit, update}) {
    const [School, setSchool] = useState("")
    const [Surname, setSurname] = useState("")
    const [Firstname, setFirstname] = useState("")
    const [Idnumber, setIdnumber] = useState("")
    const [year, setYear] = useState("")

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