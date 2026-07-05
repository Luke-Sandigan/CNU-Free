import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo2.png";
import { useToast } from "../context/ToastContext";

function AddScheduleModal({
  open,
  onClose,
  onSave,
  onUpdate,
  editingSchedule,
}) {
  const { showToast } = useToast();
  const [selectedDays, setSelectedDays] = useState(["Mon"]);
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [room, setRoom] = useState("");
  const [color, setColor] = useState("violet");

  const subjectRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const roomRef = useRef(null);

  const [saving, setSaving] = useState(false);

  function handleEnter(e, nextRef) {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  }

  function resetForm() {
    setSelectedDays(["Mon"]);
    setSubject("");
    setStartTime("");
    setEndTime("");
    setRoom("");
    setColor("violet");
  }

  useEffect(() => {
    if (editingSchedule) {
      setSelectedDays([editingSchedule.day]);
      setSubject(editingSchedule.subject);
      setStartTime(editingSchedule.startTime);
      setEndTime(editingSchedule.endTime);
      setRoom(editingSchedule.room);
      setColor(editingSchedule.color);
    } else {
      resetForm();
    }
  }, [editingSchedule]);

  function handleDayChange(day) {
    setSelectedDays((previousDays) => {
      if (previousDays.includes(day)) {
        return previousDays.filter((selectedDay) => selectedDay !== day);
      }

      return [...previousDays, day];
    });
  }

  async function handleSave() {
    if (
      selectedDays.length === 0 ||
      !subject.trim() ||
      !startTime ||
      !endTime ||
      !room.trim()
    ) {
      showToast({
        type: "warning",
        message: "Please complete all fields.",
      });

      return;
    }

    try {
      setSaving(true);

      if (editingSchedule) {
        await onUpdate({
          id: editingSchedule.id,
          day: selectedDays[0],
          subject,
          startTime,
          endTime,
          room,
          color,
        });

        showToast({
          type: "success",
          message: "Schedule updated successfully.",
        });
      } else {
        const schedules = selectedDays.map((day) => ({
          day,
          subject,
          startTime,
          endTime,
          room,
          color,
        }));

        await onSave(schedules);

        showToast({
          type: "success",
          message: "Schedule added successfully.",
        });

        resetForm();
        subjectRef.current?.focus();
      }
    } finally {
      setSaving(false);
    }
  }
  // useEffect(() => {
  //   if (editingSchedule) {
  //     setSelectedDays([editingSchedule.day])
  //     setSubject(editingSchedule.subject);
  //     setStartTime(editingSchedule.startTime);
  //     setEndTime(editingSchedule.endTime);
  //     setRoom(editingSchedule.room);
  //     setColor(editingSchedule.color);
  //   }

  //   return () => {
  //     setSelectedDays(["Mon"]);
  //     setSubject("");
  //     setStartTime("");
  //     setEndTime("");
  //     setRoom("");
  //     setColor("violet");
  // };
  // }, [editingSchedule]);

  //   const handleDayChange = (day) => {
  //     if (selectedDays.includes(day)) {
  //       setSelectedDays(
  //         selectedDays.filter(
  //           (selectedDay) => selectedDay !== day
  //         )
  //       );
  //     } else {
  //       setSelectedDays([
  //         ...selectedDays,
  //         day,
  //       ]);
  //     }
  //   };

  //  const handleSave = () => {
  //   if (
  //     selectedDays.length === 0 ||
  //     !subject ||
  //     !startTime ||
  //     !endTime ||
  //     !room
  //   ) {
  //     alert("Please complete all fields");
  //     return;
  //   }

  //   if (editingSchedule) {
  //     onUpdate({
  //       ...editingSchedule,
  //       day: selectedDays[0],
  //       subject,
  //       startTime,
  //       endTime,
  //       room,
  //       color,
  //     });

  //     setSelectedDays(["Mon"]);
  //     setSubject("");
  //     setStartTime("");
  //     setEndTime("");
  //     setRoom("");

  //     onClose();

  //   } else {

  //     const schedules = selectedDays.map(
  //       (day) => ({
  //         id: Date.now() + Math.random(),
  //         day,
  //         subject,
  //         startTime,
  //         endTime,
  //         room,
  //         color,
  //       })
  //     );

  //     onSave(schedules);

  //     setSelectedDays(["Mon"]);
  //     setSubject("");
  //     setStartTime("");
  //     setEndTime("");
  //     setRoom("");

  //     onClose();
  //   }
  // };

  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[95%] max-w-md rounded-xl bg-white p-6">
        <div className="flex justify-between w-full items-center mb-6">
          <h2 className=" text-lg font-extrabold">
            {editingSchedule ? "Edit Schedule" : "Add Schedule"}
          </h2>
          <img className="block w-7 h-7" src={logo} alt="CNU-logo" />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between gap-2 w-full mb-1">
            <div className=" flex flex-col gap-2 w-full">
              <label className="font-extrabold text:sm flex items-center gap-2">
                {" "}
                ☀️ Choose a day{" "}
              </label>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((day) => (
                  <label
                    key={day}
                    className=" w-32 flex items-center gap-1 rounded border px-2 py-1 text-xs"
                  >
                    <input
                      type="checkbox" 
                      checked={selectedDays.includes(day)}
                      onChange={() => handleDayChange(day)}
                    />

                    {day}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 text:md">
            <label className="font-extrabold"> 📚 Subject Code </label>
            <input
              ref={subjectRef} maxLength={20}
              className="rounded-lg border p-2"
              placeholder="e.g., SOCS104"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onKeyDown={(e) => handleEnter(e, startTimeRef)}
            />
          </div>

          <div className="flex items-center justify-between w-full gap-2 mb-1">
            <div className="flex flex-col w-full gap-2">
              <label className="font-extrabold"> ⏰ Start Time </label>
              <input
                ref={startTimeRef}
                className="rounded-lg border p-2"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                onKeyDown={(e) => handleEnter(e, endTimeRef)}
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="font-extrabold"> ⏰ End Time </label>
              <input
                ref={endTimeRef}
                className="rounded-lg border p-2"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                onKeyDown={(e) => handleEnter(e, roomRef)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-extrabold"> 🏣 Room Number</label>
            <input
              ref={roomRef} maxLength={20}
              className="rounded-lg border p-2 text-md"
              placeholder="e.g., AL212/LAB-2"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label className="font-extrabold">🎨 Schedule Color</label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setColor("violet")}
                className={`
                w-8 h-8 rounded-full bg-violet-500
                ${color === "violet" ? "ring-4 ring-violet-300" : ""}
              `}
              />

              <button
                type="button"
                onClick={() => setColor("orange")}
                className={`
                  w-8 h-8 rounded-full bg-orange-500
                  ${color === "orange" ? "ring-4 ring-orange-300" : ""}
                `}
              />

              <button
                type="button"
                onClick={() => setColor("emerald")}
                className={`
                  w-8 h-8 rounded-full bg-emerald-500
                  ${color === "emerald" ? "ring-4 ring-emerald-300" : ""}
                `}
              />

              <button
                type="button"
                onClick={() => setColor("blue")}
                className={`
                  w-8 h-8 rounded-full bg-blue-500
                  ${color === "blue" ? "ring-4 ring-blue-300" : ""}
                `}
              />

              <button
                type="button"
                onClick={() => setColor("pink")}
                className={`
                  w-8 h-8 rounded-full bg-pink-500
                  ${color === "pink" ? "ring-4 ring-pink-300" : ""}
                `}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mb-2">
            <button
              onClick={onClose}
              className="rounded-lg border px-4 py-2 font-extrabold hover:bg-[#111824] hover:text-white 
                         transition-all duration-300 ease-linear"
            >
              Cancel
            </button>

            <button
              disabled={saving}
              onClick={handleSave}
              className="rounded-lg bg-slate-900 px-4 hover:bg-[#3d4f6e] transition-all duration-200 ease-linear
              py-2 text-white font-extrabold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving
                ? editingSchedule
                  ? "Updating..."
                  : "Saving..."
                : editingSchedule
                  ? "Update"
                  : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddScheduleModal;
