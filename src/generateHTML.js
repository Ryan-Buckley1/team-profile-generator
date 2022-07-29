//Creates the manager card from the information provided from index.js
const managerCard = function (manager) {
  return `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <div class="bg-primary p-2 text-white">
                <h5 class="card-title bg-primary">${manager.name}</h5>
                <h6 class="card-subtitle mb-2 bg-primary">Manager</h6>
            </div>
            <ul class="list-group list-group-flush bg-secondary">
                <li class="list-group-item border">ID: ${manager.id}</li>
                <li class="list-group-item border">Email: <a href="mailto:${manager.email}">${manager.email}</a></li>
                <li class="list-group-item border">Office Number: ${manager.officeNumber}</li>
            </ul>
        </div>
    </div>
    `;
};
//Creates the intern card from the information provided from index.js
const internCard = function (intern) {
  return `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <div class="bg-primary p-2 text-white">
                <h5 class="card-title bg-primary">${intern.name}</h5>
                <h6 class="card-subtitle bg-primary">Intern</h6>
            </div>
            <ul class="list-group list-group-flush bg-secondary">
                <li class="list-group-item border">ID: ${intern.id}</li>
                <li class="list-group-item border">Email: <a href="mailto:${intern.email}">${intern.email}</a></li>
                <li class="list-group-item border">School: ${intern.school}</li>
            </ul>
        </div>
    </div>
    `;
};
//Creates the engineer card from the information provided from index.js
const engineerCard = function (engineer) {
  return `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <div class="bg-primary p-2 text-white">
                <h5 class="card-title bg-primary">${engineer.name}</h5>
                <h6 class="card-subtitle bg-primary">Engineer</h6>
            </div>
            <ul class="list-group list-group-flush bg-secondary">
                <li class="list-group-item border">ID: ${engineer.id}</li>
                <li class="list-group-item border">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></li>
                <li class="list-group-item border">GitHub: <a href="https://github.com/${engineer.github}">${engineer.github}</a></li>
            </ul>
        </div>
    </div>
    `;
};

//Joins all of the different card information into one central spot and creates the full html page with bootstrap css framework

const genPage = function (teamCards) {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Team Profile</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
      </head>
      <body>
          <header class="jumbotron-fluid text-center p-5 bg-danger">
              <h1 class="font-weight-bold"> My Team </h1>
          </header>
  
          <main>
              <div class="container">
                  <div class="row" id="employee cards">
                      ${teamCards}
                  </div>
              </div>
          </main>
      </body>
      <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
      </html>`;
};

generateHTML = (data) => {
  let cardArr = [];

  //runs through all of the created objects to check their roles and use the appropriate Card function for each role.
  for (let i = 0; i < data.length; i++) {
    const employee = data[i];

    if (employee.role === "Manager") {
      //creates the manager card html using the object provided from index.js
      const manager = managerCard(employee);
      //pushes the completed manager card to the cardArr array waiting for the rest of the team's cards to be created and added.
      cardArr.push(manager);
    } else if (employee.role === "Engineer") {
      const engineer = engineerCard(employee);

      cardArr.push(engineer);
    } else if (employee.role === "Intern") {
      const intern = internCard(employee);

      cardArr.push(intern);
    }
  }
  //Combines all of the cards into a string
  const teamCards = cardArr.join("");
  //takes that string and incorperates it into the main HTML page
  const completePage = genPage(teamCards);
  return completePage;
};
// exports the generateHTML function
module.exports = generateHTML;
