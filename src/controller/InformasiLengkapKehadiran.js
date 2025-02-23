const { absen_mahasiswas, absen_pertemuans } = require("../models");

const getInformasiKehadiran = async (req, res) => {
  const { matakuliah_nama } = req.params;
  try {
    // Ambil data kehadiran dan informasi dosen
    const dataKehadiran = await absen_mahasiswas.findAll({
      where: { matakuliah_nama: matakuliah_nama },
      include: [{
        model: absen_pertemuans,
        as: 'pertemuan',
        attributes: ['pertemuan_ke', 'waktu', 'tanggal_kuliah', 'status', 'dosen'], // Tambahkan field dosen
      }],
      attributes: ['nim', 'matakuliah_nama', 'pertemuan_ke', 'status'],
    });

    if (!dataKehadiran.length) {
      return res.status(404).json({ message: "Data kehadiran tidak ditemukan" });
    }

    // Ambil nama dosen dari pertemuan pertama
    const dosenInfo = await absen_pertemuans.findOne({
      where: { matakuliah: matakuliah_nama },
      attributes: ['dosen'],
    });

    // Gabungkan data kehadiran dengan info dosen
    const response = {
      dosen: dosenInfo?.dosen || 'Tidak ada data dosen',
      dataKehadiran
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getInformasiKehadiran };