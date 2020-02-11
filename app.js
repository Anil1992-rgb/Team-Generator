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
        // generates first set of questions which is only for manager and there can only be one manager.
        const questions = generateQuestions("Manager")

        return inquirer.prompt(questions)
            .then(function(answers) {
                const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                employeeArr.push(manager);
                choose();
            })
    };
    // runs after you created a manager and when you create a new employee, engineer and intern both use this.
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
    // if choosed yes will run this and ask if you want an engineer or intern
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
                //if choosen Engineer, then createEngineer
                if (answers.choose === "Engineer") {
                    createEngineer();
                }
                //if choosen Intern, then createIntern
                if (answers.choose === "Intern") {
                    createIntern();
                }
            })
    }
    // questions to be asked for both engineer and intern
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
        // question to be asked only for manager
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
        // question to be asked only for engineer
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
        // question to be asked only for intern
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
        // switches between questions based on what you choose
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
    // creatas engineer based on answers
    function createEngineer() {
        const questions = generateQuestions("Engineer")
        return inquirer.prompt(questions)
            .then(function(answers) {
                choose()
                const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                employeeArr.push(newEngineer);
            })
    };
    // creates intern based on answers
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