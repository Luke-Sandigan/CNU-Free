import java.io.Serializable;

public abstract class Person implements Serializable {
    
    private String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public abstract String getCurrentStatus(String day, String time);
    
    @Override
    public String toString() {
        return name;
    }
}