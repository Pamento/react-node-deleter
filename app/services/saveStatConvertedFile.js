'use strict';

var fs = require('fs');
var path = require('path');
var appRoot = path.dirname(require.main.filename);
var fileDir = appRoot + '/public/loads/mdb.json';

/**
 * @function newFileInfo first read file json from mdb.json, if this file not exist is created here
 * for save the stat about converted file. If mdb.json exist, a new stat file is added if he is not already in
 * @param {*} iFile new stat abaout converted file
 * @var jsonFile it takes the data type string form mdb.json file, elaborate them on the type array and finly saved them as string.
 */
function newFileInfo(iFile) {

  fs.readFile(fileDir, { flag: 'a+' }, (err, content) => {
    if (err) throw err;

    let fexist = [],extExist= [],newObjFile,newObjExt,l;
    let jsonFile = content.toString();
    if ((jsonFile === '') || (typeof jsonFile === 'undefined')) {
      jsonFile = [];
      l = jsonFile.length;
    } else {
      let parseJson = JSON.parse(jsonFile);
      jsonFile = parseJson;
      l = jsonFile.length;
      for (const key of jsonFile) {
        console.log('............................check if name exist key variable: ',typeof key);
        console.log('............................check if name exist key variable: ',key);
        let oldKey = Object.keys(key);
        console.log('............................check if name exist key[oldKey].originName: ',key[oldKey].originName); // docx_Test
        console.log('............................check if name exist key[Object.keys(key)].originName: ',key[Object.keys(key)].originName); // docx_Test
        console.log('............................check if name exist key[Object.keys(key)].extention: ',key[Object.keys(key)].extention); // docx
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log('............................check if name exist key Object.keys(iFile): ',Object.keys(iFile)); // ['new name']
        console.log('............................check if name exist key iFile[Object.keys(iFile)].originName: ',iFile[Object.keys(iFile)].originName); // docx_Test
        console.log('............................check if name exist key iFile[Object.keys(iFile)].extention: ',iFile[Object.keys(iFile)].extention); // docx
        // oldKey[0] = key[Object.keys(key)].originName
        fexist.push(key[Object.keys(key)].originName);
        extExist.push(key[Object.keys(key)].extention);
      }
      console.log('fexist :\n',fexist);
      console.log('extExist :\n',extExist);
      newObjFile = iFile[Object.keys(iFile)].originName;
      newObjExt = iFile[Object.keys(iFile)].extention;
      console.log('newObjectFile :\n',newObjFile);
      console.log('newObjExt :\n',newObjExt);
    }
    if (l > 0) {
      if ((fexist.indexOf(newObjFile) >= 0) && (extExist.indexOf(newObjExt) >= 0)) {
        console.log("The stat file is already saved");
      } else {
        jsonFile.push(iFile);
      }
    } else {
      jsonFile.push(iFile);
    }

    fs.writeFile(fileDir, JSON.stringify(jsonFile, null, 2), (err) => {
      if (err) throw err;
      console.log('json file saved');
    });
  });
}



let memoJson = (iFile) => {
  let fileInfoToSave;
  if (iFile) {
    let jsonContent = JSON.stringify(iFile, null, 2);
    fileInfoToSave = JSON.parse(`{"${iFile.name}":${jsonContent}}`);
  }

    newFileInfo(fileInfoToSave);
}


module.exports = memoJson;