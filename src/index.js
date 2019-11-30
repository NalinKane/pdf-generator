const inquirer = require("inquirer");
const { getUser } = require("./services/github");
const fs = require("fs");

const questions = [
  { name: "username", message: "What is your GitHub username?" }
];

function askForUsername() {
  return inquirer.prompt(questions[0]).then(answers => {
    return answers.username;
  });
}

function askForColour(username) {
  return inquirer.prompt([
    {
      name: "favColour",
      message: `What is ${username}'s favourite colour?`
    }
  ]);
}

async function init() {
  const username = await askForUsername();
  const gitHubAccount = await getUser(username);
  const colour = await askForColour(gitHubAccount.name.split(" ")[0]);
}

init();
