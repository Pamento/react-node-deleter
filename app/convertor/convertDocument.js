/**
 * @function convertDocument is the middleware between router.post and javanov.js
 * @function extention & @function askedFormatFile is for future reconvertion from html back to original type file
 */
const javaconv = require('./javaconv');
const fs = require('fs');
const path = require('path');
const appRoot = path.dirname(require.main.filename);
const fileDir = appRoot + '/public/loads/mdb.json';

// fn() must find file form mdb.json and give me back the extention - indicator of type of file to convert
// if the file not exist ?
const findInMdbJson = (fileToFind) => {

  let find = () => new Promise((resolve, reject) => {
    let to = '';

    fs.readFile(fileDir, (err, content) => {
      if (err) reject(err);
console.log('---------------------------file',content)
      let fexist = [],file;
      let jsonFile = content.toString();
      console.log("jsonFile in:\n",jsonFile);
      if ((jsonFile === '') || (typeof jsonFile === 'undefined')) {
        to = 'html';
      } else {
        var parseJson = JSON.parse(jsonFile);
        jsonFile = parseJson;
        for (const key of jsonFile) {
          let k = Object.keys(key)
          fexist.push(k[0]);
        }
        console.log('keys list:\n',fexist);
        file = jsonFile[fexist.indexOf(fileToFind)];
      }
      to = file[fileToFind].extention;
      console.log('convertDocument > promise > find > extention :\n',to);
    });
    return to;
  });
  return find;
}

const convertDocument = (fileInfo) => {
  let to;
  let file = appRoot +"/"+fileInfo.src;
  console.log('BEFOR CONVERT\n',file);
  let converter = appRoot+'/app/convertor/convert-0.0.1-SNAPSHOT.jar';
  let output;

  if (fileInfo.extention === 'html') {
    let ext = findInMdbJson(fileInfo.name);
    ext().then((data) => {
      to = data;
      output = appRoot + "/public/loads/" + fileInfo.name + '.' + to;
      console.log('PROMISE ',data);
      return javaconv(converter,to,file,output);
    })
    .catch((err) => {
      throw err;
    });
  } else {
    to = 'html';
    output = appRoot + "/public/loads/" + fileInfo.name + '.' + to;
    return javaconv(converter,to,file,output);
  }
}

module.exports = convertDocument;