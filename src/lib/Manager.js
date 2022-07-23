// 1 manager 
const Employee = require('./Employee')

class Manager extends Employee {
    super()
    officeNumber() {
        const office = {
            name: "officeNum",
            type: "input",
            message: "What is the Office Number?",
            validate: (officeNumb) => {
              if (officeNumb) {
                return true;
              } else {
                console.log("Please enter an office number");
                return false;
              }
            },
          };
    }
    getRole()
}