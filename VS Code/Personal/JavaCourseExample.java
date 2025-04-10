import java.util.Scanner;

public class JavaCourseExample {

    // Main method - where the program starts
    public static void main(String[] args) {
        // Print "Hello, World!"
        printHelloWorld();

        // Working with Variables and Data Types
        demonstrateVariables();

        // Demonstrate Operators
        demonstrateOperators();

        // Working with Strings
        demonstrateStringMethods();

        // Taking User Input
        takeUserInput();

        // Using Conditional Statements
        checkAge(20);

        // Demonstrate Switch Case
        printDayOfWeek(3);

        // Working with Arrays
        demonstrateArray();

        // Using Loops
        demonstrateLoops();

        // Utility Methods - Math, Random, and String manipulation
        demonstrateUtilityMethods();
    }

    // Prints "Hello, World!"
    public static void printHelloWorld() {
        System.out.println("Hello, World!");
    }

    // Demonstrating Variables and Data Types
    public static void demonstrateVariables() {
        int age = 28;               // Integer
        double salary = 50000.50;    // Floating-point
        String name = "Jason";       // String
        boolean isEmployed = true;   // Boolean

        System.out.println("\n--- Variables and Data Types ---");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Salary: " + salary);
        System.out.println("Employed: " + isEmployed);
    }

    // Demonstrating Operators
    public static void demonstrateOperators() {
        int a = 10, b = 20;

        System.out.println("\n--- Operators ---");
        System.out.println("a + b = " + (a + b));
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + (a * b));
        System.out.println("a / b = " + (a / b));
        System.out.println("a == b: " + (a == b));
        System.out.println("a != b: " + (a != b));
        System.out.println("a > b && a != b: " + (a > b && a != b));
    }

    // Demonstrating String Methods
    public static void demonstrateStringMethods() {
        String greeting = "Hello";
        String name = "Jason";

        System.out.println("\n--- String Methods ---");
        System.out.println("Concatenation: " + greeting + ", " + name + "!");
        System.out.println("Length: " + greeting.length());
        System.out.println("Uppercase: " + greeting.toUpperCase());
        System.out.println("Lowercase: " + greeting.toLowerCase());
        System.out.println("Substring: " + greeting.substring(1, 4));
    }

    // Taking User Input
    public static void takeUserInput() {
        Scanner scanner = new Scanner(System.in);

        System.out.println("\n--- User Input ---");
        System.out.print("Enter your favorite number: ");
        int favoriteNumber = scanner.nextInt();
        System.out.println("Your favorite number is: " + favoriteNumber);

        scanner.close();  // Close the Scanner after use
    }

    // Conditional Statements - Check age
    public static void checkAge(int age) {
        System.out.println("\n--- Conditional Statements ---");
        if (age >= 18) {
            System.out.println("You are an adult.");
        } else {
            System.out.println("You are a minor.");
        }
    }

    // Switch Case - Print day of the week
    public static void printDayOfWeek(int day) {
        System.out.println("\n--- Switch Case ---");
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            case 6:
                System.out.println("Saturday");
                break;
            case 7:
                System.out.println("Sunday");
                break;
            default:
                System.out.println("Invalid day");
        }
    }

    // Arrays and Looping through them
    public static void demonstrateArray() {
        int[] numbers = {1, 2, 3, 4, 5};

        System.out.println("\n--- Arrays and Loops ---");
        for (int number : numbers) {
            System.out.println("Array element: " + number);
        }
    }

    // Demonstrating Different Loops
    public static void demonstrateLoops() {
        System.out.println("\n--- Loops ---");
        
        System.out.println("While loop:");
        int i = 1;
        while (i <= 3) {
            System.out.println("Count: " + i);
            i++;
        }

        System.out.println("For loop:");
        for (int j = 1; j <= 3; j++) {
            System.out.println("For loop count: " + j);
        }

        System.out.println("Do-While loop:");
        int k = 1;
        do {
            System.out.println("Do-While count: " + k);
            k++;
        } while (k <= 3);
    }

    // Demonstrating Utility Methods
    public static void demonstrateUtilityMethods() {
        System.out.println("\n--- Utility Methods ---");

        // Math class methods
        System.out.println("Math.abs(-10): " + Math.abs(-10));
        System.out.println("Math.max(10, 20): " + Math.max(10, 20));
        System.out.println("Math.sqrt(16): " + Math.sqrt(16));
        System.out.println("Math.pow(2, 3): " + Math.pow(2, 3));

        // Random number generation
        double randomNum = Math.random();
        System.out.println("Random number between 0 and 1: " + randomNum);

        // Another common String manipulation
        String sentence = "Java is fun!";
        System.out.println("Original sentence: " + sentence);
        System.out.println("Replace 'fun' with 'awesome': " + sentence.replace("fun", "awesome"));
    }
}