const { absen_mahasiswas, absen_pertemuans, sequelize } = require("../models");

const getJadwalKuliah = async (req, res) => {
  try {
    const { nim } = req.params;  // Mengambil NIM dari URL parameter

    console.log("Menerima permintaan untuk NIM:", nim); // Log untuk debugging

    // Cek apakah nim diberikan
    if (!nim) {
      return res.status(400).json({ message: "NIM harus diberikan" });
    }

    // Query untuk mendapatkan jadwal kuliah berdasarkan NIM
    const jadwal = await absen_mahasiswas.findAll({
      where: { nim },
      include: [
        {
          model: absen_pertemuans,
          as: 'pertemuan',  // Sesuaikan dengan alias yang digunakan di asosiasi
          attributes: ['id', 'matakuliah', 'kelas', 'waktu', 'pertemuan_ke', 'semester', 'periode'],
        }
      ],
      attributes: ['absen_id', 'nim', 'nama', 'status', 'absen_at', 'matakuliah_nama', 'kelas', 'semester', 'periode'],
      order: [['absen_at', 'DESC']], // Urutkan dari yang terbaru
    });

    if (jadwal.length === 0) {
      return res.status(404).json({ message: "Jadwal tidak ditemukan untuk NIM ini." });
    }

    return res.status(200).json({ success: true, data: jadwal });

  } catch (error) {
    console.error("Error saat mengambil jadwal kuliah:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server.", error: error.message });
  }
};

module.exports = { getJadwalKuliah };
