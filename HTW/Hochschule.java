import java.util.ArrayList;

public class Hochschule {
    private ArrayList<Professor> professors = new ArrayList<>();
    private ArrayList<Student> students = new ArrayList<>();

    public static void main(String[] args) {
        Hochschule hochschule = new Hochschule();

        // Creating professors
        Professor prof1 = new Professor("Dr. Müller", "Computer Science", 10);
        Professor prof2 = new Professor("Dr. Schmidt", "Mathematics", 15);
        Professor prof3 = new Professor("Dr. Weber", "Physics", 8);

        hochschule.professors.add(prof1);
        hochschule.professors.add(prof2);
        hochschule.professors.add(prof3);

        // Creating students
        Student student1 = new Student("Alice", 21, "Computer Science");
        Student student2 = new Student("Bob", 23, "Mathematics");
        Student student3 = new Student("Charlie", 20, "Physics");

        hochschule.students.add(student1);
        hochschule.students.add(student2);
        hochschule.students.add(student3);

        // Manipulating objects
        prof1.setYearsOfExperience(12);  // Update experience
        student1.setMajor("Software Engineering");  // Change major

        // Print objects
        System.out.println("Professors:");
        for (Professor prof : hochschule.professors) {
            System.out.println(prof);
        }

        System.out.println("\nStudents:");
        for (Student student : hochschule.students) {
            System.out.println(student);
        }
    }
}