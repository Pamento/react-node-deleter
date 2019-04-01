'use strict';

const fs = require('fs');
var path = require('path');
var appRoot = path.dirname(require.main.filename);
var fileDir = appRoot + '/public/loads/mdb.json';



var jsonFileExist = () => {
  fs.open(fileDir, 'r', (err,fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('__JSON--<NOT-EXIST\n');
        return true;
      }
      throw err;
    }
    console.log('__JSON--EXIST',fd)
  });
}

var newFileINFO = (iFile) => {
  let fileInfoToSave;

  if (iFile) {
    let jsonContent = JSON.stringify(iFile, null, 2); // ############# string #################
    fileInfoToSave = JSON.parse(`{"${iFile.name}":${jsonContent}}`); // ############# object #################
  } else { return }

  return fileInfoToSave; // ############# object #################
}

var memoJson = (iFile) => {
  let mdbFiles,
    addiFile = newFileINFO(iFile), // ############# object #################
    ms = 'Kiszka';

  let reader = fs.createReadStream(fileDir, { flag: 'w' });
  reader.on('error', (err) => {
    console.error('Error ! :: ', err)
  })
  reader.on('data', chunk => {
    mdbFiles += chunk; // ############# buffer #################
    console.log('{{ chunk',chunk,' }}');
  });
  reader.on('end', () => {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if ((mdbFiles === undefined) || (typeof mdbFiles === undefined || 'undefined')) {
      console.log('json file is UNDEFINED');
      mdbFiles = JSON.stringify(addiFile); // ############# string #################
    } else {
      console.log('json file is BUFFER');
      let str = mdbFiles.toString(); // ############# string #################
      let objt = JSON.parse(str); // ############# object #################
      let fusion = { ...objt, ...addiFile }; // ############# object #################
      mdbFiles = JSON.stringify(fusion); // ############# string #################
    }
    // if ((mdbFiles === '' || undefined) || (typeof mdbFiles === 'string' || undefined || 'undefined')) { addDatas(); }
    console.log('var content __:', mdbFiles);


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    let writer = fs.createWriteStream(fileDir, { flag: 'w', encoding: 'utf8', autoClose: true }, (err) => {
      if (err) throw err;
    });
    writer.on('error', (err) => {
      if (err) throw err;
    });
    writer.on('end', () => {
      ms = 'pelna jazda !';
      console.log('The json was writen succesfuly.');
    });
    // writer._write( new Buffer(mdbFiles, 'utf8'), (err) => {
    //   if (err) throw err;
    // });
    writer.write(mdbFiles,(err)=>{
      if(err) throw err;
    });


    writer.end();
  });

  return ms;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var saveConvertedFileName = async (iFile) => {
  let test = await jsonFileExist();
  if (test) {
    console.log('__open ?__________\n');
    fs.writeFile(fileDir, { flag: 'a' }, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
      memoJson(iFile);
    });
  } else {
    console.log('\nelse\n');
    console.log()
    memoJson(iFile);
  }

}

module.exports = saveConvertedFileName;

/**
 * snipets
 * https://stackoverflow.com/questions/37833835/how-to-create-a-readstream-with-a-buffer-using-nodejs#37834416
 *
var stream = require('stream');
var bufferStream = new stream.PassThrough();
bufferStream.end(new Buffer(myJSON));
bufferStream.pipe(table.createWriteStream(metadata))
                   .on('complete', function(job) {
                     job
                       .on('error', console.log)
                       .on('complete', function(metadata) {
                         console.log('job completed', metadata);
                       });
                   });
 */
