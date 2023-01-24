import axios from 'axios';
import { JClientID, JClientSecret } from '../../config';

module.exports = {
  name: 'node',
  description:
    'Executes Nodejs/Javascript\n\nWRANING: Dont use String templates',
  usage: '<javascript-code>',
  args: true,
  argumentType: 'Javascript code snippet',
  chatAction: 'typing',
  async execute(ctx, code) {
    function escBackticks(str) {
      return str.replace(/`/gi, '``');
    }

    const program = {
      script: `${escBackticks(code.join(' '))}`,
      language: `nodejs`,
      versionIndex: '3', // NodeJs version 12.11.1
      clientId: JClientID,
      clientSecret: JClientSecret,
    };

    axios
      .post('https://api.jdoodle.com/v1/execute', program, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const { output, memory, cpuTime } = res.data;

        ctx.replyWithMarkdown(
          `*Output:*\n${output}` +
            `\n\n*Memory:* ${memory}` +
            `\n*Cpu Time:* ${cpuTime}`
        );
      })
      .catch((e) => {
        console.log(e.message);
        ctx.reply(e.message);
      });
  },
};