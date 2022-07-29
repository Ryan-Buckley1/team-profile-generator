// Manager class using some information from Employee.js
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, role, officeNumber) {
    super(name, id, email, role);
    this.officeNumber = officeNumber;
  }
  officeNumber() {
    return this.officeNumber;
  }
  getRole() {
    return "Manager";
  }
}
//exports Manager
module.exports = Manager;
