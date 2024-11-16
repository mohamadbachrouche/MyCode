public class Fibonacci2 {
    public static void main(String[] args) {
        int n = 10; // Number of terms
        System.out.println("Fibonacci Series using loop:");
        
        int first = 0, second = 1;
        System.out.print(first + " " + second + " ");
        
        for (int i = 2; i < n; i++) {
            int next = first + second;
            System.out.print(next + " ");
            first = second;
            second = next;
        }
    }
}