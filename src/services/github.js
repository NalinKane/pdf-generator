const octokit = require("./octokit");
const axios = require("axios");

module.exports = {
  getUser: async function(username) {
    try {
      let { data } = await octokit.users.getByUsername({ username });
      return data;
    } catch (error) {
      throw new Error("Username not found", error);
    }
  },
  getStarCount: async function(username) {
    try {
      let { data } = await axios.get(
        `https://api.github.com/users/${username}/starred`
      );
      let starCount = 0;
      data.map(repo => (starCount += repo.stargazers_count));
      return starCount;
    } catch (error) {
      throw new Error("Unable to find repos", error);
    }
  }
};
