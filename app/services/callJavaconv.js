const javaconv = require('./javaconv');
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

convertDocument = async (fileInfo) => {
  // const to = askedFormatFile();
  const to = 'html';
  const root = path.dirname(require.main.filename);
  // let file = fs.readFileSync(root+'/public/loads/' + `${fileInfo.originName}`, "utf8");
  // let file = `${root}/public/loads/${fileInfo.originName}`;
  // let file = `${fileInfo.originName}`;
  let file = '/home/pawel/codem/nodeServerReact/app/services/docx_Test.docx';
  let converter = '/home/pawel/codem/nodeServerReact/app/services/convert-0.0.1-SNAPSHOT.jar';
  let output = '/home/pawel/codem/nodeServerReact/public/loads/docx.html';
  let ms = 'Non file recived';
  // const output = fileInfo.name + '.' + to;

  //gets your app's root path
  // fs.readFile(root+'/public/loads/' + `${fileInfo.originName}`, "utf8", (err, data) => {
  //   if (err) {
  //     console.log('readFile error',err);
  //     throw err;
  //   }
  //   file = data;
  // });
  console.log('_____48______callJavaconv ___after readFile\n ',fileInfo,'\n');
  
  // javaconv(to, file, output);
  if (file != null) {
    console.log('javaconv Called========before=======================================================\n');

    const javaConvert = await javaconv(converter, to, file, output);
    console.log('javaconv Called=================================after===============================\n');
    
  } else {
    return ms;
  }
  return await Promise.all(javaConvert);

}

module.exports = convertDocument;