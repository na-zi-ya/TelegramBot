import google from '../../services/google.js';

export default {
  name: 'google',
  description: 'Get search results from Google',
  usage: '<query-to-search>',
  args: true,
  argumentType: 'a query to search',
  chatAction: 'typing',
  async execute(ctx, query) {
    const result = await google(query);
    try {
      await ctx.replyWithMarkdown(result.markdown);
    } catch (e) {
      // console.log(e)
      await ctx.replyWithMarkdown(
        `
        The result is too long to display. Please visit this search query link manually\n\n` +
          `https://duckduckgo.com/?q=${query.join('%20')}`
      );
    }
  },
};