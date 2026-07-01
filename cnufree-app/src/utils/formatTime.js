export function formatTime(time) {

    if (!time) {
        return "";
    }

    const [hour, minute] = time.split(":");

    let h = Number(hour);
    const m = minute;

    const period = h >= 12 ? "PM" : "AM";

    h = h % 12;

    if (h === 0) {
        h = 12;
    }

    return `${h}:${m} ${period}`;

}