const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./src/lib/Manager");
const Engineer = require("./src/lib/Engineer");
const Intern = require("./src/lib/Intern");
const generateHTML = require("./src/generateHTML");

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
];

const engineerQuestion = [
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
    message: "Please enter your Engineer's GitHub name.",
    validate: (githubName) => {
      if (githubName) {
        return true;
      } else {
        return "Please enter a github username!";
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

const internQuestion = [
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
    name: "school",
    type: "input",
    message: "Please enter your Intern's school name.",
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

const createManager = () => {
  return inquirer.prompt(managerQuestions).then((manAnswers) => {
    const manager = new Manager(
      manAnswers.name,
      manAnswers.id,
      manAnswers.email,
      "Manager",
      manAnswers.officeNum
    );
    workforceArr.push(manager);
  });
};

const createIntern = () => {
  return inquirer.prompt(internQuestion).then((intAnswers) => {
    const intern = new Intern(
      intAnswers.name,
      intAnswers.id,
      intAnswers.email,
      "Intern",
      intAnswers.school
    );
    workforceArr.push(intern);
    if (intAnswers.addNewEmployee) {
      return createEmployee(workforceArr);
    } else {
      return workforceArr;
    }
  });
};

const createEngineer = () => {
  return inquirer.prompt(engineerQuestion).then((engAnswers) => {
    const engineer = new Engineer(
      engAnswers.name,
      engAnswers.id,
      engAnswers.email,
      "Engineer",
      engAnswers.github
    );
    workforceArr.push(engineer);
    if (engAnswers.addNewEmployee) {
      return createEmployee(workforceArr);
    } else {
      return workforceArr;
    }
  });
};

const createEmployee = () => {
  return inquirer.prompt(employeeQuestions).then((empAnswers) => {
    if (empAnswers.role === "Engineer") {
      return createEngineer();
    } else if (empAnswers.role === "Intern") {
      return createIntern();
    }
  });
};

const createPage = (completedHTML) => {
  fs.writeFile("./src/dist/index.html", completedHTML, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Your profile has been created! Check index.html!");
    }
  });
};

createManager()
  .then(createEmployee)
  .then((workforceArr) => {
    return generateHTML(workforceArr);
  })
  .then((completedHTML) => {
    return createPage(completedHTML);
  });
