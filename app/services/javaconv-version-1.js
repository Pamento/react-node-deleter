/**
 * @function javaconv require unoconv installed on server
 * 'npm install unoconv'
 */
'use strict';
const spawn = require('child_process').spawn;
// let pwd = spawn('pwd');
// pwd.stdout.on('data', data => {
//   console.log('data from pwd ',data.toString());
// })


const command = 'java';
var options = { maxBuffer: 1024 * 1024 * 100, encoding: 'utf8', timeout: 5000, shell: true };
let args = [
  '-jar',
  '/home/pawel/codem/nodeServerReact/app/services/convert-0.0.1-SNAPSHOT.jar',
  '-f',
  'html',
  '-i',
  '/home/pawel/codem/nodeServerReact/app/services/docx_Test.docx',
  '-o',
  '/home/pawel/codem/nodeServerReact/public/loads/docx.html'
];
// let java = spawn('java', args, options);
// java.stdout.on('data', (data) => { console.log('stdout :', data.toString()); });
// java.stderr.on('data', (data) => { console.log('stderr :' + data); });

const javaconv = (converter, to, file, output) => {

  const command = 'java';
  const options = { maxBuffer: 1024 * 1024 * 100, encoding: 'utf8', timeout: 5000, shell: true };
  const args = ['-jar', converter,'-f', to, '-i', file, '-o', output];

  const convert = src => new Promise((resolve, reject, error) => {

    try {
      const proc = spawn(command, args, options);
      // ////////////////////////////////////////////////////////////////////////////:::
    console.log('_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_');
    if(src != undefined ) {
      console.log(src.toString());
    } else {
      console.log(src)
    }
    console.log('_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_');

    proc.on('error', reject);
    let data = '';
    proc.stdout.on('data', (chunk) => {
      data += chunk.toString();
      console.log('data of file converted :',data)
    });
    proc.stdout.on('end', () => resolve(data));
    proc.stdout.on('error', reject);
    proc.stdin.write(src);
    proc.stdin.on('end',()=>{
      console.log('ok');
      
    })
    proc.stdin.end();
      // ////////////////////////////////////////////////////////////////////////////:::
    } catch(err) {
      console.error('conevert process spawn error',err);
    }
  });

  convert.stream = srcStream => {
    const proc = spawn(command, option);
    srcStream.pipe(proc.stdin);
    return proc.stdout;
  };
  convert();

  return convert;
};

module.exports = javaconv;