const { mahasiswa, AktivitasKuliah } = require('../models');

const getMahasiswaPembayaranPerSemester = async (req, res) => {
    try {
        const { nim } = req.query; // Ambil NIM dari query parameter
        const mahasiswaData = await mahasiswa.findOne({
            where: { nim },
            attributes: ['nim', 'nama', 'sts_bayar']
        });

        if (!mahasiswaData) {
            return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
        }

        const aktivitasKuliahData = await AktivitasKuliah.findAll({
            where: { nim },
            attributes: ['semester_ke'],
            order: [['semester_ke', 'ASC']]
        });

        // Gabungkan data mahasiswa dengan aktivitas kuliah
        const result = aktivitasKuliahData.map((item) => ({
            nim: mahasiswaData.nim,
            nama: mahasiswaData.nama,
            semester_ke: item.semester_ke,
            status_pembayaran: mahasiswaData.sts_bayar.toLowerCase() === 'lunas' ? 'Lunas' : 'Belum Lunas'

        }));

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan' });
    }
};

module.exports = { getMahasiswaPembayaranPerSemester };
