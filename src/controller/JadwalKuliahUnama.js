const { absen_mahasiswas, absen_pertemuans } = require('../models');

const getJadwalKuliah = async (req, res) => {
  try {
    const { nim } = req.params; // Mengambil NIM dari URL parameter
    
    if (!nim) {
      return res.status(400).json({ message: 'NIM mahasiswa diperlukan' });
    }

    // Mendapatkan jadwal berdasarkan NIM
    const jadwal = await absen_mahasiswas.findAll({
      where: { nim, periode: 2023, semester: 'Genap' },
      include: [
        {
          model: absen_pertemuans,
          as: 'pertemuan', // Pastikan 'pertemuan' adalah alias yang tepat
          attributes: ['matakuliah', 'ruang', 'waktu', 'kelas', 'dosen'],
        },
      ],
      attributes: ['matakuliah_kode', 'matakuliah_nama', 'kelas'],
    });

    // Jika jadwal tidak ditemukan
    if (jadwal.length === 0) {
      return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
    }

    // Mengelompokkan jadwal berdasarkan matakuliah_nama
    const groupedJadwal = jadwal.reduce((acc, item) => {
      const matakuliah = item.matakuliah_nama;
      if (!acc[matakuliah]) {
        acc[matakuliah] = {
          matakuliah,
          dosen: item.pertemuan.dosen,
          ruang: item.pertemuan.ruang,
          waktu: item.pertemuan.waktu,
          kelas: item.pertemuan.kelas,
        };
      }
      return acc;
    }, {});

    // Mengubah hasil menjadi array dari objek yang sudah dikelompokkan
    const hasil = Object.values(groupedJadwal);

    return res.status(200).json(hasil);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan server', error });
  }
};

module.exports = { getJadwalKuliah };
