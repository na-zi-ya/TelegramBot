// String template for specific command.
const specificCommandTemplate = (name, description, args, usage) => {
  return (
    `*Command name:*\n${name}\n\n` +
      `*Description:*\n${description}\n\n` +
      `*Requires Arguments:*\n${args}\n\n` +
      `*Usage:*\n\/${name} ${usage}\n\n` 
  );
}  

export default {
  name: 'help',
  description: 'help!',
  args: false,
  usage: '<command-name>',
  chatAction: 'typing',
  execute(ctx, args, commands) {
    if (args && commands.has(args[0])) {    // check if args are passed and commands collection has the command.
      const { default: command } = commands.get(args[0]);   // get the command. 
      
      return ctx.replyWithMarkdown(         // display information about that particular command.
        specificCommandTemplate(command.name, command.description, command.args, command.usage),
        { reply_to_message_id: ctx.message.message_id }
      );

    } else if (!args.length) {    // if no arguments are passed, show all the available commands.
      let commandsMessage = 'Available Commands:\n';  

      for (let [value, _] of commands) {  // add all the commands from commands collection.
        commandsMessage += `/${value}\n`;
      }
      commandsMessage += "\nType /help <command_name> for command details."
      ctx.reply(commandsMessage);
    } else {
      ctx.reply('No command found');
    }
  }, 
}