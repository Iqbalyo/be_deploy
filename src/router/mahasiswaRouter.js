const express = require('express');
const { getMahasiswaPembayaranPerSemester } = require('../controller/mahasiswaController');
const router = express.Router();

router.get('/pembayaran', getMahasiswaPembayaranPerSemester);

module.exports = router;
