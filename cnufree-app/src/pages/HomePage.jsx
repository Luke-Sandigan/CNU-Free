import { useState, useEffect } from "react";
import logo from '../assets/logo2.png';
// import SideBar from "../components/SideBar.jsx";
import HomeNavBar from "../components/HomeNavBar";
import WeeklyScheduleCard from "../components/WeeklyScheduleCard.jsx";
import AddScheduleModal from "../components/AddScheduleModal.jsx";
import { getSchedules, createSchedule, updateSchedule, deleteSchedule, deleteAllSchedules, } from "../services/scheduleService";
import { CalendarSync } from "lucide-react";


function HomePage() {


  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [showResetConfirm, setResetConfirm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);


  async function loadSchedules() {
    const data = await getSchedules();
    setSchedule(data);
  }

  async function handleAddSchedule(newSchedules) {

    try {

        for (const schedule of newSchedules) {

            await createSchedule({
                subject: schedule.subject,
                room: schedule.room,
                day: schedule.day,
                start_time: schedule.startTime,
                end_time: schedule.endTime,
                color: schedule.color,
            });

        }
        await loadSchedules();
        setIsModalOpen(false);
    }

      catch (error) {
          console.error(error);
          alert(error.message);
      }
  }

  useEffect(() => {
        loadSchedules();
  }, []);

  async function handleUpdateSchedule(updatedSchedule) {

      try {
          await updateSchedule(updatedSchedule);
          await loadSchedules();
          setIsEditOpen(false);
          setEditingSchedule(null);
      }

      catch (error) {
          console.error(error);
          alert(error.message);
      }
  }

  async function handleDeleteSchedule(scheduleId) {

      const confirmed = window.confirm(
          "Are you sure you want to delete this schedule?"
      );

      if (!confirmed) { return; }

      try {
          await deleteSchedule(scheduleId);
          await loadSchedules();
      }

      catch (error) {
          console.error(error);
          alert(error.message);
      }
  }

  async function handleResetSchedules() {

    try {
        await deleteAllSchedules();
        await loadSchedules();
    }

    catch (error) {
        console.error(error);
        alert(error.message);

    }

}

  // const handleUpdateSchedule = (updatedSchedule) => {
  //   setSchedule(
  //     schedule.map((item) =>
  //       item.id === updatedSchedule.id
  //         ? updatedSchedule
  //         : item
  //     )
  //   );
  // };

  // const handleDeleteSchedule = (scheduleId) => {
  //   setSchedule(
  //     schedule.filter(
  //       (item) => item.id !== scheduleId
  //     )
  //   );
  // };

  // const handleAddSchedule = (newSchedules) => {
  //   setSchedule([
  //     ...schedule,
  //     ...newSchedules,
  //   ]);
  // };

  return (
    <div className="flex flex-col items-center overflow-hidden">

    


      <HomeNavBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <main className="w-full sm:w-4/5 pt-[61.8px]">
        <div className="px-5 py-5 sm:px-20">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-md font-extrabold sm:text-[25px]">
                My Academic Planner
              </h1>
              <p className="text-[10px] sm:text-sm">
                Your personal schedule, active tasks,
                and course folders.
              </p>
            </div>

            <button
              onClick={() => setResetConfirm(true)}
              className="
                flex items-center justify-center gap-1
                rounded-sm border hover:bg-[#111827]
                px-2 py-1 border-slate-200 transition-all
                text-[10px] hover:text-white duration-300
                sm:text-sm ease-in-out
              "
            >
              <CalendarSync size={16}/>
              Reset Schedule
            </button>

          </div>

          <WeeklyScheduleCard
            schedule={schedule}
            showActions={showActions}
            toggleActions={() =>
              setShowActions(!showActions)
            }

            // onDeleteClick={handleDeleteSchedule}

            onAddClick={() =>
              setIsModalOpen(true)
            }

            onEditClick={(item) => {
              setEditingSchedule(item);
              setIsEditOpen(true);
            }}

            onDeleteClick={handleDeleteSchedule}
          />



        <AddScheduleModal
            open={isModalOpen || isEditOpen}
            onClose={() => {
                setIsModalOpen(false);
                setIsEditOpen(false);
                setEditingSchedule(null);
            }}
            onSave={handleAddSchedule}
            onUpdate={handleUpdateSchedule}
            editingSchedule={editingSchedule}
        />      

        </div>
      </main>

      {showResetConfirm && (
        <div className="fixed flex items-center justify-center inset-0 bg-black/50 z-10"> 
          <div className="flex flex-col items-center p-5 z-20 bg-white rounded-[20px] ">

            <div className="flex items-center justify-center gap-2 mb-3"> 
                <img  className="block ml-[10px]" width="40px" src={logo} alt="CNU-logo"/> 
                {/* <div >
                  <p className="font-extrabold text-[#111827]"> CNU <span > Free </span></p>
                </div> */}
            </div>
            
              <h1 className="font-extrabold text-lg"> Confirm reset schedule? </h1>
              <p className="text-sm"> All schedules will be removed</p>

              <div className="flex gap-2 mt-5">
                  <button
                    className="px-3 py-2 rounded-[10px] transition-all duration-300 ease-in-out
                    bg-red-500 text-white font-extrabold hover:bg-red-300 "
                    onClick={() => setResetConfirm(false)}
                  > Cancel</button>

                  <button
                    className="px-3 py-2 bg-[#111827] rounded-[10px] hover:bg-[#111827a6]
                    text-white font-extrabold transition-all duration-300 ease-in-out" 
                    onClick={() => { 
                      handleResetSchedules();
                      setResetConfirm(false)
                    }}
                  > Confirm </button>
              </div>

            </div>
        </div>
      )}
            
    </div>
  );
}

export default HomePage;