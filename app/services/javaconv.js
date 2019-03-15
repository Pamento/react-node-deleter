/**
 * @function javaconv require unoconv installed on server
 * 'npm install unoconv'
 */
'use strict';
const spawn = require('child_process').spawn;
const cp = require('child-process-es6-promise');
const fs = require('fs');

// require('colors');
// let pwd = spawn('pwd');
// pwd.stdout.on('data', data => {
//   console.log('data from pwd ',data.toString());
// })


// const command = 'java';
// var options = { maxBuffer: 1024 * 1024 * 100, encoding: 'utf8', timeout: 5000, shell: true };
// let args = [
//   '-jar',
//   '/home/pawel/codem/nodeServerReact/public/loads/convert-0.0.1-SNAPSHOT.jar',
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
  const options = { shell: true };
  const args = ['-jar', converter, '-f', to, '-i', file, '-o', output];

  let convert = () => new Promise((resolve,reject)=> {

    let proc = spawn(command, args, options);

    proc.on('error', (error, reject)=>{
      console.error('child_process.on Error !',error);
      reject
    });
    proc.stdout.on('error', (error, reject)=>{
      console.error('child_process.stdout.on Error !',error);
      reject
    });
    let data = '';
    proc.stdout.on('data', chunk => {
      data += chunk.toString();
    });
    proc.stdout.on('end', () => {
      fs.readFile(output,(err,content)=>{
        if (err) throw err;
        resolve(content.toString())
      })
    });
    proc.stdout.on('error', reject);
    proc.stderr.on('data',(data)=>{
      console.error('child_process.stderr.on Error !',data);
    })
  });

  convert.stream = srcStream => {
    const proc = spawn(command, options);
    srcStream.pipe(proc.stdin);
    return proc.stdout;
  };
  return convert;
};

module.exports = javaconv;