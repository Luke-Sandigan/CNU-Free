import { useEffect, useState } from "react";
import { X, GraduationCap, School, CalendarDays } from "lucide-react";
import { getFriendSchedule } from "../services/friendService";
import { formatTime } from "../utils/formatTime";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const COLOR_STYLES = {
    violet: "border-violet-500 bg-violet-50",
    blue: "border-blue-500 bg-blue-50",
    green: "border-green-500 bg-green-50",
    red: "border-red-500 bg-red-50",
    yellow: "border-yellow-500 bg-yellow-50",
    orange: "border-orange-500 bg-orange-50",
    pink: "border-pink-500 bg-pink-50",
};

function FriendScheduleModal({ open, close, friendId }) {

    const [friend, setFriend] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedDay, setSelectedDay] = useState("Mon");

    async function loadFriend() {
        if (!friendId) return;
        try {
            setLoading(true);
            const data = await getFriendSchedule(friendId);
            setFriend(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!open) return;
        loadFriend();
    }, [open, friendId]);

    if (!open) return null;

    const todaySchedules =
        friend?.schedules?.filter((schedule) => schedule.day === selectedDay && !schedule.is_archived)
            .sort((a, b) => a.start_time.localeCompare(b.start_time)) || [];

    return (
        <>
            <div onClick={close} className="fixed inset-0 bg-black/50 z-40" />

            <div className={`fixed left-0 right-0 bottom-0 h-[92vh] bg-white rounded-t-[30px] z-50 transition-all duration-300 shadow-2xl flex flex-col 
                ${open ? "translate-y-0" : "translate-y-full"}`}>

                <div className="w-16 h-1.5 rounded-full bg-slate-300 mx-auto mt-3 mb-5" />

                <div className="px-6 flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-black"> Friend Schedule</h1>
                        <p className="text-sm text-slate-500"> Weekly Class Schedule</p>
                    </div>
                    <button 
                        onClick={close} 
                        className="p-2 rounded-full hover:bg-slate-200">
                        <X />
                    </button>
                </div>

                {loading ? (
                    <div className="flex-1 flex flex-col justify-center items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-4 border-slate-300 border-t-[#111827] animate-spin" />
                        <p className="text-slate-500"> Loading...</p>
                    </div>
                ) : friend && (
                    <>
                        <div className="mx-5 mt-5 rounded-2xl border bg-slate-50 p-5">
                            <div className="flex gap-4 items-center">
                                <div className="w-16 h-16 rounded-full bg-[#111827] text-white flex justify-center items-center text-2xl font-black">
                                    {friend.firstname?.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <h2 className="font-black text-xl"> {friend.firstname} {friend.lastname}</h2>
                                    <p className="text-slate-500"> @{friend.username}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-5">
                                <div className="border rounded-full px-3 py-1 flex items-center gap-2 text-sm">
                                    <GraduationCap size={15} />
                                    {friend.program}
                                </div>
                                <div className="border rounded-full px-3 py-1 flex items-center gap-2 text-sm">
                                    <CalendarDays size={15} />
                                    Year {friend.year}
                                </div>
                                <div className="border rounded-full px-3 py-1 flex items-center gap-2 text-sm">
                                    <School size={15} />
                                    {friend.school_name}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 overflow-x-auto px-5 py-5 border-b">
                            {DAYS.map((day) => (
                                <button 
                                    key={day} 
                                    onClick={() => 
                                    setSelectedDay(day)} 
                                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-all 
                                        ${selectedDay === day ? "bg-[#111827] text-white" : "bg-slate-100 hover:bg-slate-200"}`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 overflow-y-auto px-5 py-5">
                            <div className="mb-4">
                                <h2 className="text-xl font-black text-[#111827]">{selectedDay}</h2>
                                <p className="text-sm text-slate-500">
                                    {todaySchedules.length}{todaySchedules.length === 1 ? " Class" : " Classes"}
                                    </p>
                            </div>

                            {todaySchedules.length === 0 ? (
                                <div className="h-[300px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col justify-center items-center text-center bg-slate-50">
                                    <CalendarDays size={60} className="text-slate-300 mb-4" />
                                    <h3 className="text-lg font-bold text-slate-600">No Classes</h3>
                                    <p className="text-sm text-slate-400 mt-2">Your friend has no schedule for{` ${selectedDay}.`}</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {todaySchedules.map((schedule) => (
                                        <div key={schedule.schedule_id} className={`rounded-2xl border-l-8 shadow-sm border p-5 transition-all hover:shadow-lg ${COLOR_STYLES[schedule.color] || "border-slate-500 bg-slate-50"}`}>
                                            <div className="flex justify-between items-start gap-3">
                                                <div>
                                                    <h3 className="text-xl font-black text-[#111827]">{schedule.subject}</h3>
                                                    <p className="text-sm text-slate-500 mt-1">Room</p>
                                                    <h4 className="font-bold text-slate-700">{schedule.room}</h4>
                                                </div>
                                                <div className="bg-white border rounded-xl px-4 py-3 text-center shadow-sm">
                                                    <p className="text-xs text-slate-500 font-semibold">TIME</p>
                                                    <p className="font-black text-[#111827] mt-1">{formatTime(schedule.start_time)}</p>
                                                    <p className="text-xs text-slate-400 my-1">to</p>
                                                    <p className="font-black text-[#111827]">{formatTime(schedule.end_time)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default FriendScheduleModal;