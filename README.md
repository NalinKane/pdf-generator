# pdf-generator

## Installation

1. Clone the repository and run `npm install`.
2. You will need a Git Personal Access Token. [Generate it here]('https://github.com/settings/tokens'). You will need to give it following permissions:

   1. _repo_
   2. _user_

   > In the project structure you can see the file called `default.env`. Copy its contents and create a new file called `.env`. Assign the token you've created to the variable called GIT_TOKEN
   >
   > e.g.
   >
   > `GIT_TOKEN='345dfghdfgh17087e2535f86'`

## Usage

Go to the root of the project and using your favourite command line tool run:

`node index.js`

After following instructions the PDF will be generated to a folder called `out`, which will be created by the script.
