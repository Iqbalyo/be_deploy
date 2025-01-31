const { absen_mahasiswas } = require("../models");

const AbsensiSemesterController = {
    async getAbsensiSemesterTerakhir(req, res) {
      try {
        const { nim } = req.params;
  
        // Cari semester terakhir berdasarkan NIM
        const semesterTerakhir = await absen_mahasiswas.findOne({
          where: { nim },
          attributes: ["semester"],
          order: [["semester", "DESC"]],
          limit: 1,
        });
  
        if (!semesterTerakhir) {
          return res.status(404).json({ message: "Data semester terakhir tidak ditemukan" });
        }
  
        // Ambil data absensi berdasarkan semester terakhir
        const absensi = await absen_mahasiswas.findAll({
          where: {
            nim,
            semester: semesterTerakhir.semester,
          },
          attributes: [
            "matakuliah_nama",
            "hadir",
            "izin",
            "tanpaKeterangan",
            "semester",
            "periode",
          ],
        });
  
        res.status(200).json(absensi);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
      }
    },
  };
  

module.exports = AbsensiSemesterController;
