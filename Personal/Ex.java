import java.util.Scanner;
public class Ex {
    public static void main(String[] args) {
        
    Scanner scanner = new Scanner(System.in);
    
    System.out.println("What is your Name? ");
    String Name = scanner.nextLine();
    System.out.println(" Hello " + Name);
    

   System.out.println(" What is your Weight (Kg))? ");
   double weight = scanner.nextDouble();
   System.out.println(" What is your Height (M)? ");
   double height = scanner.nextDouble();
   System.out.println(" What is your Age (Years) ? ");
   int age = scanner.nextInt();

   // Consume the leftover newline
   scanner.nextLine();

   System.out.println(" Male or Female)? ");
   String gender = scanner.nextLine();

   double bmi = weight/(height*height);
   System.out.printf("your BMI is: %2f%n" , bmi);

    System.out.printf("At %d years old and as a %s this number may not be walid %n", age, gender);
    if (bmi < 18.5) {
         System.out.println("Underweight");
    } else if (bmi < 24.9) {
         System.out.println("Normal weight");
    } else if (bmi < 29.9) {
        System.out.println("Overweight");
    } else {
         System.out.println("Obesity");
    }
    
    scanner.close();










    }
}
