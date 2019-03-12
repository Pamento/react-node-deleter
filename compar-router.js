"use strict"
const express = require('express');
const pandoc = require('simple-pandoc');
const crypto = require('crypto');
var XMLHttpRequest = require('xhr2');
var router = express.Router();
const fs = require('fs');
var multer = require('multer')
var extentionFinder = require('./functions/extentionFinder')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    //console.log(file.mimetype);
    let customFileName = crypto.randomBytes(18).toString('hex')
    cb(null, customFileName +"-"+ Date.now()+ '.' + extentionFinder(file.originalname))
  }
})

var upload = multer({ storage: storage })
//var upload = multer({ dest: './uploads/' })
router.post('/convert',upload.single("uploadedFileAidodys"),(req, res) => {
  console.log(req.file);
  let extention = extentionFinder(req.file.originalname);
  var convert;
  let nonConvertable = false;
  switch (extention) {
    case "tex":
    convert = pandoc("latex", 'html5', ["--self-contained"]);
    console.log("latex");
      break;
    case "xml":
      //console.log(req.file);
    let text= fs.readFileSync(req.file.destination +req.file.filename,'utf8',function (err,data) {
       console.log(data);
     })
     nonConvertable = true;
      res.send(text);
    break;
    default:
      convert = pandoc(extention, 'html5', ["--self-contained"]);
      break;
  }
  if (nonConvertable ===false) {
    convert(fs.readFileSync(req.file.destination +req.file.filename))
    .then(content => { 
      res.setHeader('content-type', 'text/html');
      res.send(content.toString());
    });
  }
 

});



module.exports = router;
