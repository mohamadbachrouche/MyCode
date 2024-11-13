public class MyArray2 {

    /**
     * Addiert alle Elemente des Arrays auf und gibt die Summe zurück.
     *
     * @param inputArray Der Eingabearray mit double Werten, die aufaddiert werden sollen.
     * @return Die Summe (double) aller Werte des Eingabearrays.
     */
    public static double addUp(double[] inputArray) {
        double sum = 0;
        for (int i = 0; i < inputArray.length; i++) {
            sum += inputArray[i];
        }
        return sum;
    }
}
