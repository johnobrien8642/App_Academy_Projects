// Course.prototype.conflictsWith = function (chosenCourse) {
//   days = Object.keys(chosenCourse.schedule)

//   days.forEach(function(day){
//     if(this.schedule[day]===chosenCourse.schedule[day]){
//       return true
//     };
//   });

//   return false
// };

// Student.prototype.hasConflict = function(chosenCourse){

//   for(i=0;i<this.courses.length;i++){
//     enrolledCourse = this.courses[i]
//     if(enrolledCourse.conflictsWith(chosenCourse)){
//       return true
//     };
//   };

//   return false
//   // this.courses.forEach(function(enrolledCourse){
//   //   if (enrolledCourse.conflictsWith(chosenCourse)===true){
//   //     return true
//   //   };
//   // });

//   // return false
// }