// router/absensi1mahasiswa.js
const { findAllabsen } = require("../controller/absen1mahasiswaController");

const router = require("express").Router();

// Route untuk mengambil data absensi berdasarkan NIM
router.get("/:id", findAllabsen); // Gantilah :id menjadi :nim jika ingin lebih jelas

module.exports = router;
