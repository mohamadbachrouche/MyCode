package oops.java;


public class Fruit extends Item {
    private String color;

    public Fruit(String name, int quantity, String color) {
        super(name, quantity);
        this.color = color;
    }

    public String getType () {
        return color;
        
    }

    
}
