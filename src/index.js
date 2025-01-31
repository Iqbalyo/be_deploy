const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./router/router");

const app = express();
const port = 3000;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Ubah jika perlu
}));

// Routes
app.use(router);

// Fallback untuk rute yang tidak ditemukan
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
    });
});

// Server start
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 

