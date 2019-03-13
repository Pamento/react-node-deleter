'use strict';

const spawn = require('child_process').spawn;




const javaconv = (converter, to, file, output) => {
// const javaconv = (from, to, ...args) => {
//   const option = ['-f', from, '-t', to].concat(args);

const command = 'java';
const options = { maxBuffer: 1024 * 1024 * 100, encoding: 'utf8', timeout: 5000, shell: true };
const args = ['-jar', converter,'-f', to, '-i', file, '-o', output];



  const convert = src => new Promise((resolve, reject) => {
    console.log('____________________________________________________________________________________');
    console.log(src);
    
    
    const proc = spawn(command, args, options);
    proc.on('error', reject);
    let data = '';
    proc.stdout.on('data', chunk => {
      data += chunk.toString();
    });
    proc.stdout.on('end', () => resolve(data));
    proc.stdout.on('error', reject);
    proc.stdin.write(src);
    proc.stdin.end();
  });

  convert.stream = srcStream => {
    const proc = spawn(command, option);
    srcStream.pipe(proc.stdin);
    return proc.stdout;
  };

  return convert;
};

module.exports = javaconv;
