const { mahasiswa } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Fungsi untuk mengambil semua data mahasiswa
const findAll = async (req, res) => {
  try {
    const data = await mahasiswa.findAll();
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

// Fungsi untuk login
const login = async (req, res) => {
  try {
    const { user_id, password } = req.body;

    if (!user_id || !password) {
      return res.status(400).json({
        success: false,
        message: "Username dan password tidak boleh kosong.",
      });
    }

    const user = await mahasiswa.findOne({
      where: { user_id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Username tidak ditemukan.",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Password salah.",
      });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login berhasil.",
      accessToken,
      nama: user.nama,
      nim: user.nim,
      user: {
        id: user.id,
        user_id: user.user_id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
};

// Fungsi untuk mengambil data mahasiswa berdasarkan NIM
const findByNim = async (req, res) => {
  try {
    const nim = req.params.nim;
    const user = await mahasiswa.findOne({
      where: { nim },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Mahasiswa tidak ditemukan.",
      });
    }

    res.json({
      success: true,
      nama: user.nama,
      nim: user.nim,
      sts_bayar: user.sts_bayar, // Mengirim sts_bayar
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
};

// **Fungsi baru untuk mengambil status pembayaran (sts_bayar) berdasarkan NIM**
const getPaymentStatus = async (req, res) => {
  try {
    const nim = req.params.nim;
    const user = await mahasiswa.findOne({
      where: { nim },
      attributes: ['sts_bayar'],  // Hanya ambil status bayar (sts_bayar)
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Mahasiswa tidak ditemukan.",
      });
    }

    res.json({
      success: true,
      sts_bayar: user.sts_bayar, // Mengirimkan hanya sts_bayar
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
};

module.exports = { findAll, login, findByNim, getPaymentStatus };
