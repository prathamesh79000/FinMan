const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRouter = require('./routes/authRoutes');

// 1] Middleware
app.use(cors()); // CORS
app.use(express.json()); // Parse

// 2] Route
app.use('/api/auth', authRouter);

// 3] DB Connection
mongoose.connect('mongodb+srv://riteshkedar06:YDIG2G9VVPQ5I6FP@cluster0.jfajaqf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error(`DB Error: ${err}`));

// 4] Global error handler
app.use((err, req, res, next) => {
    err.statuCode = err.statuCode || 500;
    err.status = err.status || 'error';

    res.status(err.statuCode).json({
        status: err.status,
        message: err.message
    });
});

// 5] Server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})