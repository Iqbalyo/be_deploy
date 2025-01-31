const { absen_mahasiswas, AbsenWaktus } = require('../models');

const GetScheduleByNim = async (req, res) => {
  try {
    const { nim } = req.params;

    // Debugging Relasi
    console.log("Debugging Relasi AbsenWaktus:", AbsenWaktus.associations);
    console.log("Debugging Relasi absen_mahasiswas:", absen_mahasiswas.associations);

    // Cari data mahasiswa berdasarkan NIM
    const mahasiswa = await absen_mahasiswas.findOne({
      where: { nim },
      attributes: ['dosen_id']
    });

    // Debugging data mahasiswa
    console.log("Data Mahasiswa:", mahasiswa);

    if (!mahasiswa) {
      return res.status(404).json({ message: `Data mahasiswa dengan NIM ${nim} tidak ditemukan.` });
    }

    const { dosen_id } = mahasiswa;

    // Cek apakah dosen_id valid
    console.log("Dosen ID yang ditemukan:", dosen_id);

    // Ambil data jadwal dosen dengan absensi mahasiswa
    const jadwal = await AbsenWaktus.findAll({
      where: { dosen_id },
      attributes: ['id', 'hari', 'jam', 'ruang', 'created_at'],
      include: [
        {
          model: absen_mahasiswas,
          as: 'mahasiswa', // Alias sesuai definisi asosiasi
          attributes: ['matakuliah_nama', 'semester', 'periode', 'status'],
          where: { nim }, // Filter berdasarkan nim
          required: true, // Pastikan jadwal hanya muncul jika ada mahasiswa dengan nim ini
        }
      ],
    });

    // Debugging data jadwal sebelum diurutkan
    console.log("Jadwal Sebelum Sort:", jadwal.map(j => `${j.hari}, ${j.jam}`));

    // Referensi hari dalam urutan yang benar
    const hariUrutan = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    // Sort jadwal berdasarkan hari dan waktu (jam)
    const sortedJadwal = jadwal.sort((a, b) => {
      const hariA = hariUrutan.indexOf(a.hari.trim());
      const hariB = hariUrutan.indexOf(b.hari.trim());

      // Debugging indeks hari
      console.log(`Comparing: ${a.hari.trim()} (${hariA}) - ${b.hari.trim()} (${hariB})`);

      if (hariA === hariB) {
        return a.jam.localeCompare(b.jam); // Urutkan berdasarkan jam jika hari sama
      }

      return hariA - hariB; // Urutkan berdasarkan hari
    });

    // Debugging data jadwal setelah diurutkan
    console.log("Jadwal Setelah Sort:", sortedJadwal.map(j => `${j.hari}, ${j.jam}`));

    // Format data jadwal untuk output
    const processedJadwal = sortedJadwal.map((item) => {
      const absensiMahasiswa = item.mahasiswa.map((m) => {
        // Proses data status menjadi hadir, izin, atau tanpa keterangan
        const status = m.status.toLowerCase();
        return {
          nama_matakuliah: m.matakuliah_nama,
          semester: m.semester,
          periode: m.periode,
          status: status === 'h' ? 'Hadir' : status === 'i' ? 'Izin' : 'Tanpa Keterangan'
        };
      });

      return {
        matakuliah: item.mahasiswa[0].matakuliah_nama,
        kelas: item.mahasiswa[0].semester, // Perbarui jika salah
        ruang: item.ruang,
        waktu: `${item.hari}, ${item.jam}`,
        absensi: absensiMahasiswa
      };
    });

    res.status(200).json(processedJadwal);
  } catch (error) {
    console.error("Error fetching schedule: ", error);
    res.status(500).json({ message: "Kesalahan fetch data", error });
  }
};

module.exports = { GetScheduleByNim };
