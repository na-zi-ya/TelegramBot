> # Template for Telegram bots.
> Boilerplate for creating [Telegram bots](https://telegram.org/) using [telegraf.js](https://telegrafjs.org)

# Setup
  This project needs `express.js`, `telegraf.js` and `dotenv` packages to work right out of the box. Just run `yarn` or `npm install` in the terminal to install those packages. 

  After that

  - Add **bot secret token** in a `.env` file. Check [.env.example file](https://github.com/naz-i-ya/TechBuddyTelegramBot[TBTB]/blob/master/.env.example) for variable names.
  - Run `yarn start` or `npm start` to start the bot.

# Creating new commands
> **Warning:** Do not directly create command files in the `src/commands` folder.

In order to create new commands, you must first decide what sub-folder of `src/commands` this command will go into.

For example, if you want to create an admin specific command, kick, then you can create a new sub-folder called `/admin` in the `src/commands` folder and add a file named `kick.js` to it. After doing so, you folder structure should look something like this:
```
  commands 
  |---- utility
         |-- echo.js
         |-- help.js
  |---- admin
         |-- kick.js
```

# Bot
![image](https://user-images.githubusercontent.com/76842801/214855446-762a3b0d-2434-49bd-83b1-423cce3c5235.png)
![image](https://user-images.githubusercontent.com/76842801/214856312-06a49312-da28-43a5-9ee5-8fc70fef833d.png)
![image](https://user-images.githubusercontent.com/76842801/214858170-ad947331-6e62-4469-b9d0-c5baf58f1bc5.png)
![image](https://user-images.githubusercontent.com/76842801/218337470-e61aa718-9914-4f90-9438-67a8c3568920.png)
![image](https://user-images.githubusercontent.com/76842801/230742311-d58a338d-bc89-4b2b-9ff8-45fc18e9db1a.png)






