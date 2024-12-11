package oops.java;

public class Main {

    public static void main(String[] args) {
       
        Inventory inventory = new Inventory();
       
        Item item1 = new Item("Apple", 10);
        Fruit fruit = new Fruit("Banana", 20, "Yellow");

        inventory.addItem(item1);
        inventory.addItem(fruit);
       
        inventory.displayInventory();
    }

}
