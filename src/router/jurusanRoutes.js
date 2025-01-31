const express = require('express');
const router = express.Router();
const { getJurusan } = require('../controller/jurusanController');

// Definisikan rute untuk /jurusan
router.get('/', getJurusan);

module.exports = router;
