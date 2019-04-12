/**
 * @function javaconv require installed on server :
 * @global java version 8 https://www.java.com/en/download/help/linux_x64_install.xml
 * @global unoconv 'npm install unoconv'
 */
'use strict';
const spawn = require('child_process').spawn;
const fs = require('fs');


const javaconv = (converter, to, file, output, style) => {
  const command = 'java',
    options = { shell: true };
  let args = [];
  if (typeof style == 'undefined') {
    args = [
      '-jar', converter,
      '-f', to,
      '-i', file,
      '-o', output
    ];
  } else {

    const styles = JSON.parse(style);
    const fontFamily = styles.fontFamily || 'Arial',
      fontSize = styles.fontSize || 16,
      letterSpacing = styles.letterSpacing || 0,
      wordSpacing = styles.wordSpacing || 4,
      lineHeight = styles.lineHeight || 20;
    args = [
      '-jar', converter,
      '-f', to,
      '-i', file,
      '-o', output,
      '--fontName', fontFamily,
      '--fontSize', fontSize,
      '--letterSpacing', letterSpacing,
      '--wordSpacing', wordSpacing,
      '--interline', lineHeight
    ];
  }

  let convert = () => new Promise((resolve, reject) => {

    let proc = spawn(command, args, options);

    proc.on('error', (error, reject) => {
      console.error('child_process.on Error !\n', error);
      reject
    });
    proc.stdout.on('error', (error, reject) => {
      console.error('child_process.stdout.on Error !\n', error);
      reject
    });
    proc.stdout.on('data', () => {
      console.log('convert in progress ...');
    });
    proc.stdout.on('end', () => {
      fs.readFile(output, (err, content) => {
        if (err) throw err;
        resolve(content.toString());
      });
    });
    proc.stdout.on('error', reject);
    proc.stderr.on('data', (data) => {
      console.error('child_process.stderr.on Error !\n', data);
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