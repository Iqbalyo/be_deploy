const { findAllabsen } = require("../controller/absen1mahasiswaController");

const router = require("express").Router()


router.get("/:id", findAllabsen)

module.exports = router;
