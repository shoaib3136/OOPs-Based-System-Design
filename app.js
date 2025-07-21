
class User {
    
    #userId;
    #email;

    constructor(name, email) {
        this.name = name;
        this.#email = email; 
        this.#userId = Symbol(); 
    }

   
    get email() {
        return this.#email;
    }

    
    viewDashboard() {
        console.log(`Welcome, ${this.name}! This is your generic dashboard.`);
    }

    getProfile() {
        return `Name: ${this.name}, Email: ${this.email}`;
    }
}


class Student extends User {
    constructor(name, email) {
        super(name, email);
        this.enrolledCourses = [];
    }

    enrollInCourse(course) {
        this.enrolledCourses.push(course);
        course.addStudent(this);
        console.log(`${this.name} has enrolled in ${course.courseName}.`);
    }
    
   
    viewDashboard() {
        console.log(`--- Student Dashboard: ${this.name} ---`);
        console.log("Enrolled Courses:");
        this.enrolledCourses.forEach(course => console.log(`- ${course.courseName}`));
    }
}

class Instructor extends User {
    constructor(name, email) {
        super(name, email);
        this.createdCourses = [];
    }

    createCourse(courseName) {
        const newCourse = new Course(courseName, this);
        this.createdCourses.push(newCourse);
        console.log(`${this.name} created the course: ${courseName}.`);
        return newCourse;
    }

    
    viewDashboard() {
        console.log(`--- Instructor Dashboard: ${this.name} ---`);
        console.log("Courses Created:");
        this.createdCourses.forEach(course => console.log(`- ${course.courseName}`));
    }
}
class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
        this.students = [];
        this.assignments = []; 
    }

    addStudent(student) {
        this.students.push(student);
    }
    
    addAssignment(title) {
        const newAssignment = { title, submissions: new Map() };
        this.assignments.push(newAssignment);
    }
}
console.log("--- System Start ---");
const instructorJane = new Instructor("instructor1", "instructor1@university.edu");
const studentJohn = new Student("student1", "student1@school.com");
const oopCourse = instructorJane.createCourse("Object-Oriented Design");
studentJohn.enrollInCourse(oopCourse);
console.log("\n--- Viewing Dashboards (Demonstrating Polymorphism) ---");
instructorJane.viewDashboard();
console.log("\n");
studentJohn.viewDashboard();
console.log("\n--- Accessing Encapsulated Data ---");
console.log(`Instructor's Email: ${instructorJane.email}`); 
