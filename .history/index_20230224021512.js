import express from 'express';
import { BOT_API } from './src/config/index.js';
import { Telegraf } from 'telegraf';
import fs from 'fs';

const bot = new Telegraf(BOT_API);
const app = express();

const commandFolders = fs.readdirSync('./src/commands');    // grab all command folder in ./commands
const collection = new Map();

const getAllCommands = async () => {
  // get all the commands and put them in collection map
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./src/commands/${folder}`)
      .filter((file) => file.endsWith('.js'));    // get files from each command folder
    for (const file of commandFiles) {
      const command = await import(`./src/commands/${folder}/${file}`); // dynamically import command files
      console.log("command:", command.default.name, folder); 
      collection.set(command.default.name, command);
    }
  }
}

getAllCommands();

bot.on('message', (ctx) => {
  console.log('Message: ', ctx.message);
  if (!ctx.message.text || !ctx.message.text.startsWith('/')) return ctx.reply(`Please try with /`);   // do nothing if non-text message is sent.

  const commandText = ctx.message.text.match(/\/[a-z]*/)[0].substr(1);  // grab the command name from the text.

  if (!collection.has(commandText)) return `No command text found`;   // if no command is found in collection, return.

  let [commandName, ...args] = ctx.message.text.split(' ');
  const {default: command} = collection.get(commandName.substr(1));   // get the command object from the collection map.
  console.log("Command", command);
  if (!command) return ctx.reply(`No command`);   // if no command found, return.

  // if arguments are not passed for the commands which requires arguments.
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments.\n\nUsage: /${command.name} ${command.usage}`;
    return ctx.reply(reply, { reply_to_message_id: ctx.message.message_id });
  }

  try {
    ctx.telegram.sendChatAction(ctx.chat.id, command.chatAction); // set chat action to 'typing' or 'sending a file'

    if (command.name === 'help')    // if command name is "help", pass collection map to it's exectue method as a parameter.
      return command.execute(ctx, (args = args), collection);
    command.execute(ctx, (args = args)); // else only pass the ctx and arguments.
  } catch (err) {
    console.log(err);
    ctx.reply(
      `Uhg, I ran into some errors, but don't worry it should be fixed soon`
    );
  }
});

app.get('/', (_req, res) => res.send('bot online'));

/**
 * Call the launch method and start the bot.
*/
function startBot() {
  console.log('Bot is running...');
  bot.launch();
}

app.listen(5000, startBot());