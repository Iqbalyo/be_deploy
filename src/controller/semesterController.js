const { AktivitasKuliah } = require('../models');

// Mengambil semester terbaru berdasarkan nim
const getSemesterByNim = async (req, res) => {
  const { nim } = req.params;

  try {
    const semester = await AktivitasKuliah.findOne({
      where: { nim },
      attributes: ['semester_ke', 'semester'], // Kolom yang diperlukan
      order: [['semester_ke', 'DESC']], // Mengambil semester terbaru
    });

    if (!semester) {
      return res.status(404).json({ message: "Semester tidak ditemukan" });
    }

    res.status(200).json(semester);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSemesterByNim };
