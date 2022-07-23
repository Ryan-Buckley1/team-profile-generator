// selected from list
const Employee = require('./Employee')

class Intern extends Employee {
    super()
    school = getSchool()
    getSchool() {
        const name = {
            name: "school",
            type: "input",
            message: "What school did your Employee go to?",
            validate: (employeeSchool) => {
              if (employeeSchool) {
                return true;
              } else {
                console.log("Please enter a school name");
                return false;
              }
            },
          };
    }
    getRole()
}