const { absen_mahasiswas, absen_pertemuans, sequelize } = require("../models");

const getJadwalKuliah = async (req, res) => {
  const nim = req.params.nim;
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
        as: 'jadwal',
        attributes: [
          [sequelize.fn('DAYNAME', sequelize.col('waktu')), 'hari'], // Mengambil nama hari dari kolom waktu
          [sequelize.fn('HOUR', sequelize.col('waktu')), 'jam'], // Mengambil jam dari kolom waktu
          'ruang'
        ],
      }],
      group: ['matakuliah_nama', 'kelas', 'jadwal.hari', 'jadwal.jam', 'jadwal.ruang'],
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
        [sequelize.fn('HOUR', sequelize.col('waktu')), 'ASC'] // Urutkan berdasarkan jam setelah hari
      ]
    });

    res.status(200).json(jadwal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getJadwalKuliah };
