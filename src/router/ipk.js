const { findAll, findAllByIpk, findIpsAndSemester } = require("../controller/IpkController");

const router = require("express").Router();

router.get("/", findAll); // Route untuk ambil semua data
router.post("/dataipk", findAllByIpk); // Route untuk ambil data berdasarkan NIM
router.post("/ips-semester", findIpsAndSemester); // Route untuk ambil data IPS dan Semester berdasarkan NIM

module.exports = router;
