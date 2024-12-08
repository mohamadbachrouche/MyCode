package Exercise8;

public class Exercise extends Course {
    public Exercise(String name) {
        super(name);
    }

    @Override
    public void print() {
        System.out.printf("Exercise Name: %s, Lecturer: %s %s%n",
                getName(), getLecturer().getFirstName(), getLecturer().getLastName());
    }
}