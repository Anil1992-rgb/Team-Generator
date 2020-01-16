const generateHTML = require("./generateHTML");
const fs = require("fs");

const loopandwrite = (employeeArr) => {
    const employeeCards = employeeArr.map(employee => {
        if (employee.getRole() == "Manager") {
            roleSpecificInfo = "Office Number:&nbsp;" + employee.getOfficeNumber();
        } else if (employee.getRole() == "Engineer") {
            roleSpecificInfo = "GitHub:&nbsp;" + employee.getGithub();
        } else if (employee.getRole() == "Intern") {
            roleSpecificInfo = "School:&nbsp;" + employee.getSchool();
        }
        return `<div class="card text-white shadow-lg" style="max-width: 18rem;">
      <div class="card-header bg-primary">
        <h3>${employee.name}</h3>
        <h4><i class="fas fa-graduation-cap" style="color:rgb(43, 207, 10);"></i> ${employee.getRole()}</h4>
      </div>
      <div class="card-body bg-light">
        <ul class="list-group list-group-flush text-dark shadow-sm">
          <li class="list-group-item">ID: ${employee.id}</li>
          <li class="list-group-item">Email: <a href="mailto: ${employee.email}" target="_blank">${employee.email}</a></li>
          <li class="list-group-item">${roleSpecificInfo}</li>
        </ul>
      </div>
    </div>`
    });

    html = generateHTML(employeeCards);

    fs.writeFile("./output/team.html", html, function(err) {
        if (err) {
            return console.log(err);
        }
    });
}
module.exports = loopandwrite