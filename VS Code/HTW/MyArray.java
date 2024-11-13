public class MyArray {

    /**
     * Die Methode liefert den Index des zweidimensionalen Arrays, an dem inputValue steht.
     * Im zweidimensionalen Array (Eingabe) kommt kein Wert doppelt vor.
     * Wird der gesuchte Wert im zweidimensionalen Array nicht gefunden, so liefert die Methode einen leeren String.
     *
     * @param inputArray Der zweidimensionale Array (Eingabe).
     * @param inputValue Der Wert, nach dem gesucht wird.
     * @return Der Index, an dem der gesuchte Wert steht (falls existent), ein leerer String andernfalls.
     */
    public static String findIndex(int[][] inputArray, int inputValue) {
        for (int row = 0; row < inputArray.length; row++) {
            for (int col = 0; col < inputArray[row].length; col++) {
                if (inputArray[row][col] == inputValue) {
                    return row + "." + col;
                }
            }
        }
        return "";
    }
}