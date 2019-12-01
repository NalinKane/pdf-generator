const inquirer = require("inquirer");
const { getUser } = require("./services/github");
const { generatePdf } = require("./components/generatePdf");

const questions = [
  { name: "username", message: "What is your GitHub username?" }
];

async function askForUsername() {
  const { username } = await inquirer.prompt(questions[0]);
  return username;
}

async function askForColour(username) {
  const { colour } = await inquirer.prompt([
    {
      type: "list",
      name: "colour",
      message: `What is ${username}'s favourite colour?`,
      choices: ["green", "blue", "pink", "red"]
    }
  ]);
  return colour;
}

module.exports = {
  init: async function() {
    const username = await askForUsername();
    console.log("Please wait, searching for the username...");
    const gitHubAccount = await getUser(username);
    const colour = await askForColour(gitHubAccount.name.split(" ")[0]);

    const data = {
      colour,
      username,
      avatar: gitHubAccount.avatar_url.split("?")[0], // removing &v=4 from url as it was incorrectly read by puppeteer
      name: gitHubAccount.name
    };

    console.log("Please wait, generating a PDF");
    await generatePdf(data);
    console.log(`Completed! Please open "./out/${username}.pdf" `);
  }
};
