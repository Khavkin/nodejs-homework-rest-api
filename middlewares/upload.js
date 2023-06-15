const multer = require('multer');
const path = require('path');

const uploadPath = path.join(process.cwd(), 'tmp');

const ext = name => {
  return name.match(/\.([^.]+)$/)?.[1];
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const { _id } = req.user;
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExt = ext(file.originalname);
    const fileName = _id + '.' + fileExt;
    console.log(fileName);
    //cb(null, file.fieldname + '-' + uniqueSuffix);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
