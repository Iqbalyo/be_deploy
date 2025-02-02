const getJadwalKuliah = async (req, res) => {
  const nim = req.params.nim;
  console.log("Menerima permintaan untuk NIM:", nim); // Debugging

  try {
    const jadwal = await absen_mahasiswas.findAll({
      where: {
        nim: nim,
        periode: '2023',
        semester: 'Genap'
      },
      include: [{
        model: absen_pertemuans,
        as: 'pertemuan',
        attributes: [
          [sequelize.literal(`TO_CHAR(waktu, 'Day')`), 'hari'], // PostgreSQL: Mengambil nama hari
          [sequelize.literal(`EXTRACT(HOUR FROM waktu)`), 'jam'], // PostgreSQL: Mengambil jam
          'ruang'
        ],
      }],
      attributes: ['matakuliah_nama', 'kelas', 'periode', 'semester'],
      order: [
        [
          sequelize.literal(`CASE
              WHEN TO_CHAR(waktu, 'Day') = 'Monday' THEN 1
              WHEN TO_CHAR(waktu, 'Day') = 'Tuesday' THEN 2
              WHEN TO_CHAR(waktu, 'Day') = 'Wednesday' THEN 3
              WHEN TO_CHAR(waktu, 'Day') = 'Thursday' THEN 4
              WHEN TO_CHAR(waktu, 'Day') = 'Friday' THEN 5
              WHEN TO_CHAR(waktu, 'Day') = 'Saturday' THEN 6
              WHEN TO_CHAR(waktu, 'Day') = 'Sunday' THEN 7
            END
          `), 'ASC'
        ],
        [sequelize.literal(`EXTRACT(HOUR FROM waktu)`), 'ASC']
      ]
    });

    res.status(200).json(jadwal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
};
