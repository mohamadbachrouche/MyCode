public class BooleanExp {
    /**
    * @param a 1st boo
    * @param b 2nd boo
    * @param c 3rd boo
    * @return boo output
    */
    public static boolean eval (boolean a, boolean b, boolean c){
        //based on table
        return (b && c) || (a && !b);
    }
    public static void main(String[] args){
        //define all possible boo values
        boolean[] val = {false, true};
        //loop all comb
        for (boolean a : val){
            for (boolean b : val){
                for (boolean c : val){
                    boolean result = eval (a, b, c);
                    System.out.printf("eval(%b, %b, %b)= %b%n", a, b, c, result);
                }
            }
        }
    }
 
 
    
}