package Exercise8;

public class University {
    public static void main(String[] args) {
        // Create students
        Student student1 = new Student("John", "Doe", "12345", "Computer Science", 3);
        Student student2 = new Student("Jane", "Smith", "67890", "Business Informatics", 2);

        // Create lecturer
        Lecturer lecturer = new Lecturer("Dr.", "Brown");

        // Create course
        Course course = new Course("Software Engineering");
        course.setLecturer(lecturer);

        // Register students
        course.register(student1);
        course.register(student2);

        // Print course details
        course.print();

        // Print student details
        student1.printStudent();
        student2.printStudent();

        // Create and print exercise
        Exercise exercise = new Exercise("Java Programming");
        exercise.setLecturer(lecturer);
        exercise.print();
    }
}