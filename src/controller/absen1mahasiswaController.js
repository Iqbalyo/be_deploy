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

    // Query untuk mendapatkan pertemuan terakhir
    const data = await absen_mahasiswas.findAll({
      attributes: [
        "matakuliah_nama",
        "semester",
        "periode",
        [sequelize.fn("MAX", sequelize.col("pertemuan_ke")), "pertemuan_terakhir"], // Ambil pertemuan terakhir
        [sequelize.fn("SUM", sequelize.literal(`CASE WHEN status = 'H' THEN 1 ELSE 0 END`)), "hadir"],
        [sequelize.fn("SUM", sequelize.literal(`CASE WHEN status = 'I' THEN 1 ELSE 0 END`)), "izin"],
        [sequelize.fn("SUM", sequelize.literal(`CASE WHEN status = 'A' THEN 1 ELSE 0 END`)), "tanpaKeterangan"],
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

    // Proses pengurangan jika ada buka_at yang NULL
    for (let i = 0; i < data.length; i++) {
      const pertemuanTerakhir = data[i].pertemuan_terakhir;

      if (pertemuanTerakhir) {
        const jumlahNullBukaAt = await absen_mahasiswas.count({
          where: {
            nim: id,
            semester: aktivitasTerakhir.semester,
            periode: aktivitasTerakhir.periode,
            buka_at: null, // Hanya hitung yang buka_at nya NULL
            pertemuan_ke: { [sequelize.Op.lte]: pertemuanTerakhir } // Hanya hitung dalam rentang pertemuan terakhir
          }
        });

        console.log(`Jumlah NULL buka_at untuk ${data[i].matakuliah_nama}:`, jumlahNullBukaAt);

        // Kurangi pertemuan terakhir dengan jumlah NULL pada buka_at
        data[i].pertemuan_terakhir = pertemuanTerakhir - jumlahNullBukaAt;
      }
    }

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
