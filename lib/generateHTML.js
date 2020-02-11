Manager = require("./Manager");
employee = require("../app")

const generateHTML = (employeeCards) => {
    return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
    <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/73e2d51f51.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>Team</title>
  
  <body>
    <style>
      header {
        text-align: center;
        color: mintcream;
        padding: 30px;
        background-color: orange;
      }
  
      h1 {}
  
      h3 {
        font-weight: bold;
      }
  
      p {
        font-weight: bold;
      }
  
      .list-group-item {
        font-weight: 600;
        padding: 15px;
      }
  
      .card {
        margin: 15px;
      }
    </style>
    <header>
      <h1>MY TEAM</h1>
      <h1><i class="fas fa-users"></i></h1>
  
    </header>
  
    <br>
  
    <div class="container">
      <div class="wrapper">
        <div class="row row-cols-2 row-cols-md-3">
          ${employeeCards}
        </div>
      </div>
    </div>
  
  
  </body>
  
  </html>
      `;
};

module.exports = generateHTML;