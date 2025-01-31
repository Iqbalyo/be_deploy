const express = require("express");
const router = express.Router();

const { getJadwalKuliah } = require('../controller/JadwalKuliahUnama');

router.get('/:nim', getJadwalKuliah);

module.exports = router;
