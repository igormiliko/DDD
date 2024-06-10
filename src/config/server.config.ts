import * as _package from '../../package.json';

export default {
  asciiArt: `
     █████╗ ██████╗ ██╗
    ██╔══██╗██╔══██╗██║
    ███████║██████╔╝██║
    ██╔══██║██╔═══╝ ██║
    ██║  ██║██║     ██║ V${_package.version}
    ╚═╝  ╚═╝╚═╝     ╚═╝
   `,
  runningOn: (ip: string, port: number) =>
    `\tServer turn on and running in: \n\n` +
    `\t➡️\t- http://localhost:${port}\n` +
    `\t➡️\t- http://${ip}:${port}`,
};
