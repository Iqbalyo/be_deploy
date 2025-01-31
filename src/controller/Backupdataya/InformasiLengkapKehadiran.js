const { absen_mahasiswas, absen_pertemuans } = require("../models");

const getInformasiKehadiran = async (req, res) => {
  const { matakuliah_nama } = req.params; // Ambil nama mata kuliah dari parameter

  try {
    // Ambil data kehadiran berdasarkan nama mata kuliah
    const dataKehadiran = await absen_mahasiswas.findAll({
      where: { matakuliah_nama: matakuliah_nama },
      include: [{
        model: absen_pertemuans,
        as: 'pertemuan',
        attributes: ['pertemuan_ke', 'waktu', 'tanggal_kuliah', 'status'], // Ambil field yang diperlukan
      }],
      attributes: ['nim', 'matakuliah_nama', 'pertemuan_ke', 'status'], // Ambil field yang diperlukan
    });

    if (!dataKehadiran.length) {
      return res.status(404).json({ message: "Data kehadiran tidak ditemukan" });
    }

    res.status(200).json(dataKehadiran);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getInformasiKehadiran };