/**
 * @function javaconv require unoconv installed on server
 * 'npm install unoconv'
 */
'use strict';
const spawn = require('child_process').spawn;
// require('colors');
// let pwd = spawn('pwd');
// pwd.stdout.on('data', data => {
//   console.log('data from pwd ',data.toString());
// })


// const command = 'java';
// var options = { maxBuffer: 1024 * 1024 * 100, encoding: 'utf8', timeout: 5000, shell: true };
// let args = [
//   '-jar',
//   '/home/pawel/codem/nodeServerReact/app/services/convert-0.0.1-SNAPSHOT.jar',
//   '-f',
//   'html',
//   '-i',
//   '/home/pawel/codem/nodeServerReact/app/services/docx_Test.docx',
//   '-o',
//   '/home/pawel/codem/nodeServerReact/public/loads/docx.html'
// ];
// let java = spawn('java', args, options);
// java.stdout.on('data', (data) => { console.log('stdout :', data.toString()); });
// java.stderr.on('data', (data) => { console.log('stderr :' + data); });

const javaconv = (converter, to, file, output) => {

  const command = 'java';
  const options = { stdio: 'ignore', shell: true };
  const args = ['-jar', converter, '-f', to, '-i', file, '-o', output];

  let convert = async (src) => {
    console.log('_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_');
    console.log(src,'.\n');
    let proc = await spawn(command, args, options);

    // proc.on('error', reject);
    let data = '';

    proc.stdout.on('data', (snip) => {
      data += snip.toString();
      console.log('data of file converted :', data)
    });

    proc.stdout.on('end', () => { return data; });
    // proc.stdout.on('error', reject);

    proc.stdout.on('error', function (err) {
      console.log("\x1b[31m", 'stdout error: ', err);
    });

    var exit_msg = 'Exited with code... ';

    proc.on('exit', function (code) {
      if (code != 0) {
        console.log("\x1b[31m", exit_msg, code);
        process.exit(1); // Or whatever you want to handle errors.
      }

      console.log("\x1b[32m", exit_msg, code);
      // The code you want to execute once your command is done goes here.
    });

    proc.stdin.write(src);
    proc.stdin.on('end',(data)=>{
      console.log('_______________________________________stdin____________________________________________________')
      return data.toString();
    })
    proc.stdin.end();
  };

  convert.stream = srcStream => {
    const proc = spawn(command, option);
    srcStream.pipe(proc.stdin);
    return proc.stdout;
  };
  convert();

  return convert;
};

module.exports = javaconv;