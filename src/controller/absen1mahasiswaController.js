const { absen_mahasiswas, AktivitasKuliah, sequelize } = require("../models");

const findAllabsen = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('NIM:', id);

    const aktivitasTerakhir = await AktivitasKuliah.findOne({
      where: { nim: id },
      order: [['semester_ke', 'DESC']]
    });
    console.log('Aktivitas Terakhir:', aktivitasTerakhir);

    if (!aktivitasTerakhir) {
      return res.status(404).json({ message: "Data aktivitas tidak ditemukan" });
    }

    const semesterTerakhir = aktivitasTerakhir.semester_ke;

    // Query data absensi berdasarkan semester terakhir
    const data = await absen_mahasiswas.findAll({
      attributes: [
        "matakuliah_nama",
        "semester",
        "periode",
        [sequelize.fn("MAX", sequelize.col("pertemuan_ke")), "pertemuan_terakhir"],
        [sequelize.fn("SUM", sequelize.literal(`CASE WHEN status = 'H' THEN 1 ELSE 0 END`)), "hadir"],
        [sequelize.fn("SUM", sequelize.literal(`CASE WHEN status = 'I' THEN 1 ELSE 0 END`)), "izin"],
        [sequelize.fn("SUM", sequelize.literal(`CASE WHEN COALESCE(status, 'A') = 'A' THEN 1 ELSE 0 END`)), "tanpaKeterangan"]
      ],
      where: {
        nim: id,
        semester: aktivitasTerakhir.semester,
        periode: aktivitasTerakhir.periode
      },
      group: ["matakuliah_nama", "semester", "periode"],
      raw: true
    });

    console.log('Data Absensi:', data);

    // **Hapus tanpaKeterangan jika bernilai 0**
    const filteredData = data.map(item => {
      if (item.tanpaKeterangan === 0) {
        delete item.tanpaKeterangan;
      }
      return item;
    });

    res.json({
      semester: aktivitasTerakhir.semester,
      periode: aktivitasTerakhir.periode,
      semesterTerakhir,
      data: filteredData
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = { findAllabsen };
