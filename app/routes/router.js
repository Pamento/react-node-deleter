/**
 * @function del delete uploaded files from user interface in the moment of restarting express(node.js) application
 * @function multer.diskStorage uploads file selected by user and stored them in /public/loads folder
 * @function router.post get the info about file and by ..(@function convertDocument)
 * @function convertDocument .. convert the file in html and resend it to the user interface
 * @param upload.single('myFile') the 'myFile' is the name of input field from form file upload
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const saveFilesInfos = require('../services/saveStatConvertedFile');
let convertDocument = require('../convertor/convertDocument');
// let extentionFinder = require("../services/extentionFinder");
const path = require('path');
const appRoot = path.dirname(require.main.filename);
const crypto = require('crypto');
const del = require('del');

(async () => {
  try {
    const deletedPaths = await del(['public/loads/**', '!public/loads']);
    console.log('Deleted files and folders:\n', deletedPaths.join('\n'));
  } catch (error) {
    console.error('delete file program has crached :', error);
  }
})();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/loads')
  },
  filename: function (req,file,cb) {
    cb(null,file.originalname)
  }
  // filename: function (req, file, cb) {
  //   //console.log(file.mimetype);
  //   let customFileName = crypto.randomBytes(8).toString('hex')
  //   cb(null, customFileName + "-" + Date.now() + '.' + extentionFinder(file.originalname))
  // }
});
var upload = multer({ storage: storage });

router.post('/files', upload.single('converted'), (req, res) => {
  let name = req.file.originalname.substring(0, req.file.originalname.lastIndexOf('.')),
    fileName = req.file.filename,
    newFileName = crypto.randomBytes(8).toString('hex') + "-" + Date.now(),
    output = appRoot + "/public/loads/",
    // output = appRoot + "/public/loads/" + name + '.html',
    extention = req.file.originalname.substring(req.file.originalname.lastIndexOf('.')+1, req.file.originalname.length),
    fileInfo = {
      src: req.file.path,
      originName: req.file.originalname,
      name: name,
      extention: extention,
      newFileName: newFileName,
      output: output
    }

    /////////////////////////////////////////////////////////////::: test for multiples files
    // const nest = 3;
    // for (let index = 0; index < nest; index++) {

    //   let adss = { name: `${fileInfo.name + index}`};
    //   var copie = Object.assign(fileInfo, adss);
    //   console.log('router info file send');
    //   saveFilesInfos(copie);
    // }
    if(fileInfo.extention === 'html'){
      console.log('_');
    } else {
      saveFilesInfos(fileInfo);
    }



  const doc2 = convertDocument(fileInfo);
  doc2().then(contentHtml => {
    console.log("node sending data :", typeof contentHtml);
    res.status(200).send(contentHtml);
console.log('AFTER SEND');
  }).catch((err)=> {throw err});
});

module.exports = router;
