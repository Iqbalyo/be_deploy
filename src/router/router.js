const router = require("express").Router()

const user = require("./user")
const absen = require("./absensi1mahasiswa")
const ipk = require("./ipk")
const jurusan = require("./jurusanRoutes")
const semester = require("./semesterRoutes")
const mahasiswa = require("./mahasiswaRouter")
// const schedule = require("./jadwalKuliahRouter")
const detailKehadiran = require("./detailKehadiranRouter"); // Import rute baru
// const schedules = require("./jadwalbelajarRouter"); // Import router jadwal kuliah
const jadwalKuliah = require("./JadwalKuliahUnamaRouter");
const jadwalKuliahHariIni = require("./jadwalKuliahHariIniRouter");
const informasiKehadiran = require("./InformasiLengkapKehadiranRouter"); // Import router baru //todo1
const JadwalPerkuliahan2023 = require("./perkuliahan2023")



router.use("/monitoring/unama/v1/informasi-kehadiran", informasiKehadiran); // Gunakan router baru//todo1
router.use("/monitoring/unama/v1/jadwalHariIni", jadwalKuliahHariIni);
router.use("/monitoring/unama/v1/jadwalKuliah", jadwalKuliah);
router.use("/monitoring/unama/v1/jadwalkuliahunama", JadwalPerkuliahan2023);
router.use("/monitoring/unama/v1/user", user)
router.use("/monitoring/unama/v1/absensi", absen)
router.use("/monitoring/unama/v1/ipk", ipk)
router.use("/monitoring/unama/v1/jurusan", jurusan)
router.use("/monitoring/unama/v1/aktivitas_kuliahs", semester)
router.use("/monitoring/unama/v1/mahasiswa", mahasiswa)
// router.use("/monitoring/unama/v1/jadwal", schedule)
// router.use("/monitoring/unama/v1/jadwalbelajar", schedules); // Gunakan router jadwal kuliah
router.use("/monitoring/unama/v1/detailkehadiran", detailKehadiran); // Gunakan rute baru


//todo jika,di router sudah bikin urlny,parameternya cuman boleh 1




module.exports = router;