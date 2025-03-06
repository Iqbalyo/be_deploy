const { AktivitasKuliah } = require("../models");

const findAll = async (req, res) => {
    try {
        const data = await AktivitasKuliah.findAll();
        if (!data || data.length === 0) {
            return res.status(404).json({
                error: "Gak ada user",
            });
        }
        res.json({
            data: data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Server error",
        });
    }
};

const findAllByIpk = async (req, res) => {
    try {
        // Pastikan nim ada di body request
        const nim = req.body.nim;
        if (!nim) {
            return res.status(400).json({
                error: "NIM tidak ditemukan di request body",
            });
        }

        const data = await AktivitasKuliah.findAll({
            where: {
                nim: nim, 
            },
            attributes: ['ips','ipk', 'semester_ke'],
            order: [['semester_ke', 'DESC']],
        });

        if (data && data.length > 0) {
            const latestData = data[0].dataValues;
            res.json({
                ips: latestData.ips,
                ipk: latestData.ipk,
                semester_ke: latestData.semester_ke,
            });
        } else {
            console.log("Data tidak ditemukan");
            res.status(404).json({
                error: `Data tidak ditemukan untuk NIM ${nim}`,
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: "Server error",
        });
    }
};

// Fungsi tambahan untuk menampilkan IPS dan Semester berdasarkan NIM
const findIpsAndSemester = async (req, res) => {
    try {
        const nim = req.body.nim;
        if (!nim) {
            return res.status(400).json({
                error: "NIM tidak ditemukan di request body",
            });
        }

        console.log("Mencari data IPS dan Semester dengan NIM:", nim);

        // Mengambil data IPS dan semester_ke berdasarkan NIM
        // const data = await AktivitasKuliah.findAll({
        //     select: {
        //         semester_ke : semester_ke,
        //         ips: ips,
        //     },
        //     where: {
        //         nim: nim,
        //     },
        //     attributes: ['semester_ke', 'ips'], // Ambil hanya kolom yang dibutuhkan
        //     order: [['semester_ke', 'ASC']], // Urutkan berdasarkan semester_ke
        // });
        const data = await AktivitasKuliah.findAll({
            attributes: ['semester_ke', 'ips'], // Ambil hanya kolom yang dibutuhkan
            where: {
              nim: nim, // Filter berdasarkan nim yang dikirim
            },
            order: [['semester_ke', 'ASC']], // Urutkan berdasarkan semester_ke
          });
          


        if (data && data.length > 0) {
            const formattedData = data.map(item => ({
                semester_ke: item.semester_ke,
                ips: item.ips,
            }));

            res.json({ data: formattedData });
        } else {
            res.status(404).json({
                error: `Data tidak ditemukan untuk NIM ${nim}`,
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: "Server error",
        });
    }
};

module.exports = { findAll, findAllByIpk, findIpsAndSemester };
