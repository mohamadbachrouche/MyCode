import java.util.Scanner;
public class printConsole {
    
public static void main (String[] args){

    Scanner scanner = new Scanner(System.in);
    System.out.println("n? = ");
    int n = scanner.nextInt();
    printConsole(n);
    scanner.close();

}
    public static void printConsole(int n){

        for(int i = 0; i <= (2*n); i ++){
            System.out.println(i);
        }

    }

}
