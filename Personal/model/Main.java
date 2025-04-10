package model;

import java.util.Scanner;

public class Main 
    private static SuperHero[] team = new SuperHero[10]; // Maximale Anzahl an Superhelden
    private static int heroCount = 0; // Zähler für vorhandene Superhelden

    public static void main(String[] args) {
        initializeSuperHeroes();
        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            System.out.println("==== Superhero Game Menu ====");
            System.out.println("1. Create Superhero");
            System.out.println("2. Show Selected Superhero");
            System.out.println("3. List all Superheroes");
            System.out.println("4. Delete Superhero");
            System.out.println("5. Start Raid");
            System.out.println("6. Quit");
            System.out.print("Choose an option: ");
            choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1 -> createSuperhero(scanner);
                case 2 -> showSelectedSuperhero(scanner);
                case 3 -> listAllSuperheroes();
                case 4 -> deleteSuperhero(scanner);
                case 5 -> System.out.println("Raid gestartet!"); // Platzhalter
                case 6 -> System.out.println("Spiel beendet.");
                default -> System.out.println("Ungültige Eingabe. Bitte erneut versuchen.");
            }
        } while (choice != 6);

        scanner.close();
    }

    private static void initializeSuperHeroes() {
        team[heroCount++] = new SuperHero("Superman");
        team[heroCount++] = new SuperHero("Wonder Woman");
        team[heroCount++] = new SuperHero("Batman");
    }

    private static void createSuperhero(Scanner scanner) {
        if (heroCount >= team.length) {
            System.out.println("Das Team ist voll. Kein Platz für neue Superhelden!");
            return;
        }
        System.out.print("Name des neuen Superhelden: ");
        String name = scanner.nextLine();
        team[heroCount++] = new SuperHero(name);
        System.out.println("Superheld " + name + " wurde erstellt!");
    }

    private static void showSelectedSuperhero(Scanner scanner) {
        System.out.print("Index des anzuzeigenden Superhelden (1-" + heroCount + "): ");
        int index = scanner.nextInt() - 1;
        if (index >= 0 && index < heroCount) {
            SuperHero hero = team[index];
            System.out.println("Superheld: " + hero.getName());
            // Zeige weitere Attribute
        } else {
            System.out.println("Ungültiger Index.");
        }
    }

    private static void listAllSuperheroes() {
        System.out.println("Liste aller Superhelden:");
        for (int i = 0; i < heroCount; i++) {
            System.out.println((i + 1) + ". " + team[i].getName());
        }
    }

    private static void deleteSuperhero(Scanner scanner) {
        System.out.print("Index des zu löschenden Superhelden (1-" + heroCount + "): ");
        int index = scanner.nextInt() - 1;
        if (index >= 0 && index < heroCount) {
            System.out.println("Superheld " + team[index].getName() + " wurde gelöscht.");
            // Verschiebe die verbleibenden Superhelden nach links
            for (int i = index; i < heroCount - 1; i++) {
                team[i] = team[i + 1];
            }
            team[--heroCount] = null; // Letztes Element löschen
        } else {
            System.out.println("Ungültiger Index.");
        }
    }
}