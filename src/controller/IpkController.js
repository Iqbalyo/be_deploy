const { AktivitasKuliah } = require("../models");

const findAll = async (req, res) => {
    try {
        const data = await AktivitasKuliah.findAll();
        if (!data || data.length === 0) {
            return res.status(404).json({
                error: "Gak ada user",
            });
        }

        console.log("Data dari database:", data);

        // Mapping jurusan_id ke nama jurusan
        const formattedData = data.map(item => {
            let jurusanNama = "Tidak Diketahui";
            if (item.jurusan_id != null) {
                if (item.jurusan_id === 1) jurusanNama = "Teknik Informatika";
                else if (item.jurusan_id === 2) jurusanNama = "Sistem Informasi";
                else if (item.jurusan_id === 3) jurusanNama = "Sistem Komputer";
            }

            return {
                ...item, // Gunakan langsung tanpa dataValues
                jurusan_nama: jurusanNama,
            };
        });

        console.log("Data setelah diproses:", formattedData);
        res.json({ data: formattedData });
    } catch (error) {
        console.error("Error di findAll:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { findAll };
