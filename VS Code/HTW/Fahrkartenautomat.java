import java.util.Scanner;

public class Fahrkartenautomat {

    private static final double TICKET_PREIS = 4.40;
    private static final int MAX_TICKETS = 3;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int ticketAnzahl = 0;
        double gesamtPreis = 0.0;

        while (ticketAnzahl < MAX_TICKETS) {
            // Ticket-Informationen eingeben
            System.out.print("Geben Sie den Namen des Fahrgasts ein: ");
            String name = scanner.nextLine();

            System.out.print("Hat der Fahrgast Anspruch auf eine Ermäßigung (ja/nein)? ");
            boolean ermaessigt = scanner.nextLine().equalsIgnoreCase("ja");

            // Preis berechnen
            double ticketPreis = berechneTicketPreis(ermaessigt);
            gesamtPreis += ticketPreis;
            ticketAnzahl++;

            // Ticketinformationen ausgeben
            zeigeTicketInformation(name, ticketPreis, ermaessigt, gesamtPreis);

            // Prüfen, ob ein weiteres Ticket gewünscht ist
            if (ticketAnzahl < MAX_TICKETS) {
                System.out.print("Möchten Sie ein weiteres Ticket kaufen (ja/nein)? ");
                if (!scanner.nextLine().equalsIgnoreCase("ja")) {
                    break;
                }
            }
        }
        
        System.out.println("Vielen Dank für Ihren Kauf!");
        scanner.close();
    }

    /**
     * Berechnet den Preis für ein Ticket, abhängig davon, ob eine Ermäßigung gewährt wird.
     * 
     * @param ermaessigt ob das Ticket ermäßigt ist
     * @return der berechnete Preis des Tickets
     */
    private static double berechneTicketPreis(boolean ermaessigt) {
        return ermaessigt ? TICKET_PREIS / 2 : TICKET_PREIS;
    }

    /**
     * Zeigt die Informationen eines Tickets und den aktuellen Gesamtpreis an.
     * 
     * @param name        der Name des Fahrgasts
     * @param ticketPreis der Preis des Tickets
     * @param ermaessigt  ob das Ticket ermäßigt ist
     * @param gesamtPreis der aktuelle Gesamtpreis aller gekauften Tickets
     */
    private static void zeigeTicketInformation(String name, double ticketPreis, boolean ermaessigt, double gesamtPreis) {
        System.out.println("\n--- Ticket Informationen ---");
        System.out.printf("Name: %s\n", name);
        System.out.printf("Preis: %.2f€\n", ticketPreis);
        System.out.printf("Ermäßigt: %s\n", ermaessigt ? "Ja" : "Nein");
        System.out.printf("Aktueller Gesamtpreis: %.2f€\n", gesamtPreis);
        System.out.println("----------------------------\n");
    }
}
