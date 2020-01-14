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




//writeFileAsync(fileName, questions)




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
                    chooseYes();
                }
                if (answers.continue.toLowerCase() === "n") {
                    process.kill(process.pid);
                }
            })
    };

    function chooseYes() {
        const chooseYep = [{
            type: "list",
            name: "choose",
            message: "Choose an employee",
            choices: [
                "Engineer",
                "Intern"

            ]
        }]
        return inquirer.prompt(chooseYep)
            .then(function(answers) {
                if (answers.choose === "Engineer") {
                    createEngineer();
                }
                if (answers.choose === "Intern") {
                    createIntern();
                }
            })
    }

    function generateQuestions(employeeType) {
        const questions = [{
                type: "input",
                name: "name",
                message: "What is your name?",
                validate: (input) => {
                    var letters = /^[A-Za-z]+$/;
                    if (input.match(letters)) {
                        return true;
                    } else {
                        return "Use only letters please";
                    }
                }

            },

            {
                type: "input",
                name: "ID",
                message: "What is your ID?",
                validate: (input) => {
                    var letters = /^[0-9]+$/;
                    if (input.match(letters)) {
                        return true;
                    } else {
                        return "Use only numbers please";
                    }
                }
            },

            {
                type: "input",
                name: "Email",
                message: "What is your email",
                validate: (input) => {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (input.match(re)) {
                        return true;
                    } else {
                        return "Not a valid email address";
                    }
                }
            },
        ]
        const managerQuestion = {
            type: "input",
            name: "officeNumber",
            message: "What is your Office Number",
            validate: (input) => {
                if (input.trim() !== "") {
                    return true;
                } else {
                    return "Enter a valid office number";
                }
            }
        }

        const EngineerQuestion = {
            type: "input",
            name: "github",
            message: "What is your github username?",
            validate: (input) => {
                if (input.trim() !== "") {
                    return true;
                } else {
                    return "Enter a valid username";
                }
            }
        }

        const InternQuestion = {
            type: "input",
            name: "school",
            message: "What is the name of your school?",
            validate: (input) => {
                if (input.trim() !== "") {
                    return true;
                } else {
                    return "Enter a valid school name";
                }
            }
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