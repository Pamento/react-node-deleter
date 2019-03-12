const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
let convertDocument = require('../services/callJavaconv');
const path = require('path');
const root = path.dirname(require.main.filename);

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

  var storage = multer.diskStorage({
    destination: './public/loads',
    filename: function (req,file,cb) {
      cb(null,file.originalname)
    }
  });
  var upload = multer({storage: storage});


  // upload.single('myFile') is the name of input field from form file upload
  router.post('/files', upload.single('converted'),  (req, res) => {
    let name = req.file.originalname.substring(0, req.file.originalname.lastIndexOf('.')),
    extention = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'), req.file.originalname.length),
    fileInfo = {
      src: req.file.path,
      originName: req.file.originalname,
      name: name,
      extention: extention
    }
    let fileToBack;


    async function main() {
      try {
        fileToBack = await convertDocument(fileInfo);
        console.log("OK");
      } catch (e) {
        console.error("FAIL");
      }
    }
    console.log('check file before SEND <|> <|> <|> <|> <|> <|> <|> <|> <|> <|>:\n',fileToBack);
    main().then(
      res.status(200).sendFile(root+'/public/loads/docx.html')
    );




    // if (fileToBack != null || undefined ) {
    //   res.status(200).sendFile(fileToBack);
    // }
    // else {
    //   res.status(200).send('File convertion failed.');
    // }
  });
module.exports = router;