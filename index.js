//Imports
const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./src/lib/Manager");
const Engineer = require("./src/lib/Engineer");
const Intern = require("./src/lib/Intern");
const generateHTML = require("./src/generateHTML");

//Starts with empty global array to get information from user to send to GenerateHTML to create the HTML page
let workforceArr = [];

//Questions for user to develop their manager
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

//Question to determine whether the Employee will be a Engineer or an Intern
const employeeQuestions = [
  {
    name: "role",
    type: "list",
    message: "Choose your employee's role.",
    choices: ["Engineer", "Intern"],
  },
];

//Questions specifically for the Engineer class
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

//Questions specifially for the Intern Class
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

//Takes input from user to create a new Manager and pushes the new object into the workforce array.
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

//Takes input from user to create a new Intern and pushes the new object into the workforce array and checks to see if user selected to add another employee.
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

//Takes input from user to create a new Engineer and pushes the new object into the workforce array and checks to see if user selected to add another employee.
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

//Checks to see if the user wants to make a new Engineer or Intern and starts the function in context with their choice.
const createEmployee = () => {
  return inquirer.prompt(employeeQuestions).then((empAnswers) => {
    if (empAnswers.role === "Engineer") {
      return createEngineer();
    } else if (empAnswers.role === "Intern") {
      return createIntern();
    }
  });
};
//creates the index.html page using the information from generateHTML.js
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

//Upon start the user is to create their manager, then go through the employees they want, then generate the HTML using the array of objects sent to generateHTML.js, then creates the page using the information form generate HTML
createManager()
  .then(createEmployee)
  .then((workforceArr) => {
    return generateHTML(workforceArr);
  })
  .then((completedHTML) => {
    return createPage(completedHTML);
  });
