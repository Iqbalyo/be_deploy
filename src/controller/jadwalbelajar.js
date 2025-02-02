const { absen_mahasiswas, absen_pertemuans, sequelize } = require("../models");

const getJadwalKuliah = async (req, res) => {
  const { nim } = req.params;

  console.log("Menerima permintaan untuk NIM:", nim);

  try {
    const jadwal = await absen_mahasiswas.findAll({
      where: {
        nim: nim,
        periode: "2023", // Pastikan tipe datanya string di DB
        semester: 'Genap'
      },
      include: [{
        model: absen_pertemuans,
        as: 'pertemuan',
        attributes: [
          [sequelize.fn('TO_CHAR', sequelize.literal('waktu::TIMESTAMP'), 'FMDay'), 'hari'],
          [sequelize.fn('EXTRACT', sequelize.literal('HOUR FROM waktu')), 'jam'],
          'ruang'
        ],
      }],
      group: ['absen_mahasiswas.matakuliah_nama', 'absen_mahasiswas.kelas', 'pertemuan.ruang'],
      attributes: ['matakuliah_nama', 'kelas', 'periode', 'semester'],
      order: [
        [
          sequelize.literal(`
            CASE 
              WHEN TRIM(TO_CHAR(waktu, 'Day')) = 'Monday' THEN 1
              WHEN TRIM(TO_CHAR(waktu, 'Day')) = 'Tuesday' THEN 2
              WHEN TRIM(TO_CHAR(waktu, 'Day')) = 'Wednesday' THEN 3
              WHEN TRIM(TO_CHAR(waktu, 'Day')) = 'Thursday' THEN 4
              WHEN TRIM(TO_CHAR(waktu, 'Day')) = 'Friday' THEN 5
              WHEN TRIM(TO_CHAR(waktu, 'Day')) = 'Saturday' THEN 6
              WHEN TRIM(TO_CHAR(waktu, 'Day')) = 'Sunday' THEN 7
            END
          `),
          'ASC'
        ],
        [sequelize.fn('EXTRACT', sequelize.literal('HOUR FROM waktu')), 'ASC']
      ]
    });

    console.log("Jadwal yang diterima:", JSON.stringify(jadwal, null, 2));

    res.status(200).json(jadwal);
  } catch (error) {
    console.error("Error fetching Jadwal Kuliah for NIM:", nim);
    console.error("Error details:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      stack: error.stack
    });
  }
};

module.exports = { getJadwalKuliah };
