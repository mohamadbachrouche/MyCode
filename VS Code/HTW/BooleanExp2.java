/**
 * Methoden: Auswertung boolean
 */
public class BooleanExp2 {

    /**
     * (a && !b) || !(a && c).
     * @param a der erste boolesche Wert
     * @param b der zweite boolesche Wert
     * @param c der dritte boolesche Wert
     * @return das Ergebnis des logischen Ausdrucks (a && !b) || !(a && c)
     */
    public boolean checkExpression1(boolean a, boolean b, boolean c) {
        return (a && !b) || !(a && c);
    }

    /**
     * !((c && b) || (a || c)).
     * @param a der erste boolesche Wert
     * @param b der zweite boolesche Wert
     * @param c der dritte boolesche Wert
     * @return das Ergebnis des logischen Ausdrucks !((c && b) || (a || c))
     */
    public boolean checkExpression2(boolean a, boolean b, boolean c) {
        return !((c && b) || (a || c));
    }
}