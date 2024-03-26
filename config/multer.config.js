const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/../uploads`);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${path.extname(file.originalname)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

// if you wish to filter the file we could use
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//   // The function should call `cb` with a boolean
//   // to indicate if the file should be accepted
//   // To reject this file pass `false`, like so:
//     cb(null, false);

//     // To accept the file pass `true`, like so:
//     cb(null, true);

//     // You can always pass an error if something goes wrong:
//     cb(new Error('I don\'t have a clue!'));
//   },
// });

const upload = multer({ storage });

module.exports = upload;
