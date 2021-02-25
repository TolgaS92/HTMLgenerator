const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
const askQuestion = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
        },
        {
            type: 'input',
            message: 'What is your preffered location?',
            name: 'city',

        },
        {
            type: 'input',
            message: 'What is your short Bio?',
            name: 'Bio',
        },
        {
            type: 'input',
            message: 'What is your Linkedin Url?',
            name: 'Linkedin',
        },
        {
            type: 'input',
            message: 'What is your Github Url?',
            name: 'Github',
        },
    ])
}
const makeHtmlPage = (data) =>
    `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <title>Index Creator</title>
    </head>
    
    <body>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4">Hi! My name is ${data.name}</h1>
          <p class="lead">I am from ${data.city}.</p>
          <p class="lead">Short Bio About Me: ${data.Bio}</p>
          <h3><span class="badge badge-secondary">Contact Me</span></h3>
          <ul class="list-group">
            <li class="list-group-item">LinkedIn: ${data.Linkedin}</li>
            <li class="list-group-item">My GitHub username is ${data.Github}</li>
          </ul>
        </div>
      </div>
    </body>
    
    </html>`

const init = () => {
    askQuestion()
        .then((answers) => writeFileAsync('index.html', makeHtmlPage(answers)))
        .then(() => console.log('Succesfuly wrote!'))
        .catch((err) => console.error(err));
};
init();