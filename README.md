<h1 align="center">BLAXJAX - BLACKJACK PROJECT👋</h1>
    
<p align="center">
    <img src="https://img.shields.io/badge/Javascript-yellow" />
    <img src="https://img.shields.io/badge/express-orange" />
    <img src="https://img.shields.io/badge/Sequelize-blue"  />
    <img src="https://img.shields.io/badge/mySQL-red"  />
    <img src="https://img.shields.io/badge/dotenv-green" />
    <img src="https://img.shields.io/badge/Handlebars-blueviolet" />
    <img src="https://img.shields.io/badge/BlackjackStrategy-lightgrey" />
    <img src="https://img.shields.io/badge/Bcrypt-ff69b4" />
</p>
   
## Description

This is a simple Blackjack app that enables a user to set up a profile and login under that profile to play blackjack.  The user will compete against the dealer, and will be ranked against prior players.  It utilizes MYSQL

  
💻 Below are jpgs showing the various pages:

![LOGIN PAGE](./animations/...jpg)

![PROFILE PAGE](./animations/G...jpg)

![TABLEGAME PAGE](./animations/...jpg)


  
🎥 The full movie file showing functionality of the application can be found in the animations directory as shown below:

![APP VIDEO](./animations/...gif)
  
## User Story
  
```
AS A USER,
I WANT TO be able to login to my profile to play Blackjack
SO THAT I can try my luck against the dealer.
IT’S DONE when I play Blackjack, win, lose or draw.
```
  
## Acceptance Criteria
  
``` 
GIVEN a functional Express.js API
WHEN I create a profile
THEN I am able to login to the profile page
WHEN I select the option to start a new game
THEN I am taken to the blackjack game page
WHEN I am presented with two cards
THEN I can decide whether to hit or stay
WHEN I hit, an additional card is provided to me
THEN if the card value is not greater than 21 I will have the option to hit or stay again, but if the value is over 21 I will bust and lose the game
WHEN I have a final card score of less than 21 but greater than the dealer
THEN I win the round
```
  
## Table of Contents
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation
💾   Before starting, please have Node.js and npm installed on your computer. Then clone the repo. Add a .env file to your root directory. Fill out the .env file with your information as so:
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

## Usage
💻   

## Contributing
: [Byungwook Yoon (Ethan)](https://github.com/byung90/)
: [Dwyane (Shangxian) Piao](https://github.com/sj212131)
: [Taylor Leong](https://github.com/tjl2125/)
: [Phil Katz](https://github.com/PKatz1/)


## Questions
✉️ Contact us with any questions: 

[Ethan email](mailto:....com) , [GitHub](https://github.com/byung90/) 

[Dwayne email](mailto:....com) , [GitHub](https://github.com/sj212131) 

[Taylor email](mailto:....com) , [GitHub](https://github.com/tjl2125/) 

[Phil email](mailto:pkatz@finkkatz.com), [GitHub](https://github.com/PKatz1/)

