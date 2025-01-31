const { jurusan } = require('../models');

const getJurusan = async (req, res) => {
    // try {
    //     const jurusanData = await jurusan.findAll({
    //         limit: 2, // Membatasi hanya 2 data
    //     });
    //     res.status(200).json(jurusanData);
    // } 
    try {
        const jurusanData = await jurusan.findAll();
        res.json(jurusanData);
    }
    
    catch (error) {
        console.error("Error fetching jurusan:", error);  // Log error ke konsol
        res.status(500).json({ error: error.message });
        
    }
};


module.exports = { getJurusan };