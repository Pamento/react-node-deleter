const javaconv = require('./javaconv-version-0');
const fs = require('fs');
const path = require('path');

// extract name
// switch for case :: {html, odt, doc, docx}
// path to file
// if convert success / delete file

extention = (askedFormat) => {
  console.log('file gon a be ', askedFormat);
}

askedFormatFile = () => {
  const extention = extention(askedFormat);
  const to = '';
  switch (extention) {
    case 'html':
      to = 'html'
      break;
    case 'odt':
      to = 'odt'
      break;
    case 'doc':
      to = 'doc'
      break;
    case 'docx':
      to = 'docx'
      break;
    default:
      to = "Sorry, extention non supported."
      break;
  }
  return to;
}

const convertDocument = (fileInfo) => {
  // const to = askedFormatFile();
  
  const to = 'html';
  const root = path.dirname(require.main.filename);
  console.log("root call java",root);
  console.log(fileInfo.output);
  
  let file = root +"/"+fileInfo.src
  console.log("callJavaconv",fileInfo);
  
  let converter = '/home/kevin/code/kevin-take-it/app/services/convert-0.0.1-SNAPSHOT.jar';
  
  let ms = 'Non file recived';
  return javaconv(converter,to,file,fileInfo.output)
  
}

module.exports = convertDocument;
