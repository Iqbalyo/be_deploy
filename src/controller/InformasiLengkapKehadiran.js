const { absen_mahasiswas, absen_pertemuans } = require("../models");
const { Op } = require("sequelize");

const getInformasiKehadiran = async (req, res) => {
  const { matakuliah_nama } = req.params;
  try {
    // Ambil data kehadiran berdasarkan nama mata kuliah dan status tidak null
    const dataKehadiran = await absen_mahasiswas.findAll({
      where: { 
        matakuliah_nama: matakuliah_nama,
        status: {
          [Op.and]: [
            { [Op.ne]: null },  // status tidak null
            { [Op.ne]: '' }     // status tidak empty string
          ]
        }
      },
      include: [{
        model: absen_pertemuans,
        as: 'pertemuan',
        attributes: ['pertemuan_ke', 'waktu', 'tanggal_kuliah', 'status'],
      }],
      attributes: ['nim', 'matakuliah_nama', 'pertemuan_ke', 'status'],
    });

    if (!dataKehadiran.length) {
      return res.status(404).json({ message: "Data kehadiran tidak ditemukan" });
    }

    // Filter lagi untuk memastikan hanya status yang valid
    const validStatuses = ['H', 'I', 'A'];
    const filteredData = dataKehadiran.filter(data => 
      data.status && validStatuses.includes(data.status.toLowerCase())
    );

    res.status(200).json(filteredData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getInformasiKehadiran };