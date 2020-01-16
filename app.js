const inquirer = require("inquirer");
const jest = require("jest");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generateHTML = require("./lib/generateHTML");
const fs = require("fs");
const employeeArr = [];
const mapArr = require("./lib/mapArr");

function init() {
    function createManager() {
        const questions = generateQuestions("Manager")

        return inquirer.prompt(questions)
            .then(function(answers) {
                const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                employeeArr.push(manager);
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
                    mapArr(employeeArr);
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
                        return "Letters only!";
                    }
                }
            },

            {
                type: "input",
                name: "id",
                message: "What is your ID number?",
                validate: (input) => {
                    var letters = /^[0-9]+$/;
                    if (input.match(letters)) {
                        return true;
                    } else {
                        return "Numbers only!";
                    }
                }
            },

            {
                type: "input",
                name: "email",
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
                var letters = /^[0-9]+$/;
                if (input.match(letters)) {
                    return true;
                } else {
                    return "Numbers only!";
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
                    return "Must enter a username";
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
                    return "Must enter a school name";
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
                const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                employeeArr.push(newEngineer);
            })
    };

    function createIntern() {
        const questions = generateQuestions("Intern")

        return inquirer.prompt(questions)
            .then(function(answers) {
                choose()
                const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
                employeeArr.push(newIntern);
            })
    };
    createManager();
};
init();