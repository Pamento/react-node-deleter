/**
 * @function convertDocument is the middleware between router.post and javanov.js
 * @function extention & @function askedFormatFile is for future reconvertion from html back to original type file
 */
const javaconv = require('./javaconv');
const fs = require('fs');
const path = require('path');
const appRoot = path.dirname(require.main.filename);
const fileDir = appRoot + '/public/loads/mdb.json';
const findInMdbJson = require('../services/findFileExtention');



const convertDocument = (fileInfo) => {
  let to;
  let file = appRoot +"/"+fileInfo.src;
  console.log('BEFOR CONVERT\n',file);
  let converter = appRoot+'/app/convertor/convert-0.0.1-SNAPSHOT.jar';
  let output;

  if (fileInfo.extention === 'html') {

    /**
     * Promise
     */
    let ext = findInMdbJson(fileInfo.name);
    ext = ext().then((data) => {
      to = data;
      output = appRoot + "/public/loads/" + fileInfo.name + '.' + to;
      console.log('PROMISE ',data);
      return javaconv(converter,to,file,output);
    }).then()
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