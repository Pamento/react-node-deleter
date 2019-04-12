const fs = require('fs');
const path = require('path');
const appRoot = path.dirname(require.main.filename);
const fileDir = appRoot + '/public/loads/mdb.json';
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

const findInMdbJson = (fileToFind) => {
  let find = () => new Promise((resolve, reject) => {
    let to = '';

    readFileAsync(fileDir,(err, content) => {
      if (err) reject(err);
    })
      .then(content => {
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
          file = jsonFile[fexist.indexOf(fileToFind)];

          if ( typeof file == 'undefined' || undefined ) {
            console.log('==================================================================');
            console.log('extention not find');
            console.log('==================================================================');
            to = 'html'
          } else {
            to = file[fileToFind].extention;
          }

        }
        resolve(to);
      })
      .catch(err => {
        console.error('Error in findFileExtention on readFileAsync()\n', err);
      });
  });
  return find;
}
module.exports = findInMdbJson;