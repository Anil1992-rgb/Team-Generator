const Employee = require("./Employee");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
//const generateHTML = require("./generateHTML");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);



function prompUser() {
    return inquirer.prompt(questions)
}

function writeToFile(fileName, questions) {
    writeFileAsync(fileName, questions)

}



function init() {

    function createManager() {
        const questions = generateQuestions("Manager")

        return inquirer.prompt(questions)
            .then(function() {
                choose();
            })
    };


    function choose() {
        const chooseEmployee = [{
            type: "input",
            name: "continue",
            message: "Do you want to add another employee [y/n]"
        }]
        return inquirer.prompt(chooseEmployee)
            .then(function(answers) {
                if (answers.continue.toLowerCase() === "y") {
                    if (answers.choose === "Engineer") {
                        createEngineer();
                    }
                    if (answers.choose === "Intern") {
                        createIntern();
                    }
                }
                if (answers.continue.toLowerCase() === "n") {
                    console.log("no");
                    // process.kill();
                }
            })
    };

    // function chooseNo() {
    //     const chooseNope = [{
    //         type: "list",
    //         name: "choose",
    //         message: "Choose an employee",
    //         choices: [
    //             "Engineer",
    //             "Intern"

    //         ]
    //     }]
    // }

    function generateQuestions(employeeType) {
        const questions = [{
                type: "input",
                name: "name",
                message: "What is your name?",

            },

            {
                type: "input",
                name: "ID",
                message: "What is your ID?",
            },

            {
                type: "input",
                name: "Email",
                message: "What is your email",
            },
        ]
        const managerQuestion = {
            type: "input",
            name: "officeNumber",
            message: "What is your Office Number",
        }

        const EngineerQuestion = {
            type: "input",
            name: "github",
            message: "What is your github username?",
        }

        const InternQuestion = {
            type: "input",
            name: "school",
            message: "What is the name of your school?",
        }

        switch (employeeType) {
            case "Engineer":
                questions.push(EngineerQuestion);
                break;
            case "Intern":
                questions.push(InternQuestion);
                break;
            case "Manager":
                questions.push(managerQuestion);
                break;

        }
        return questions;

    }


    function createEngineer() {
        const questions = generateQuestions("Engineer")



        return inquirer.prompt(questions)
            .then(function(answers) {
                choose()
            })

        //const engineer = new Engineer(questions.name, questions.id, questions.email, questions.github);


    };

    function createIntern() {
        const questions = generateQuestions("Intern")

        return inquirer.prompt(questions)
            .then(function(answers) {
                choose()
            })
    };

    createManager();
};

init();