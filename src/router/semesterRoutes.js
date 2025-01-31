const express = require("express");
const { getSemesterByNim } = require("../controller/semesterController");

const router = express.Router();

router.get("/semester/:nim", getSemesterByNim); // Endpoint untuk mengambil semester berdasarkan NIM

module.exports = router;
