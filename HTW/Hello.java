import java.util.Scanner;

public class Hello {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // InputMismatchException
        try {
            System.out.println("Enter a number:");
            int number = scanner.nextInt(); // May throw InputMismatchException
        } catch (java.util.InputMismatchException e) {
            System.out.println("Error: Invalid input. Please enter a valid number.");
            scanner.nextLine(); // Reset the scanner
        }

        // ArrayIndexOutOfBoundsException
        try {
            int[] numbers = {1, 2, 3};
            System.out.println("Element at position 5: " + numbers[4]); // May throw ArrayIndexOutOfBoundsException
        } catch (java.lang.ArrayIndexOutOfBoundsException e) {
            System.out.println("Error: Array index out of bounds.");
        }

        // NullPointerException
        try {
            String text = null;
            System.out.println("Length of the text: " + text.length()); // May throw NullPointerException
        } catch (java.lang.NullPointerException e) {
            System.out.println("Error: Attempt to access a null object.");
        }

        scanner.close();
    }
}