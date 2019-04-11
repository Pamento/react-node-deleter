const fs = require('fs');
const path = require('path');
const appRoot = path.dirname(require.main.filename);
const fileDir = appRoot + '/public/loads/mdb.json';
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

const findInMdbJson = (fileToFind) => {
console.log('________________________ IN ___________________________ find');
  let find = () => new Promise((resolve, reject) => {
    let to = '';
    console.log('______________________ DEEP _____________________________ find');

    readFileAsync(fileDir,(err, content) => {
      if (err) reject(err);
    })
      .then(content => {
        console.log('______________________ DEEP content _____________________________ find\n',typeof content);
        let fexist = [], file,
          jsonFile = content.toString();
          console.log('______________________ DEEP then promise _____________________________ find',jsonFile);

        if ((jsonFile === '') || (typeof jsonFile === 'undefined')) {
          to = 'html';
          console.log('in find file extention : html :: __ :: __ :: __ :: __ :: __ :',to);
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
            console.log('find ext : doc ? :: __ :: __ :: __ :: __ :: __ :',to);
          }

        }
        resolve(to);
        console.log('find ext : extention :: __ :: __ :: __ :: __ :: __ :',to);
      })
      .catch(err => {
        console.error('Error in findFileExtention on readFileAsync()\n', err);
      });
  });
  return find;
}
module.exports = findInMdbJson;