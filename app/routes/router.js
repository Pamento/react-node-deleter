/**
 * @function del delete uploaded files from user interface in the moment of restarting express(node.js) application
 * @function multer.diskStorage uploads file selected by user and stored them in /public/loads folder
 * @function router.post get the info about file and by ..(@function convertDocument)
 * @function convertDocument .. convert the file between : odt, doc, docx <=> html, and resend it to the user interface
 * @param upload.single('myFile') the 'myFile' is the name of input field from form file upload
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const saveFilesInfos = require('../services/saveStatConvertedFile');
const convertDocument = require('../convertor/convertDocument');
const extentionFinder = require("../services/extentionFinder");
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

var newNameForUpComingFile = '';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/loads')
  },
  // filename: function (req,file,cb) {
  //   cb(null,file.originalname)
  // }
  filename: function (req, file, cb) {
    let customFileName = crypto.randomBytes(8).toString('hex') + "-" + Date.now();
    newNameForUpComingFile = customFileName;
    cb(null, customFileName + '.' + extentionFinder(file.originalname));
  }
});
var upload = multer({ storage: storage });

router.post('/files', upload.single('converted'), (req, res) => {
  console.log('.');
  console.log('.');
  console.log('.');
  console.log('body styles ',req.body.styles);
  console.log('.');
  console.log('|');
  console.log('|');
  console.log(' /');
  console.log("'");

  let name = req.file.originalname.substring(0, req.file.originalname.lastIndexOf('.')),
      newFileName = newNameForUpComingFile,
      extention = req.file.originalname.substring(req.file.originalname.lastIndexOf('.') + 1, req.file.originalname.length),
      stylesCss = '{}',
      fileInfo;

  function styleOfFile() {
    if(req.body.styles !== undefined || 'undefined' ) {
      stylesCss = req.body.styles;
      console.log('\n');
      console.log('Catch style');
      console.log('\n');
    } else {
      stylesCss = '{}';
    }
  }
  function saveFaileStat() {
    fileInfo = {
      src: req.file.path,
      originFileName: req.file.originalname,
      originName: name,
      name: newFileName,
      extention: extention,
      style: stylesCss // style = {};
    }
    saveFilesInfos(fileInfo);
  }

  if (extention === 'html') {
    styleOfFile();
    saveFaileStat();
  } else {
    saveFaileStat();
  }

  convertDocument(fileInfo).then(value => {
console.log('---------------------------------------------------- router Value #########');
console.log('router value :\n',typeof value);
console.log('---------------------------------------------------- router Value #########');
    let doc = value();
    doc.then(contentHtml => {
      console.log("node sending data :", typeof contentHtml);
      console.log('#################################################### router contentHtml #########');
console.log('router value :\n',typeof contentHtml);
console.log('#################################################### router contentHtml #########');
      res.status(200).send(contentHtml);
    }).catch(err => {
      res.status(500).send('Please try another time.');
      console.error('Error on server for send response', err);
    });
  }).catch(err => {
    res.status(500).send('Please try another time.');
    console.error('Error on server for send response', err);
  });
});

module.exports = router;
