import java.util.Scanner;

public class Kaffeeautomat {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Willkommen! Was möchten Sie trinken?");
        System.out.println("Optionen: Kaffee, Tee, Kakao, Suppe");
        
        String choice = getValidInput(scanner, new String[]{"Kaffee", "Tee", "Kakao", "Suppe"});
        
        switch (choice) {
            case "Kaffee":
                prepareCoffee(scanner);
                break;
            case "Tee":
                prepareTea();
                break;
            case "Kakao":
                prepareCocoa(scanner);
                break;
            case "Suppe":
                prepareSoup();
                break;
            default:
                System.out.println("Ungültige Auswahl.");
        }

        scanner.close();
    }

    private static void prepareCoffee(Scanner scanner) {
        System.out.println("Möchten Sie Milch in Ihrem Kaffee? (Ja/Nein)");
        boolean milk = getYesOrNo(scanner);

        System.out.println("Möchten Sie Zucker in Ihrem Kaffee? (Ja/Nein)");
        boolean sugar = getYesOrNo(scanner);

        System.out.print("Ihr Kaffee wird zubereitet: ");
        if (milk && sugar) {
            System.out.println("Kaffee mit Milch und Zucker.");
        } else if (milk) {
            System.out.println("Kaffee mit Milch ohne Zucker.");
        } else if (sugar) {
            System.out.println("Kaffee ohne Milch mit Zucker.");
        } else {
            System.out.println("Kaffee schwarz.");
        }
    }

    private static void prepareTea() {
        System.out.println("Tee wird zubereitet.");
    }

    private static void prepareCocoa(Scanner scanner) {
        System.out.println("Möchten Sie Milch in Ihrem Kakao? (Ja/Nein)");
        boolean milk = getYesOrNo(scanner);

        System.out.println("Möchten Sie Zucker in Ihrem Kakao? (Ja/Nein)");
        boolean sugar = getYesOrNo(scanner);

        System.out.print("Ihr Kakao wird zubereitet: ");
        if (milk && sugar) {
            System.out.println("Kakao mit Milch und Zucker.");
        } else if (milk) {
            System.out.println("Kakao mit Milch ohne Zucker.");
        } else if (sugar) {
            System.out.println("Kakao ohne Milch mit Zucker.");
        } else {
            System.out.println("Kakao ohne Milch und Zucker.");
        }
    }

    private static void prepareSoup() {
        System.out.println("Suppe wird zubereitet.");
    }

    private static boolean getYesOrNo(Scanner scanner) {
        String input;
        while (true) {
            input = scanner.nextLine().trim().toLowerCase();
            if (input.equals("ja")) {
                return true;
            } else if (input.equals("nein")) {
                return false;
            } else {
                System.out.println("Ungültige Eingabe. Bitte 'Ja' oder 'Nein' eingeben.");
            }
        }
    }

    private static String getValidInput(Scanner scanner, String[] validOptions) {
        String input;
        while (true) {
            input = scanner.nextLine().trim();
            for (String option : validOptions) {
                if (input.equalsIgnoreCase(option)) {
                    return input;
                }
            }
            System.out.println("Ungültige Eingabe. Bitte eine der folgenden Optionen eingeben: ");
            for (String option : validOptions) {
                System.out.print(option + " ");
            }
            System.out.println();
        }
    }
}