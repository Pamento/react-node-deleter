'use strict';
const spawn = require('child_process').spawn;

const javaconv = (converter, to, file, output) => {
  const command = 'java';
  const options = { shell: true };
  const args = ['-jar', converter, '-f', to, '-i', file, '-o', output];

  const convert = src => new Promise((resolve, reject) => {

    const proc = spawn(command, args, options);
    proc.on('error', reject);
    let data = '';
    proc.stdout.on('data', chunk => {
      data += chunk.toString();
    });
    proc.stdout.on('end', () => resolve(data));
    proc.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
    proc.stdout.on('error', reject);
    proc.stdin.write(src);
    proc.stdin.on('error', (err) => {
      console.log('write stream error ', err)
    });
    proc.stdin.on('end', () => {
      console.log('end of transfer data');
      resolve(data);
    })
    proc.stdin.end();
  });

  convert.stream = srcStream => {
    const proc = spawn(command, options);
    srcStream.pipe(proc.stdin);
    return proc.stdout;
  };

  return convert;
};

module.exports = javaconv;
