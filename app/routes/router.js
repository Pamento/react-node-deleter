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








// router.post('/files', (req,res)=>{

//   console.log('First Route /files : hole request upcoming ::_:\n',req.body);

// })

router.post('/files', upload.single('converted'), (req, res) => {
  console.log('body \n',req);
let bu = JSON.parse(req.body.styles);
console.log(typeof bu);
console.log(bu.color);
console.log(bu.fontSize);

  // console.log(JSON.parse(req.body.styles.style));
  let name = req.file.originalname.substring(0, req.file.originalname.lastIndexOf('.')),
    newFileName = newNameForUpComingFile,
    output = appRoot + "/public/loads/",
    extention = req.file.originalname.substring(req.file.originalname.lastIndexOf('.') + 1, req.file.originalname.length),
    fileInfo = {
      src: req.file.path,
      originFileName: req.file.originalname,
      originName: name,
      name: newFileName,
      extention: extention,
      output: output
    }

  if (fileInfo.extention === 'html') {
    console.log('_');
  } else {
    saveFilesInfos(fileInfo);
  }

  convertDocument(fileInfo).then(value => {

    let doc = value();
    doc.then(contentHtml => {
      console.log("node sending data :", typeof contentHtml);
      res.status(200).send(contentHtml);
    }).catch(err => {
      res.status(500).send('Please try another time.');
      console.error('Error on server', err);
    });
  }).catch(err => {
    res.status(500).send('Please try another time.');
    console.error('Error on server', err);
  });
});

module.exports = router;
