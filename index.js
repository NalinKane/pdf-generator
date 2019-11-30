const inquirer = require("inquirer");
cont[getUser];
const fs = require("fs");

const questions = [
  {
    name: "favColour",
    message: "What is your favourite colour?"
  }
];

function writeToFile(fileName, data) {}

function init() {
  inquirer.prompt(questions).then(answers => {
    console.info("Answer:", answers.favColour);
  });
}

init();
