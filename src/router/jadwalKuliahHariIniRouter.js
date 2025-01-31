const express = require("express");
const router = express.Router();
const JadwalKuliahController = require("../controller/JadwalKuliahHariIniController");

// Route untuk mendapatkan jadwal hari ini berdasarkan NIM
router.get("/:nim", JadwalKuliahController.getJadwalHariIni);

module.exports = router;
