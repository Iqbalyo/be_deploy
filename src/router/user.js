const { findAll, login, findByNim, getPaymentStatus } = require("../controller/userController");

const router = require("express").Router()

router.get("/", findAll)
router.post("/login", login)
router.get("/:nim", findByNim); 

// **Rute baru untuk mendapatkan status pembayaran berdasarkan NIM**
router.get("/:nim/payment-status", getPaymentStatus);
module.exports = router;