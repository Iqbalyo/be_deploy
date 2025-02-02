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
        [sequelize.fn("COUNT", sequelize.col("pertemuan_ke")), "total_pertemuan"], // Hitung jumlah total pertemuan (termasuk null)
        [sequelize.fn("SUM", sequelize.literal(`CASE WHEN buka_at IS NULL THEN 1 ELSE 0 END`)), "null_buka_at"], // Hitung jumlah buka_at yang NULL
        [
          sequelize.literal(
            "COUNT(pertemuan_ke) - SUM(CASE WHEN buka_at IS NULL THEN 1 ELSE 0 END)"
          ),
          "pertemuan_terakhir"
        ], // Kurangi total pertemuan dengan jumlah null pada buka_at
        [sequelize.fn("SUM", sequelize.literal(`CASE WHEN status = 'H' THEN 1 ELSE 0 END`)), "hadir"],
        [sequelize.fn("SUM", sequelize.literal(`CASE WHEN status = 'I' THEN 1 ELSE 0 END`)), "izin"],
        [sequelize.fn("SUM", sequelize.literal(`CASE WHEN status = 'A' THEN 1 ELSE 0 END`)), "tanpaKeterangan"],
      ],
      where: {
        nim: id,
        semester: aktivitasTerakhir.semester,
        periode: aktivitasTerakhir.periode
      },
      group: ["matakuliah_nama", "semester", "periode"]
    });

    console.log('Data Absensi:', data);

    res.json({
      semester: aktivitasTerakhir.semester,
      periode: aktivitasTerakhir.periode,
      semesterTerakhir,
      data
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = { findAllabsen };
