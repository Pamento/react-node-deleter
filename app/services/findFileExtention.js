const fs = require('fs');
const path = require('path');
const appRoot = path.dirname(require.main.filename);
const fileDir = appRoot + '/public/loads/mdb.json';
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile)
// fn() must find file form mdb.json and give me back the extention - indicator of type of file to convert
// if the file not exist ?
const findInMdbJson = (fileToFind) => {

  let find = () => new Promise((resolve, reject) => {
    let to = '';

    readFileAsync(fileDir, (err, content) => {
      if (err) reject(err);



      console.log('convertDocument > promise > find > extention : _____________', to);
      console.log('\n\n');
    }).then(content => {
      console.log("value promisify", content);
      console.log(to);
      let fexist = [], file,
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
        console.log('keys list:\n', fexist);
        file = jsonFile[fexist.indexOf(fileToFind)]
        to = file[fileToFind].extention;
      }
      resolve(to);
    });

  });
  return find;
}
module.exports = findInMdbJson;