export default {
  name: 'echo',
  description: 'Echoes the message!',
  args: true,
  usage: 'Some text to display',
  chatAction: 'typing',
  execute(ctx, args, commands) {
    ctx.reply(args.join(" "));
  }, 
}