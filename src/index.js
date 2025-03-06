require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const router = require("./router/router");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin: ["https://fe-deploy-olive.vercel.app", "http://localhost:5173"],
    credentials: true  // Jika menggunakan cookies atau JWT
}));

// Routes
app.use(router);

// Fallback untuk rute yang tidak ditemukan
app.use((req, res) => {
    res.json({
        message: "Hallo 👋",
        status: "Server ready 🚀",
    });
});

// Server start
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
