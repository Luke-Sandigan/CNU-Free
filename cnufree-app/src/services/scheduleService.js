import { supabase } from "../utils/supabase";

export async function createSchedule(scheduleData) {


    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not logged in.");
    }

    const { error } = await supabase
        .from("schedules")
        .insert({
            user_id: user.id,

            ...scheduleData,
        });

    if (error) {
        throw error;
    }
}

export async function getSchedules() {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not logged in.");
    }

    const { data, error } = await supabase
        .from("schedules")
        .select("*")
        .eq("user_id", user.id)
        .order("day")
        .order("start_time");

    if (error) {
        throw error;
    }

    return data.map((schedule) => ({
        id: schedule.schedule_id,
        subject: schedule.subject,
        room: schedule.room,
        day: schedule.day,
        startTime: schedule.start_time,
        endTime: schedule.end_time,
        color: schedule.color,
    }));
}

export async function updateSchedule(schedule) {
    const { error } = await supabase
        .from("schedules")
        .update({
            subject: schedule.subject,
            room: schedule.room,
            day: schedule.day,
            start_time: schedule.startTime,
            end_time: schedule.endTime,
            color: schedule.color,
        })
        .eq("schedule_id", schedule.id);

    if (error) {
        throw error;
    }
}


export async function deleteSchedule(scheduleId) {
    const { error } = await supabase
        .from("schedules")
        .delete()
        .eq("schedule_id", scheduleId);

    if (error) {
        throw error;
    }
}

export async function deleteAllSchedules() {

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not logged in.");
    }

    const { error } = await supabase
        .from("schedules")
        .delete()
        .eq("user_id", user.id);

    if (error) {
        throw error;
    }
}

