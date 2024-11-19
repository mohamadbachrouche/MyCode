/**
 * @param Array array to do.
 *@author Mohamad Bachrouche
*/
public class calculateSquare {
    public static void main (String[] args){
    
       int[] Array= {2, 3, 5, 7};
       calculateSquares(Array);
       
        }
    
        public static void calculateSquares (int[] Array) {
    
            for(int i=0; i < Array.length; i++){

                System.out.println(Array[i]*Array[i]);

            }
            }
    
    
    }
    
