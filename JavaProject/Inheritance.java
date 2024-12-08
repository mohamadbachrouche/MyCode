package JavaProject;

// Textual Representation of how an object will look in memory.
// Describes object properties and behaviors.
// To make anything belong to the class, mark it as static!

// ==================== CLASS: Product ====================
class Product {

    // Attributes
    int id;
    String name;
    int price;

    // Constructor
    Product() {
        System.out.println(">> Product Object Constructed");
    }

    // Methods (Behavior)
    // Write data to Product Object
    void setProductDetails(int id, String name, int price) {
        this.id = id; // 'this' refers to the current object
        this.name = name;
        this.price = price;
        System.out.println(">> Data Written in Product Object");
    }

    // Read data from Product Object
    void showProductDetails() {
        System.out.println("----- Product " + id + " -----");
        System.out.println("Name: " + name);
        System.out.println("Price: " + price);
        System.out.println("------------------------");
    }

    // Setter for `id`
    void setId(int id) {
        this.id = id; 
    }

    // Getter for `id`
    int getId() {
        return id;
    }
}

// ==================== CLASS: Mobile ====================
class Mobile extends Product {

    // Additional Attributes
    String os;
    int ram;
    int sdCardSize;

    // Constructor
    Mobile() {
        System.out.println(">> Mobile Object Constructed");
    }

    // Overloaded Method: Write data to Mobile Object
    void setProductDetails(int id, String name, int price, String os, int ram, int sdCardSize) {
        this.id = id; 
        this.name = name;
        this.price = price;
        this.os = os;
        this.ram = ram;
        this.sdCardSize = sdCardSize;
        System.out.println(">> Data Written in Mobile Object");
    }

    // Overridden Method: Show Mobile Object details
    @Override
    void showProductDetails() {
        super.showProductDetails(); // Call Parent's method
        System.out.println("Mobile OS: " + os);
        System.out.println("Mobile RAM: " + ram + "GB");
        System.out.println("Mobile Storage: " + sdCardSize + "GB");
    }
}

// ==================== CLASS: Inheritance (Main) ====================
public class Inheritance {

    public static void main(String[] args) {

        // Example 1: Creating and using Product objects
        /*
        Product product01 = new Product();
        product01.setProductDetails(101, "iPhone 15", 1000);
        product01.showProductDetails();

        Product product02 = new Product();
        product02.setId(201);
        product02.name = "Samsung LED TV";
        product02.price = 50000;
        product02.showProductDetails();
        */

        // Example 2: Creating and using Mobile objects
        Mobile mobile = new Mobile(); // Product constructed first (Inheritance Rule)
        mobile.setProductDetails(301, "iPhone X", 700, "iOS", 4, 128);
        mobile.showProductDetails();
    }
}
