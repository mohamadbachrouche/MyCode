package Exercise8;

public class Student {
    private String firstName;
    private String lastName;
    private String matrNr;
    private String degreeProgram;
    private int semester;

    public Student(String firstName, String lastName, String matrNr, String degreeProgram, int semester) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.matrNr = matrNr;
        this.degreeProgram = degreeProgram;
        this.semester = semester;
    }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getMatrNr() { return matrNr; }
    public void setMatrNr(String matrNr) { this.matrNr = matrNr; }
    
    public String getDegreeProgram() { return degreeProgram; }
    public void setDegreeProgram(String degreeProgram) { this.degreeProgram = degreeProgram; }
    
    public int getSemester() { return semester; }
    public void setSemester(int semester) { this.semester = semester; }

    public void printStudent() {
        System.out.printf("Student: %s %s, Matriculation Number: %s, Degree Program: %s, Semester: %d%n",
                firstName, lastName, matrNr, degreeProgram, semester);
    }
}