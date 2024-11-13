/**
* A class where Fuctions are needed
* @author Max Musterman
* @author Erika Musterfrau
*/
public class JavadocToMethod {
    /**
     * Add 2 int & return sum 
     * @param x 1st add
     * @param y 2nd add
     * @return sum
    */
    public int add(int x, int y){
        return x + y;
    }
    
    /**
     * now with string
     * @param a 1st string
     * @param b 2nd string
     * @return com
     */
    public String com(String a, String b){
        return a + b;
    }
    
    public static void main(String[] args){
        JavadocToMethod jtm = new JavadocToMethod();
        
        //test add
        int sum = jtm.add(5, 10);
        System.out.println("Add(5+10)= " + sum);
        
        //test com
        String Comb = jtm.com("hello", "world");
        System.out.println("Comb ist: " + Comb);
    }
}