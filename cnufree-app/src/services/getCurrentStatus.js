export function getCurrentStatus(schedules) {

    const now = new Date();

    const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ];

    const today = days[now.getDay()];
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const todaySchedules = schedules.filter(
        (schedule) =>
            schedule.day === today &&
            !schedule.is_archived
    );

    for (const schedule of todaySchedules) {

        const [startHour, startMinute] = schedule.start_time.split(":").map(Number);
        const [endHour, endMinute] = schedule.end_time.split(":").map(Number);
        const start = startHour * 60 + startMinute;
        let end = endHour * 60 + endMinute;


        if (end <= start) { 
            end += 24 * 60;
        }

        let current = currentMinutes;


        if (current < start) {
            current += 24 * 60;
        }

        if (current >= start && current < end) {
            return {
                status: "Busy",
                subject: schedule.subject,
                room: schedule.room,
                start: schedule.start_time,
                end: schedule.end_time,
                color: schedule.color,
            }
        }
    }

    let nextClass = null;
    let nextStart = Infinity;

    for (const schedule of todaySchedules) {

        const [hour, minute] = schedule.start_time.split(":").map(Number);
        const start =  hour * 60 + minute;

        if (
            start > currentMinutes &&
            start < nextStart
        ) {
            nextStart = start;
            nextClass = schedule;
        }
    }

    if (nextClass) {

        return {
            status: "Free",
            nextSubject: nextClass.subject,
            start: nextClass.start_time,
            room: nextClass.room,
            color: nextClass.color,

        };

    }

    return {
        status: "Free",
        nextSubject: null,
        start: null,
        room: null,
        color: null,
    };

}