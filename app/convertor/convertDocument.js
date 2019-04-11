/**
 * @function convertDocument is the middleware between router.post and javanov.js
 * @function extention & @function askedFormatFile is for future reconvertion from html back to original type file
 */
const memoize = require('../services/memoize');
const javaconv = require('./javaconv');
const path = require('path');
const appRoot = path.dirname(require.main.filename);
const findInMdbJson = require('../services/findFileExtention');


const convertDocument = async (fileInfo) => {
  let to;
  let file = appRoot + "/" + fileInfo.src;
  let converter = appRoot + '/app/convertor/convert-0.0.1-SNAPSHOT.jar';
  let output;
  let style = fileInfo.style;

  if (fileInfo.extention === 'html') {
    let ext = findInMdbJson(fileInfo.originName);
    to = await ext().finally();
    console.log('File will by converted to : "' + to + '" format.');
    output = appRoot + "/public/loads/" + fileInfo.name + '.' + to;
    let converting = memoize(async () => {return javaconv(converter, to, file, output, style)});
    return await converting();
    // return convertDon;
  } else {
    to = 'html';
    output = appRoot + "/public/loads/" + fileInfo.name + '.' + to;
    let converting = memoize(async () => {return javaconv(converter, to, file, output)});
    return await converting();
    // return convertDon;
  }
}

module.exports = convertDocument;