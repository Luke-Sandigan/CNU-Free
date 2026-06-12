import java.util.HashMap;
import java.util.Map;
import java.io.Serializable;

public class Friend extends Person {
    
    private Map<String, Schedule> weeklySchedule;

    public Friend(String name) {
        super(name);
        this.weeklySchedule = new HashMap<>();
    }

    public void addSchedule(String day, String lunchStart, String lunchEnd, String dismissal) {
        Schedule sched = new Schedule(lunchStart, lunchEnd, dismissal);
        weeklySchedule.put(day, sched);
    }

    public Schedule getScheduleForDay(String day) {
        return weeklySchedule.get(day);
    }

    public boolean hasClassOn(String day) {
        return weeklySchedule.containsKey(day);
    }

    @Override
    public String getCurrentStatus(String day, String time) {
        if (!weeklySchedule.containsKey(day)) {
            return "Free";
        }
        return "Unknown"; 
    }
    
    public static class Schedule implements Serializable {
        private String lunchStart;
        private String lunchEnd;
        private String dismissalTime;

        public Schedule(String start, String end, String dismissal) {
            this.lunchStart = start;
            this.lunchEnd = end;
            this.dismissalTime = dismissal;
        }

        public String getLunchTime() {
            return lunchStart + " - " + lunchEnd;
        }

        public String getDismissalTime() {
            return dismissalTime;
        }
        
        public String getLunchStart() { return lunchStart; }
        public String getLunchEnd() { return lunchEnd; }
    }
}