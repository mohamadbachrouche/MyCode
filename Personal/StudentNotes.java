
import java.util.Scanner;

public class StudentNotes {

    public static void main(String[] args) {
        final int MAX_STUDENTS = 10;  // Maximum number of students
        String[] names = new String[MAX_STUDENTS];
        int[] grades = new int[MAX_STUDENTS];
        int count = 0;  // Tracks the number of students added

        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            printMenu();
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();
            scanner.nextLine();  // Consume the newline

            switch (choice) {
                case 1:
                    if (count < MAX_STUDENTS) {
                        count = addStudent(names, grades, count, scanner);
                    } else {
                        System.out.println("Maximum number of students reached.");
                    }
                    break;
                case 2:
                    viewStudents(names, grades, count);
                    break;
                case 3:
                    calculateAverage(grades, count);
                    break;
                case 4:
                    findHighestAndLowest(grades, count);
                    break;
                case 5:
                    System.out.println("Exiting the program. Goodbye!");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } while (choice != 5);

        scanner.close();
    }

    // Prints the menu options
    public static void printMenu() {
        System.out.println("\n--- Student Grade Management System ---");
        System.out.println("1. Add Student");
        System.out.println("2. View All Students and Grades");
        System.out.println("3. Calculate Class Average");
        System.out.println("4. Find Highest and Lowest Grades");
        System.out.println("5. Exit");
    }

    // Adds a student to the arrays
    public static int addStudent(String[] names, int[] grades, int count, Scanner scanner) {
        System.out.print("Enter student name: ");
        names[count] = scanner.nextLine();

        int grade;
        do {
            System.out.print("Enter student grade (0-100): ");
            grade = scanner.nextInt();
            if (grade < 0 || grade > 100) {
                System.out.println("Invalid grade. Please enter a grade between 0 and 100.");
            }
        } while (grade < 0 || grade > 100);
        grades[count] = grade;

        System.out.println("Student added successfully!");
        return count + 1;  // Increment the student count
    }

    // Displays all students and their grades
    public static void viewStudents(String[] names, int[] grades, int count) {
        if (count == 0) {
            System.out.println("No students added yet.");
            return;
        }
        System.out.println("\nStudents and Grades:");
        for (int i = 0; i < count; i++) {
            System.out.println((i + 1) + ". " + names[i] + " - " + grades[i]);
        }
    }

    // Calculates and displays the class average
    public static void calculateAverage(int[] grades, int count) {
        if (count == 0) {
            System.out.println("No students added yet.");
            return;
        }
        int sum = 0;
        for (int i = 0; i < count; i++) {
            sum += grades[i];
        }
        double average = (double) sum / count;
        System.out.printf("Class Average: %.2f%n", average);
    }

    // Finds and displays the highest and lowest grades
    public static void findHighestAndLowest(int[] grades, int count) {
        if (count == 0) {
            System.out.println("No students added yet.");
            return;
        }
        int highest = grades[0];
        int lowest = grades[0];
        for (int i = 1; i < count; i++) {
            if (grades[i] > highest) {
                highest = grades[i];
            }
            if (grades[i] < lowest) {
                lowest = grades[i];
            }
        }
        System.out.println("Highest Grade: " + highest);
        System.out.println("Lowest Grade: " + lowest);
    }
}