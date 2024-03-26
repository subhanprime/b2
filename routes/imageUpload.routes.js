const express = require('express');
const upload = require('../config/multer.config');
const { uploadSingle } = require('../controllers/file.controller');

const router = express.Router();

router.post('/uploadImage', upload.single('image'), uploadSingle);

module.exports = router;
