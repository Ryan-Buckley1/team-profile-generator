const inquirer = require("inquirer");
const { writeFile } = require("fs");
const Manager = require("./src/lib/Manager");
const Engineer = require("./src/lib/Engineer");
const Intern = require("./src/lib/Intern");

let workforceArr = [];

const managerQuestions = [
  {
    name: "name",
    type: "input",
    message: "What is the Manager's Name?",
    validate: (manName) => {
      if (manName) {
        return true;
      } else {
        return "Please enter a name!";
      }
    },
  },
  {
    name: "id",
    type: "input",
    message: "Please enter the Manager's Employee ID.",
    validate: (idNum) => {
      if (isNaN(idNum)) {
        return "Please enter a valid ID number!";
      } else {
        return true;
      }
    },
  },
  {
    name: "email",
    type: "input",
    message: "Please enter the Manager's Email.",
    validate: (manEmail) => {
      if (manEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return true;
      } else {
        return "Please enter a valid Email";
      }
    },
  },
  {
    name: "officeNum",
    type: "input",
    message: "Enter the Manager's office number",
    validate: (manOff) => {
      if (manOff.match(/^[a-zA-Z0-9-]*$/)) {
        return true;
      } else {
        return "Please enter a valid office number";
      }
    },
  },
];

const employeeQuestions = [
  {
    name: "role",
    type: "list",
    message: "Choose your employee's role.",
    choices: ["Engineer", "Intern"],
  },
  {
    name: "name",
    type: "input",
    message: "What is the Employee's Name?",
    validate: (manName) => {
      if (manName) {
        return true;
      } else {
        return "Please enter a name!";
      }
    },
  },
  {
    name: "id",
    type: "input",
    message: "Please enter the Employee's Employee ID.",
    validate: (idNum) => {
      if (isNaN(idNum)) {
        return "Please enter a valid ID number!";
      } else {
        return true;
      }
    },
  },
  {
    name: "email",
    type: "input",
    message: "Please enter the Employee's Email.",
    validate: (manEmail) => {
      if (manEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return true;
      } else {
        return "Please enter a valid Email";
      }
    },
  },
  {
    name: "github",
    type: "input",
    message: "Please enter your Employee's GitHub name.",
    validate: (githubName) => {
      if (githubName) {
        return true;
      } else {
        return "Please enter a github username!";
      }
    },
  },
  {
    name: "school",
    type: "input",
    message: "Please enter your Employee's school name.",
    validate: (schoolName) => {
      if (schoolName) {
        return true;
      } else {
        return "Please enter a school name!";
      }
    },
  },
  {
    name: "addNewEmployee",
    type: "confirm",
    message: "Would you like to add another employee?",
    default: false,
  },
];

// const engineerQuestion = [
//   {
//     name: "github",
//     type: "input",
//     message: "Please enter your Engineer's GitHub name.",
//     validate: (githubName) => {
//       if (githubName) {
//         return true;
//       } else {
//         return "Please enter a github username!";
//       }
//     },
//   },
// ];

// const internQuestion = [
//   {
//     name: "school",
//     type: "input",
//     message: "Please enter your Intern's school name.",
//     validate: (schoolName) => {
//       if (schoolName) {
//         return true;
//       } else {
//         return "Please enter a school name!";
//       }
//     },
//   },
// ];

const createManager = () => {
  inquirer.prompt(managerQuestions).then((manAnswers) => {
    const manager = new Manager(
      manAnswers.name,
      manAnswers.id,
      "Manager",
      manAnswers.email,
      manAnswers.officeNum
    );
    workforceArr.push(manager);
  });
};

const createEmployee = () => {
  inquirer.prompt(employeeQuestions).then((empAnswers) => {
    if (empAnswers.role === "Engineer") {
      const engineer = new Engineer(
        empAnswers.name,
        empAnswers.id,
        empAnswers.email,
        empAnswers.role,
        empAnswers.github
      );
      console.log(engineer);
      workforceArr.push(engineer);
    } else if (empAnswers.role === "Intern") {
      const intern = new Intern(
        empAnswers.name,
        empAnswers.id,
        empAnswers.role,
        empAnswers.email,
        empAnswers.school
      );
      console.log(intern);
      workforceArr.push(intern);
    }
    if (empAnswers.addNewEmployee) {
      return createEmployee(workforceArr);
    } else {
      return workforceArr;
    }
  });
};

createEmployee();
