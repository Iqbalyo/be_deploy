// controllers/JadwalPerkuliahan2023.js

const { absensDosen, absen_mahasiswas } = require('../models');

const getJadwalPerkuliahan2023 = async (req, res) => {
  try {
    const { nim } = req.params; // Ambil nim dari parameter URL
    
    // Cari data absen mahasiswa berdasarkan nim
    const mahasiswa = await absen_mahasiswas.findOne({
      where: { nim },
      attributes: ['dosen_id'], // Ambil dosen_id mahasiswa
    });

    if (!mahasiswa) {
      return res.status(404).json({ message: 'Mahasiswa tidak ditemukan.' });
    }

    const dosen_id = mahasiswa.dosen_id;

    // Ambil data jadwal perkuliahan berdasarkan dosen_id, semester Genap dan periode 2023
    const jadwal = await absensDosen.findAll({
      where: {
        dosen_id,
        semester: 'Genap',
        periode: '2023',
      },
      attributes: ['kelas', 'matakuliah', 'dosen', 'ruang', 'waktu'],
    });

    if (!jadwal || jadwal.length === 0) {
      return res.status(404).json({ message: 'Jadwal perkuliahan tidak ditemukan.' });
    }

    return res.status(200).json(jadwal);
  } catch (error) {
    console.error('Error getting jadwal perkuliahan:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = { getJadwalPerkuliahan2023 };
