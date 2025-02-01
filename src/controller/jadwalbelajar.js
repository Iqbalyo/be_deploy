const { absen_mahasiswas, absen_pertemuans, sequelize } = require("../models");

const getJadwalKuliah = async (req, res) => {
  const { nim } = req.params; 

  console.log("Menerima permintaan untuk NIM:", nim); // Log untuk debugging

  try {
    const jadwal = await absen_mahasiswas.findAll({
      where: {
        nim: nim,
        periode: 2023,
        semester: 'Genap'
      },
      include: [{
        model:jadwal_pertemuan,
        as: 'pertemuan',
        attributes: [
          [sequelize.fn('TO_CHAR', sequelize.fn('CAST', sequelize.col('waktu'), 'TIMESTAMP'), 'FMDay'), 'hari'], // Mengambil nama hari
          [sequelize.fn('EXTRACT', sequelize.col('waktu'), 'HOUR'), 'jam'], // Mengambil jam
          'ruang'
        ],
      }],
      group: ['matakuliah_nama', 'kelas', 'pertemuan.hari', 'pertemuan.jam', 'pertemuan.ruang'],
      attributes: ['matakuliah_nama', 'kelas', 'periode', 'semester'],
      order: [
        [
          sequelize.literal(`
            CASE
              WHEN TO_CHAR(waktu, 'Day') = 'Monday' THEN 1
              WHEN TO_CHAR(waktu, 'Day') = 'Tuesday' THEN 2
              WHEN TO_CHAR(waktu, 'Day') = 'Wednesday' THEN 3
              WHEN TO_CHAR(waktu, 'Day') = 'Thursday' THEN 4
              WHEN TO_CHAR(waktu, 'Day') = 'Friday' THEN 5
              WHEN TO_CHAR(waktu, 'Day') = 'Saturday' THEN 6
              WHEN TO_CHAR(waktu, 'Day') = 'Sunday' THEN 7
            END
          `),
          'ASC'
        ],
        [sequelize.fn('EXTRACT', sequelize.col('waktu'), 'HOUR'), 'ASC'] // Urutkan berdasarkan jam
      ]
    });

    res.status(200).json(jadwal);
  } catch (error) {
    console.error("Error fetching Jadwal Kuliah for NIM:", nim);
    console.error("Error details:", error); // Log error details including the stack trace
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      stack: error.stack // Send stack trace for debugging
    });
  }
};

module.exports = { getJadwalKuliah };
