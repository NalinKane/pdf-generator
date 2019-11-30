const octokit = require("./octokit");
async function getUser(username) {
  try {
    octokit.users.getByUsername({
      username
    });
  }
}
