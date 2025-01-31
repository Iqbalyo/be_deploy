const { absen_mahasiswas, absen_pertemuans, sequelize } = require("../models");

const getJadwalKuliah = async (req, res) => {
  const nim  = req.params;  // Mengambil nim dari parameter URL
  console.log("Menerima permintaan untuk NIM:", nim); // Log untuk debugging

  try {
    const jadwal = await absen_mahasiswas.findAll({
      where: {
        nim: nim,
        periode: '2023',
        semester: 'Genap'
      },
      include: [{
        model: absen_pertemuans,
        as: 'pertemuan',  // Pastikan alias yang digunakan pada relasi
        attributes: [
          [sequelize.fn('DAYNAME', sequelize.fn('CAST', sequelize.col('waktu'), 'TIMESTAMP')), 'hari'],
          [sequelize.fn('HOUR', sequelize.fn('CAST', sequelize.col('waktu'), 'TIMESTAMP')), 'jam'],
          'ruang'
        ]
      }],
      group: ['matakuliah_nama', 'kelas', 'pertemuan.hari', 'pertemuan.jam', 'pertemuan.ruang'],
      attributes: ['matakuliah_nama', 'kelas', 'periode', 'semester'],
      order: [
        [
          sequelize.literal(`
            CASE
              WHEN TRIM(SUBSTRING_INDEX(waktu, ',', 1)) = 'Senin' THEN 1
              WHEN TRIM(SUBSTRING_INDEX(waktu, ',', 1)) = 'Selasa' THEN 2
              WHEN TRIM(SUBSTRING_INDEX(waktu, ',', 1)) = 'Rabu' THEN 3
              WHEN TRIM(SUBSTRING_INDEX(waktu, ',', 1)) = 'Kamis' THEN 4
              WHEN TRIM(SUBSTRING_INDEX(waktu, ',', 1)) = 'Jumat' THEN 5
              WHEN TRIM(SUBSTRING_INDEX(waktu, ',', 1)) = 'Sabtu' THEN 6
              WHEN TRIM(SUBSTRING_INDEX(waktu, ',', 1)) = 'Minggu' THEN 7
            END
          `),
          'ASC'
        ],
        [sequelize.fn('HOUR', sequelize.fn('CAST', sequelize.col('waktu'), 'TIMESTAMP')), 'ASC']
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
