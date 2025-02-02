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
        as: 'pertemuan',  // Pastikan menggunakan alias yang benar
        attributes: [
          [sequelize.fn('TRIM', sequelize.fn('SUBSTRING_INDEX', sequelize.col('waktu'), ',', 1)), 'hari'], // Ambil hari dari string
          [sequelize.fn('TRIM', sequelize.fn('SUBSTRING_INDEX', sequelize.col('waktu'), ',', -1)), 'jam'], // Ambil jam dari string
          'ruang'
        ],
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
        [sequelize.fn('TRIM', sequelize.fn('SUBSTRING_INDEX', sequelize.col('waktu'), ',', -1)), 'ASC'] // Urutkan berdasarkan jam dari string
      ]
    });

    res.status(200).json(jadwal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server", error: error });
  }
};

module.exports = { getJadwalKuliah };
