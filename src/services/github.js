const octokit = require("./octokit");
module.exports = {
  getUser: async function(username) {
    try {
      let { data } = await octokit.users.getByUsername({ username });
      console.log(data);
      return data;
    } catch (error) {
      throw new Error("Username not found", error);
    }
  }
};
