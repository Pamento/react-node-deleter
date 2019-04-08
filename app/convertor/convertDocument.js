/**
 * @function convertDocument is the middleware between router.post and javanov.js
 * @function extention & @function askedFormatFile is for future reconvertion from html back to original type file
 */
const javaconv = require('./javaconv');
const path = require('path');
const appRoot = path.dirname(require.main.filename);
const findInMdbJson = require('../services/findFileExtention');


const convertDocument = async (fileInfo) => {
  let to;
  let file = appRoot + "/" + fileInfo.src;
  let converter = appRoot + '/app/convertor/convert-0.0.1-SNAPSHOT.jar';
  let output;

  if (fileInfo.extention === 'html') {
    let ext = findInMdbJson(fileInfo.originName);
    to = await ext().finally();
    console.log('File will by converted to : "' + to + '" format.');
    output = appRoot + "/public/loads/" + fileInfo.originName + '.' + to;
    return await javaconv(converter, to, file, output);
  } else {
    to = 'html';
    output = appRoot + "/public/loads/" + fileInfo.name + '.' + to;
    return await javaconv(converter, to, file, output);
  }
}

module.exports = convertDocument;