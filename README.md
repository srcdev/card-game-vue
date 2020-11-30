# Fill in the blanks card game
Front end for the fill in the blanks card game.

This is a public repo for the refactoring of what can be played at [UUWUU](http://uuwuu.co.uk).
The current version was thrown together during lockdown and had a fair amount of tech debt in it. I'm paying that back now with this pure VueJs version.

## Dependancies
* Node Version Manager (NVM)

## Clone the repo
```
git clone https://github.com/srcdev/card-game-vue
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Run unit testing
This project has a (WIP) suit of unit test using Jest
```
npm run test
```

### Compiles and minifies for production
```
npm run build
```
### Compiles and minifies for production then delpoys via ftp to server
```
npm run deploy
```
#### NOTE: Requires the ftpDeployConfig file for server login details
Example file below, DO NOT include in a repo, especially a public on.
```
/*
* Do not keep this file in a Git repo
**/
var config = {
    host: `ftp.your-server.co.uk`,
    user: `your-server-username`,
    password: `your-server-password`,
    sourcePath: `${__dirname}/dist/`,
    remotePath: `/htdocs`,
    permissions: 755
};

exports.config = config;
```

