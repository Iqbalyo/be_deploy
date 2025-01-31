//Berhubungan dg grpaik ips



const findDetailKehadiran = async (req, res) => {
  try {
    const { nim, matakuliah_nama } = req.params;

    // Mengambil pertemuan terakhir berdasarkan nim dan nama matakuliah
    const data = await absen_mahasiswas.findOne({
      attributes: [
        "matakuliah_nama",
        "semester",
        "periode",
        [sequelize.fn("MAX", sequelize.col("pertemuan_ke")), "pertemuan_terakhir"],
      ],
      where: {
        nim: nim,
        matakuliah_nama: matakuliah_nama,
      },
      include: [
        {
          model: absen_pertemuans,
          as: "pertemuan",
          attributes: ["pertemuan_ke"],
        },
      ],
      group: ["matakuliah_nama", "semester", "periode"],
    });
    console.log("Data yang dikembalikan:", data);

    if (!data) {
      return res.status(404).json({ message: "Data kehadiran tidak ditemukan" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching detail kehadiran:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { findDetailKehadiran };
