public class Subtract{
    /**
     * Sub of the 2nd from 1st & return diff 
     * @param x min
     * @param y sub
     * @return diff (x-y)
    */
    public int subtract(int x, int y){
        return x-y;
    }
    
    public static void main(String[] args){
        Subtract sub = new Subtract();
        //test sub
        int diff = sub.subtract(15, 5);
        System.out.println("sub(15-5)= " + diff);
    }
}