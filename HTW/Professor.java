public class Professor {
    private String name;
    private String department;
    private int yearsOfExperience;

    // Constructor
    public Professor(String name, String department, int yearsOfExperience) {
        this.name = name;
        this.department = department;
        this.yearsOfExperience = yearsOfExperience;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(int yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    @Override
    public String toString() {
        return "Professor{name='" + name + "', department='" + department + "', yearsOfExperience=" + yearsOfExperience + "}";
    }
}
