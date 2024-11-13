import java.util.Arrays;

public class ArrayExample {

    public static void main(String[] args) {
        // 1. Declaring and Initializing Arrays
        int[] numbers = {10, 20, 30, 40, 50};  // Initialize with values
        String[] fruits = new String[3];       // Declare an array of 3 elements

        // 2. Accessing and Modifying Array Elements
        System.out.println("First element in numbers array: " + numbers[0]);  // Access first element
        numbers[1] = 25;   // Modify the second element
        System.out.println("Modified second element in numbers array: " + numbers[1]);

        fruits[0] = "Apple";    // Assign values to each element
        fruits[1] = "Banana";
        fruits[2] = "Cherry";
        System.out.println("Fruits array: " + Arrays.toString(fruits));  // Print the entire array

        // 3. Array Length
        System.out.println("Length of numbers array: " + numbers.length);
        System.out.println("Length of fruits array: " + fruits.length);

        // 4. Iterating Over Arrays
        System.out.println("\n--- Using For Loop ---");
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("numbers[" + i + "] = " + numbers[i]);
        }

        System.out.println("\n--- Using Enhanced For Loop ---");
        for (String fruit : fruits) {
            System.out.println("Fruit: " + fruit);
        }

        // 5. Common Array Operations
        // Sorting the numbers array
        Arrays.sort(numbers);
        System.out.println("Sorted numbers array: " + Arrays.toString(numbers));

        // Copying an array
        int[] copiedNumbers = Arrays.copyOf(numbers, numbers.length);
        System.out.println("Copied numbers array: " + Arrays.toString(copiedNumbers));

        // Searching for an element in the array (binary search requires sorted array)
        int searchIndex = Arrays.binarySearch(numbers, 30);
        if (searchIndex >= 0) {
            System.out.println("Element 30 found at index: " + searchIndex);
        } else {
            System.out.println("Element 30 not found in array.");
        }

        // Filling an array with a specific value
        int[] filledArray = new int[5];
        Arrays.fill(filledArray, 100);
        System.out.println("Filled array with 100s: " + Arrays.toString(filledArray));

        // Multidimensional Array (2D array example)
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        System.out.println("\n--- 2D Array (Matrix) ---");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}