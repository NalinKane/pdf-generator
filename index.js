const inquirer = require("inquirer");
const { getUser } = require("./src/services/github");
const { generatePdf } = require("./src/components/generatePdf");

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
  console.log("Please wait, searching for the username...");
  const gitHubAccount = await getUser(username);
  const colour = await askForColour(gitHubAccount.name.split(" ")[0]);

  const data = {
    title: "A new Brazilian School",
    date: "05/12/2018",
    name: "kicia",
    age: 28,
    birthdate: "12/07/1990",
    course: "Computer Science",
    obs:
      "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce."
  };
  console.log("Please wait, generating a PDF");
  await generatePdf(data, colour);
  console.log(`Completed! Please open "./out/${username}.pdf" `);
}

init();
