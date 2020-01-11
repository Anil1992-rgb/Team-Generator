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
];

function prompUser() {
    return inquirer.prompt(questions)
}

function writeToFile(fileName, data) {
    writeFileAsync(fileName, data)

}



function createManager() {
    const managerQuestion = {
        type: "input",
        name: "officeNumber",
        message: "What is your Office Number",
    }
    questions.push(managerQuestion);
}

function createEngineer() {
    const EngineerQuestion = {
        type: "input",
        name: "github",
        message: "What is your github username?",
    }
    questions.pop();
    questions.push(managerQuestion);
}

function createIntern() {
    const InternQuestion = {
        type: "input",
        name: "school",
        message: "What is the name of your school?",
    }
    questions.pop();
    questions.push(managerQuestion);
}

prompUser();