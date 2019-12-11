const inquirer = require("inquirer");
const { getUser, getStarCount } = require("./services/github");
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
    const stars = await getStarCount(username);

    const name =
      gitHubAccount.name === null || gitHubAccount.name === ""
        ? username
        : gitHubAccount.name;
    const colour = await askForColour(name.split(" ")[0]);

    const data = {
      colour,
      username,
      stars,
      avatar: gitHubAccount.avatar_url.split("?")[0], // removing &v=4 from url as it was incorrectly read by puppeteer
      name: gitHubAccount.name,
      location: gitHubAccount.location,
      blog: gitHubAccount.blog,
      githubProfile: gitHubAccount.html_url,
      bio: gitHubAccount.bio,
      followers: gitHubAccount.followers ? gitHubAccount.followers : 0,
      following: gitHubAccount.following ? gitHubAccount.following : 0,
      publicRepos: gitHubAccount.public_repos ? gitHubAccount.public_repos : 0
    };

    console.log("Please wait, generating a PDF");
    await generatePdf(data);
    console.log(`Completed! Please open "./out/${username}.pdf" `);
  }
};
