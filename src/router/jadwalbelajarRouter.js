const express = require("express");
const router = express.Router();
const { getJadwalKuliah } = require("../controller/jadwalbelajar");

// Endpoint untuk mendapatkan jadwal kuliah berdasarkan NIM
router.get("/:nim", getJadwalKuliah);

module.exports = router;