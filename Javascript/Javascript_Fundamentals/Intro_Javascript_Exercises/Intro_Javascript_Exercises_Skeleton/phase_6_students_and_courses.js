// student

function Student(firstName, lastName){
  this.fname = firstName;
  this.lname = lastName;
  this.courses = [];
};

function Course(courseName, department, credits) {
  this.name = courseName;
  this.department = department;
  this.credits = credits;
  this.students = [];
  this.schedule = {};
};

Student.prototype.name = function(){
  return `${this.fname} ${this.lname}`
}

Student.prototype.enroll = function(course){
  if(this.courses.includes(course)){
    return `${this.name()} is already enrolled`
  }else if(this.hasConflict(course)===false){
    this.courses.push(course)
    course.enrollStudent(this.name())
  }else{
    return 'Chosen course has schedule conflict'
  };

  console.log(`${this.name()} has been enrolled in ${course.name}`)

  console.log('Enrolled Courses')
  console.log('----------------')
  return this.courses.forEach(function(course){
    console.log(course.name)
  });
}

Course.prototype.conflictsWith = function (course) {
  let days = Object.keys(course.schedule)

  for (i = 0; i < days.length; i++) {
    let day = days[i]
    if (this.schedule[day] === course.schedule[day]) {
      return true
    };
  };
  return false
};

Student.prototype.hasConflict = function (course) {
  enrolledCourses = this.courses

  for (i = 0; i < enrolledCourses.length; i++) {
    let c = enrolledCourses[i]
    if (c.conflictsWith(course) === true) {
      return true
    };
  };
  return false
};



Student.prototype.courseLoad = function(){
  courseLoad = {};

  this.courses.forEach(function(course){
    dept = course.department;
    courseLoad[dept] = courseLoad[dept] || 0
    courseLoad[dept] += course.credits
  });
  
  return courseLoad
};

// course

function Course(courseName, department, credits){
  this.name = courseName;
  this.department = department;
  this.credits = credits;
  this.students = [];
  this.schedule = {};
};


Course.prototype.enrollStudent = function(studentName){
  this.students.push(studentName)
};



Course.prototype.scheduleBlockExists = function(day, time) {
  return this.schedule[day] === time
};

Course.prototype.addScheduleBlock = function(day, time){
  timeBlocks = [1,2,3,4,5,6,7,8]
  days = ['mon', 'tue', 'wed', 'thu', 'fri']

  if (this.scheduleBlockExists(day, time)){
    console.log('this scheduled block already exists');
  } else if (timeBlocks.includes(time) && days.includes(day)){
    this.schedule[day] = time
  } else {
    console.log('Day and/or time are invalid');
  };
};


c1 = new Course("American Civil War", "History", 10);
c2 = new Course("Algebra", "Mathematics", 10);
c3 = new Course("Computer Science", "CompSci1", 15);

c1.addScheduleBlock('mon', 4);
c2.addScheduleBlock('mon', 4);
c3.addScheduleBlock('tue', 5);

s1 = new Student("John", "Smith");
s2 = new Student("Suzy", "Jingleheimer");
s3 = new Student("Priya", "Depak");

s1.enroll(c1);
s2.enroll(c2);
s3.enroll(c3);


