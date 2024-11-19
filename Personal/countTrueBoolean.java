/**
* @param Array The boolean array to check.
 * @return The number of true values in the array.
 */

public class countTrueBoolean {
    
public static void main (String[] args){

   boolean[] Array= {true, false, true, false, true, true};
   System.out.println("Number of true values: " + countTrueBooleans(Array));
   
    }

    public static int countTrueBooleans (boolean[] Array) {

        int t=0 ;
        for (int i= 0; i< Array.length; i++){
                if(Array [i]== true){
                    t++;
                }
        }
            return t;
        }


}



