/**
 * @function javaconv require installed on server :
 * @global java version 8 https://www.java.com/en/download/help/linux_x64_install.xml
 * @global unoconv 'npm install unoconv'
 */
'use strict';
const spawn = require('child_process').spawn;
const fs = require('fs');


const javaconv = (converter, to, file, output, style) => {
  console.log('javaconv')
  const command = 'java',
    options = { shell: true };
  let args = [];
  if (typeof style == 'undefined') {
    args = ['-jar', converter,
      '-f', to,
      '-i', file,
      '-o', output
    ];
    console.log('args :\n',args);
  } else {
    // const fontFamily = style.fontFamily || 'Arial',
    //   fontSize = style.fontSize || 16,
    //   lineHeight = style.lineHeight || null,
    //   letterSpacing = style.letterSpacing || 0,
    //   wordSpacing = style.wordSpacing || 4;
    args = ['-jar', converter,
      '-f', to,
      '-i', file,
      '-o', output
    ];
    console.log('args :\n',args);
  }

  let convert = () => new Promise((resolve, reject) => {

    let proc = spawn(command, args, options);

    proc.on('error', (error, reject) => {
      console.error('child_process.on Error !', error);
      reject
    });
    proc.stdout.on('error', (error, reject) => {
      console.error('child_process.stdout.on Error !', error);
      reject
    });
    proc.stdout.on('data', () => {
      console.log('convert in progress ...');
    });
    proc.stdout.on('end', () => {
      fs.readFile(output, (err, content) => {
        if (err) throw err;
        console.log('I pass by bypass; javaconv proc.stdout.on.end');
        resolve(content.toString());
      });
    });
    proc.stdout.on('error', reject);
    proc.stderr.on('data', (data) => {
      console.error('child_process.stderr.on Error !', data);
    });
  });

  convert.stream = srcStream => {
    const proc = spawn(command, options);
    srcStream.pipe(proc.stdin);
    return proc.stdout;
  };
  return convert;
};

module.exports = javaconv;