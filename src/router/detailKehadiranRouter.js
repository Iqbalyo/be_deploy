// routes/detailKehadiranRouter.js
const express = require("express");
const router = express.Router();
const { findDetailKehadiran } = require("../controller/detailKehadiranController");

// Rute untuk mendapatkan detail kehadiran berdasarkan nim dan matakuliah
router.get("/:nim", findDetailKehadiran);

module.exports = router;
