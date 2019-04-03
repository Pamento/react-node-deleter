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

      let fexist = [],file,
      jsonFile = content.toString();

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
      console.log('convertDocument > promise > find > extention : _____________',to);
      console.log('\n\n');
    });
    return to;
  });
  return find;
}
module.exports = findInMdbJson;