public class Fibonacci {
    public static void main(String[] args) {
        int n = 10; // Number of terms
        System.out.println("Fibonacci Series using recursion:");
        
        for (int i = 0; i < n; i++) {
            System.out.print(fibonacci(i) + " ");
        }
    }

    public static int fibonacci(int n) {
        if (n <= 1) {
            return n; // Base case
        }
        return fibonacci(n - 1) + fibonacci(n - 2); // Recursive call
    }
}
    
