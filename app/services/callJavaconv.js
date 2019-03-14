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

convertDocument = (fileInfo) => {
  // const to = askedFormatFile();
  const to = 'html';
  const root = path.dirname(require.main.filename);
  // let file = fs.readFileSync(root+'/public/loads/' + `${fileInfo.originName}`, "utf8");
  // let file = `${root}/public/loads/${fileInfo.originName}`;
  // let file = `${fileInfo.originName}`;
  let file = '/home/pawel/codem/nodeServerReact/public/loads/docx_Test.docx';
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
  console.log('_____48______callJavaconv ___after readFile\n ', fileInfo, '\n');

    console.log('javaconv Called__,========before=======================================================\n');
    try {
      if (fs.existsSync(root+`/public/loads/${fileInfo.originName}`)) {
        //file exists
        const javaConvert = javaconv(converter, to, file, output);

        javaConvert(fs.readFileSync(file))
          .then((fl,error) => {
            if (error) {
              console.error('/////////////////////////// New Error Call javaconv :\n', error);
            }
            console.log(fl.toString());
            return javaconv(this);// what I'm doing here ?
          });
      }
    } catch(err) {
      console.error('callJavaconvert Error :\n',err);
    }

    console.log('javaconv Called__,===========================================after=====================\n');

}

module.exports = convertDocument;
