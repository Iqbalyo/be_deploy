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
    origin: ["https://fe-deploy-olive.vercel.app", "http://localhost:5173"]
}));

// Routes
app.use(router);

// Fallback untuk rute yang tidak ditemukan
app.use((req, res) => {
    res.send({
        message: "Hallo 👋",
        status: "Server ready 🚀",
    });
});

// Server start
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 

