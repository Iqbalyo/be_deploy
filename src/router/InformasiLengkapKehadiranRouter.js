
const express = require("express");
const router = express.Router();
const { getInformasiKehadiran } = require("../controller/InformasiLengkapKehadiran");

// Endpoint untuk mendapatkan informasi lengkap kehadiran berdasarkan nama mata kuliah
router.get("/:matakuliah_nama", getInformasiKehadiran);

module.exports = router;