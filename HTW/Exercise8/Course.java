package Exercise8;

public class Course {
    private String name;
    private Student[] participants = new Student[40];
    private Lecturer lecturer;
    private int registeredStudents = 0;

    public Course(String name) {
        this.name = name;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Lecturer getLecturer() { return lecturer; }
    public void setLecturer(Lecturer lecturer) { this.lecturer = lecturer; }

    public void print() {
        System.out.printf("Course Name: %s, Lecturer: %s %s%n",
                name, lecturer.getFirstName(), lecturer.getLastName());
    }

    public boolean register(Student student) {
        if (registeredStudents < participants.length) {
            participants[registeredStudents++] = student;
            return true;
        }
        return false;
    }

    public int getCapacity() {
        return participants.length;
    }
}
