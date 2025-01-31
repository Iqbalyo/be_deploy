const express = require("express");
const router = express.Router();
const AbsensiSemesterController = require("../controller/AbsensiController");

// Route untuk absensi semester terakhir
router.get("/semester-terakhir/:nim", AbsensiSemesterController.getAbsensiSemesterTerakhir);

module.exports = router;
