const express = require('express');
const router = express.Router();
const multer = require('multer');
let convertDocument = require('../services/callJavaconv');
const path = require('path');
const root = path.dirname(require.main.filename);
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
  destination: './public/loads',
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });


// upload.single('myFile') is the name of input field from form file upload
router.post('/files', upload.single('converted'), (req, res) => {
    let name = req.file.originalname.substring(0, req.file.originalname.lastIndexOf('.')),
    extention = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'), req.file.originalname.length),
    fileInfo = {
      src: req.file.path,
      originName: req.file.originalname,
      name: name,
      extention: extention
    }

    let docConvertedToBack = convertDocument(fileInfo);
    docConvertedToBack().then(()=>{
      console.log('file send');
      res.status(200).sendFile(root + '/public/loads/docx.html');
    }).catch( (e) => {
    console.error("route FAIL :\n",e.Error,'\n');
    res.status(400).send('developer is drunck');
  })
});

module.exports = router;
