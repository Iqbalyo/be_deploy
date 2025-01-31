const express = require('express'); 
// const { GetScheduleByNim } = require('../controller/jadwalKuliahController') ini yg awalnya
const { getJadwalKuliah } = require('../controller/jadwalbelajar')
const router = express.Router();

router.get('/:nim', getJadwalKuliah);

module.exports = router;