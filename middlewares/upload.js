const multer = require('multer');
const path = require('path');
const uploadPath = path.join(process.cwd(), 'tmp');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    //console.log(file);
    //cb(null, file.fieldname + '-' + uniqueSuffix);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
