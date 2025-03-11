const { absen_mahasiswas, absen_pertemuans } = require("../models");

const getInformasiKehadiran = async (req, res) => {
  const { matakuliah_nama } = req.params;

  try {
    const dataKehadiran = await absen_mahasiswas.findAll({
      where: { matakuliah_nama },
      include: [
        {
          model: absen_pertemuans,
          as: "pertemuan",
          attributes: ["pertemuan_ke", "waktu", "tanggal_kuliah", "status", "dosen"],
        },
      ],
      attributes: ["nim", "matakuliah_nama", "pertemuan_ke", "status"],
    });

    if (!dataKehadiran.length) {
      return res.status(404).json({ message: "Data kehadiran tidak ditemukan" });
    }

    // Format data & atur status jika NULL
    const formattedData = dataKehadiran.map((item) => {
      const itemJSON = item.toJSON(); // Pastikan objek bisa diakses
      return {
        ...itemJSON,
        status:
          itemJSON.status === null ||
          itemJSON.status === "NULL" ||
          itemJSON.status === undefined
            ? "Perkuliahan dibatalkan oleh dosen"
            : itemJSON.status,
        dosen: itemJSON.pertemuan?.dosen || "Dosen tidak ditemukan",
      };
    });

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getInformasiKehadiran };
