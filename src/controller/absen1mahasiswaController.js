const { absen_mahasiswas, absen_pertemuans, AktivitasKuliah, sequelize } = require("../models");

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

    // Query data absensi berdasarkan semester terakhir dengan JOIN ke tabel absen_pertemuans
    const data = await absen_mahasiswas.findAll({
      attributes: [
        "matakuliah_nama",
        "semester",
        "periode",
        [sequelize.fn("MAX", sequelize.col("absen_mahasiswas.pertemuan_ke")), "pertemuan_terakhir"], // Ambil pertemuan terakhir
        [sequelize.fn("SUM", sequelize.literal(`CASE WHEN absen_mahasiswas.status = 'H' THEN 1 ELSE 0 END`)), "hadir"],
        [sequelize.fn("SUM", sequelize.literal(`CASE WHEN absen_mahasiswas.status = 'I' THEN 1 ELSE 0 END`)), "izin"],
        [sequelize.fn("SUM", sequelize.literal(`CASE WHEN absen_mahasiswas.status = 'A' THEN 1 ELSE 0 END`)), "tanpaKeterangan"],
        [sequelize.fn("COUNT", sequelize.literal(`CASE WHEN absen_pertemuans.buka_at IS NULL THEN 1 ELSE NULL END`)), "jumlah_null_buka_at"] // Hitung NULL di buka_at dari absen_pertemuans
      ],
      where: {
        nim: id,
        semester: aktivitasTerakhir.semester,
        periode: aktivitasTerakhir.periode
      },
      include: [
        {
          model: absen_pertemuans,
          as: "pertemuans",
          required: false, // Pakai LEFT JOIN agar tetap menampilkan data meskipun tidak ada di absen_pertemuans
          attributes: []
        }
      ],
      group: ["matakuliah_nama", "semester", "periode"]
    });

    // Kurangi nilai pertemuan terakhir dengan jumlah buka_at yang NULL
    data.forEach(item => {
      const pertemuanTerakhir = item.dataValues.pertemuan_terakhir || 0;
      const jumlahNullBukaAt = item.dataValues.jumlah_null_buka_at || 0;
      item.dataValues.pertemuan_akhir_setelah_null = pertemuanTerakhir - jumlahNullBukaAt;
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
