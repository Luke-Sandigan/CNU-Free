import { Plus } from "lucide-react";
import { SquarePen } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { CalendarOff } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const COLOR_STYLES = {
  violet: "bg-violet-100 border-violet-500 text-violet-700",
  orange: "bg-orange-100 border-orange-500 text-orange-700",
  emerald: "bg-emerald-100 border-emerald-500 text-emerald-700",
  blue: "bg-blue-100 border-blue-500 text-blue-700",
  pink: "bg-pink-100 border-pink-500 text-pink-700",
};

function WeeklyScheduleCard({
  schedule,
  onAddClick,
  onEditClick,
  onDeleteClick,
  showActions,
  toggleActions,
}) {
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-extrabold flex gap-2">
          <CalendarDays /> My Weekly Schedule
        </h2>

        <div className="flex gap-2">
          <button
            onClick={toggleActions}
            className="
            rounded-[5px]
            border
            px-3
            py-1
            text-sm
            font-extrabold duration-300 ease-linear
            hover:bg-[#111824] transition-all hover:text-white
          "
          >
            {showActions ? "Done" : "Manage"}
          </button>

          <button
            onClick={onAddClick}
            className="flex items-center gap-1 rounded-[5px] border bg-[#111827] hover:text-[#111824] hover:font-extrabold hover:border-none
          px-1 sm:px-3 py-1 text-sm font-bold text-white transition-all duration-300 ease-linear hover:bg-gray-300"
          >
            <Plus size={16} />
            <span className="hidden sm:block">Add Schedule</span>
          </button>
        </div>
      </div>
      {schedule.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-6xl">
            {" "}
            <CalendarOff size={100} />{" "}
          </span>

          <h3 className="mt-4 text-xl font-bold text-slate-700">
            No schedules yet
          </h3>

          <p className="mt-1 text-center text-sm text-slate-500">
            Click "Add Schedule or '+' icon " to organize your week.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[1400px] w-full table-fixed border-collapse">
            <thead>
              <tr>
                {DAYS.map((day) => (
                  <th
                    key={day}
                    className="first:rounded-tl-xl last:rounded-tr-xl border border-slate-200 bg-slate-50 px-1 py-2 text-xs font-semibold text-slate-500"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                {DAYS.map((day) => (
                  <td
                    key={day}
                    className="align-top p-2  min-w-[900px] w-full table-fixed border-collapse"
                  >
                    <div className="space-y-2  ">
                      {schedule
                        .filter((item) => item.day === day)
                        .sort((a, b) => a.startTime.localeCompare(b.startTime))
                        .map((item) => (
                          <div
                            key={item.id}
                            className={`w-full rounded-lg border-l-4 p-2  ${COLOR_STYLES[item.color]}`}
                          >
                            <h1 className="font-bold truncate text-[20px]">
                              {item.subject}
                            </h1>

                            <div
                              className="flex flex-col bg-white border border-black text-[#111824] items-center justify-center
                               rounded-xl gap-1 mb-2 p-2 mt-2"
                            >
                              <h1 className="text-slate-400 font-bold text-sm"> TIME </h1>
                              <p className=" text-[12px] sm:text-sm font-bold ">
                                {formatTime(item.startTime)}{" - "} 
                                {formatTime(item.endTime)}
                              </p>
                            </div>
                            <p className="text-[12px] sm:text-sm font-bold">
                              ROOM: {item.room}
                            </p>

                            {showActions && (
                              <div className="flex gap-1">
                                <button
                                  onClick={() => {
                                    onEditClick(item);
                                  }}
                                  className="
                                    rounded
                                    bg-[#111824]
                                    px-2
                                    py-1
                                    text-xs
                                    font-bold
                                    text-white
                                  "
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() => onDeleteClick(item.id)}
                                  className="
                                    rounded
                                    bg-red-500
                                    px-2
                                    py-1
                                    text-xs
                                    font-bold
                                    text-white
                                  "
                                >
                                  X
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default WeeklyScheduleCard;
