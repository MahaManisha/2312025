require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { Log } = require("../logging-middleware/logger");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/notifications", notificationRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Notification API is running"
    });
});

app.use(async (err, req, res, next) => {
    await Log(
        "backend",
        "error",
        "route",
        err.message
    );

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    try {
        await Log(
            "backend",
            "info",
            "route",
            `Server started successfully on port ${PORT}`
        );
    } catch (error) {
        console.error("Failed to log server startup.");
    }
});