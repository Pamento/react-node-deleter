const express = require('express');
const router = express.Router();
const multer = require('multer');
let javaConv = require('../services/javaconv');
let convertDocument = require('../services/callJavaconv');
let extentionFinder = require("../services/extentionFinder")
const path = require('path');

const fs = require('fs');
const crypto = require('crypto');

// var http = require('http');
// var fs = require('fs');
/**
 *     destination: function (req, file, cb) {
      cb(null, '/app/public/uploads')
    },
 *     filename: function(req, file, cb) {
      cb(null, file.fieldname + path.extname(file.originalname));
    },
    or:
        filename: function (req, file, cb) {
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      cb(null, Date.now() + ext)
    }
 */
const del = require('del');

(async () => {
  try {
    const deletedPaths = await del(['public/loads/**', '!public/loads']);
    console.log('Deleted files and folders:\n', deletedPaths.join('\n'));
  } catch (error) {
    console.error('delete file program has crached :',error);
  }
})();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/loads')
  },
  filename: function (req, file, cb) {
    //console.log(file.mimetype);
    let customFileName = crypto.randomBytes(8).toString('hex')
    cb(null, customFileName +"-"+ Date.now()+ '.' + extentionFinder(file.originalname))
  }
});
var upload = multer({ storage: storage });


// upload.single('myFile') is the name of input field from form file upload
router.post('/files', upload.single('converted'), (req, res) => {
  const rootDir = path.dirname(require.main.filename);
  let name = req.file.originalname.substring(0, req.file.originalname.lastIndexOf('.')),
    fileName = req.file.filename,
    output = rootDir +"/public/loads/" + fileName + '.html',
    extention = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'), req.file.originalname.length),
    fileInfo = {
      src: req.file.path,
      originName: req.file.originalname,
      name: name,
      extention: extention,
      fileName: fileName.toString(),
      output: output
    }
  // console.log(req.file);
  //   console.log(fileInfo);
    
  // console.log("inside route", fileInfo.output);
  let doc2 = convertDocument(fileInfo);
  doc2().then(contentHtml =>{
    //  console.log("after convert");
    console.log("log content",contentHtml);
    res.status(200).send(contentHtml);

  })
  //
  // if (fileToBack != null || undefined ) {

  // }
  // else {
  //   res.status(200).send('File convertion failed.');
  // }
});
module.exports = router;
