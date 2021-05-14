# BlaxJax

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## User Story

```
AS an avid blackjack player,
WHEN I use BlaxJax,
I WANT to be able to login to my profile to play BlackJack
SO that I can try my luck against the dealer
IT'S DONE when I, the player, win, lose, or draw against the dealer
```

### Github Repo
[BlaxJax](https://github.com/byung90/blaxtrax)

## Description
This is a Blackjack app that enables a user to set up a profile and login under that profile to play blackjack.  The user will compete against the dealer, and will be ranked against prior players.

## Instructions 
Before starting, please have Node.js and npm installed on your computer. Then clone the repo. Add a .env file to your root directory. Fill out the .env file with your information as so:
```
DB_NAME=blackjack_db
DB_USER=
DB_PW=
```
Install the dependencies by opening the integrated terminal in your root termainal and entering: 
```
npm i 
```
Run the seed that is located in seeds/seeds.js:
```
npm run seed
```
Then connect to the server:
```
npm start
```
### Demo
![Login and Signup](./public/img/login-and-signup.png)

![Profile Page](./public/img/profile.png)


### Made with:
- <a href = "https://getbootstrap.com/docs/4.6/getting-started/introduction/">Bootstrap CSS Framework</a>
- <a href = "https://handlebarsjs.com/installation/">Handlebars.js </a>
- <a href = "https://www.npmjs.com/package/bcrypt">Bcrypt Library </a>
- <a href = "https://www.npmjs.com/package/dotenv">Dotenv Library</a>
- <a href = "https://www.npmjs.com/package/mysql2">MySQL2 Library</a>
- <a href = "https://sequelize.org/">Sequelize Library</a>
- <a href = "https://www.npmjs.com/package/express"> Express Library </a>
- <a href = "https://www.npmjs.com/package/express-session">Express-Session Library </a> 
- <a href = "https://www.npmjs.com/package/express-handlebars">Express-handlebars </a>
- <a href = "https://www.npmjs.com/package/connect-session-sequelize"> Connect-Session-Sequelize Library</a>
- <a href = "https://www.npmjs.com/package/blackjack-strategy">BlackJack-Strategy Library</a>

Copyright (c) [2021] [Byungwook (Ethan) Yoon, Shangxian (Dwayne) Piao, Taylor Leong, Philip Katz]
