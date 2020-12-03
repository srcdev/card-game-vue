# Fill in the blanks card game
Front end for the fill in the blanks card game.

This is a public repo for the refactoring of what can be played at [uuwuu.co.uk](http://uuwuu.co.uk).
The current version was thrown together during lockdown and had a fair amount of tech debt in it. I'm paying that back now with this pure VueJs version.

## Known issues
* Security warning as not hosted on https (especially with Brave browser)
* Brave browser attempts an https upgrade which results in error 404 page not found

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

#### Environment configuration

* .env.development.local
* .env.production.local

NOTE: Values are not in quotes
```
/*
* Do not keep these files in a Git repo
**/
VUE_APP_IPADDRESS=
VUE_APP_WEBSOCKETS_IP=
VUE_APP_WEBSOCKETS_PORT=
VUE_APP_HTTP_PORT=
```
