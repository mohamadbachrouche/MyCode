import java.util.Arrays;
import java.util.Scanner;
public class Ex {
    public static void main(String[] args) {
        
    Scanner scanner = new Scanner(System.in);
    /*
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

    System.out.printf("At %d years old and as a %s this number may not be valid %n", age, gender);
    if (bmi < 18.5) {
         System.out.println("Underweight");
    } else if (bmi < 24.9) {
         System.out.println("Normal weight");
    } else if (bmi < 29.9) {
        System.out.println("Overweight");
    } else {
         System.out.println("Obesity");
    }
    */
    /* 
     System.out.println("give the 1st term: ");
     double firstTerm = scanner.nextDouble();
     
     System.out.println("give the 2nd term: ");
     double secondTerm = scanner.nextDouble();
     
     System.out.println("give operator (- , + , * , / , % ): ");
     char operator = scanner.next().charAt(0);
     

     switch (operator) {
          case '+':
               System.out.println("the result of the add is: " +(firstTerm + secondTerm));
               break;
          case '-':
           System.out.println("the result of the sub is: " +(firstTerm - secondTerm));
               break;
          case '*':
           System.out.println("the result of the mul is: " +(firstTerm * secondTerm));
               break;
          case '/':
          if (secondTerm > 0) {
               System.out.println("the result of the mod is: " +(firstTerm / secondTerm));
           }
               break;
          case '%':
           if (firstTerm > secondTerm) {
               System.out.println("the result of the mod is: " +(firstTerm % secondTerm));
           }
               break;
          
          default:
           System.out.println("invalid");
               break;
     }
     
*/
/*
System.out.println("write a greeting:  ");
String greeting = scanner.nextLine();

System.out.println("Length: " + greeting.length());
System.out.println("Uppercase: " + greeting.toUpperCase());
System.out.println("Lowercase: " + greeting.toLowerCase());
System.out.println("Substring: " + greeting.substring(1, 8));

*/

 /*    
String correctUserName = "MoBach";
String correctPassWord = "Bach@2001";
int attempts = 0;
boolean authenticated = false;

while (attempts < 3 && !authenticated) {
    System.out.println("Enter username:");
    String username = scanner.nextLine();

    System.out.println("Enter password:");
    String password = scanner.nextLine();

    if (username.equals(correctUserName) && password.equals(correctPassWord)) {
        authenticated = true;
        System.out.println("Welcome!");
    } else {
        attempts++;
        System.out.println("Incorrect username or password. Attempts left: " + (3 - attempts));
    }
}

if (!authenticated) {
    System.out.println("Mino Ant?");
}
*/

/*
int[] numbers = new int[5];

System.out.println("Enter 5 integers:");
for (int i = 0; i < numbers.length; i++) {
    System.out.print("Number " + (i + 1) + ": ");
    numbers[i] = scanner.nextInt();
}

System.out.println("The numbers you entered are:");
for (int number : numbers) {
    System.out.println(number);
}
*/

/*
int[] numbers = new int[5];

System.out.println("Enter 5 integers:");
for (int i = 0; i < numbers.length; i++) {
    System.out.print("Number " + (i + 1) + ": ");
    numbers[i] = scanner.nextInt();
}

int largest = numbers[0];
int smallest = numbers[0];

for (int number : numbers) {
    if (number > largest) {
        largest = number;
    }
    if (number < smallest) {
        smallest = number;
    }
}

System.out.println("Largest number: " + largest);
System.out.println("Smallest number: " + smallest);
*/

/*int[] numbers = {56, 275, 60, 4, 47};  // Initialize with values

Arrays.sort(numbers);
System.out.println("Sorted numbers array: " + Arrays.toString(numbers));
*/






    scanner.close();










    }
}
