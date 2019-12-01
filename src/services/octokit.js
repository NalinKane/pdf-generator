const Octokit = require("@octokit/rest");

module.exports = new Octokit({
  auth: process.env.GIT_TOKEN
});
