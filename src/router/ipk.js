const { findAll } = require("../controller/IpkController");

const router = require("express").Router();

router.get("/", findAll); // Route untuk ambil semua data

module.exports = router;
