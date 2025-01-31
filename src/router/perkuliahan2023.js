// routes/perkuliahan2023.js
const express = require("express");
const router = express.Router();

const { getJadwalPerkuliahan2023 } = require('../controller/JadwalPerkuliahan2023');

// Endpoint untuk mendapatkan jadwal perkuliahan berdasarkan nim
router.get('/:nim', getJadwalPerkuliahan2023 );

module.exports = router;
