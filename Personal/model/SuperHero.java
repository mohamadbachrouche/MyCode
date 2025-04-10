package model;

import java.util.UUID;

public class SuperHero {
    private String id = UUID.randomUUID().toString();
    private String name;
    private int energyPointsCurrent = 20;
    private int energyPointsMax = 20;
    private int experiencePoints = 0;
    private int lives = 2;
    private boolean readyToFight = true;
    private boolean inFight = false;
    private boolean alive = true;

    public SuperHero(String name) {
        this.name = name;
    }

    public void attack() {
        int damage = (int) (Math.random() * 6); // Zufälliger Schaden zwischen 0-5
        if (Math.random() < 2.0 * experiencePoints / 100) {
            damage *= 2; // Kritischer Treffer
        }
        System.out.println(name + " greift an und verursacht " + damage + " Schaden!");
    }

    public void takeDamage(int damage) {
        energyPointsCurrent -= damage;
        if (energyPointsCurrent <= 0) {
            lives--;
            if (lives <= 0) {
                alive = false;
                System.out.println(name + " ist gestorben!");
            } else {
                energyPointsCurrent = energyPointsMax;
                System.out.println(name + " hat ein Leben verloren, erholt sich aber.");
            }
        }
    }

    public void dance() {
        System.out.println(name + " tanzt!");
    }

    public String getName() {
        return name;
    }

    public boolean isAlive() {
        return alive;
    }
}