const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
var cookieParser = require('cookie-parser');
const multer = require("multer");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

const corsOptions = {
    origin: 'http://195.35.23.209',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
dotenv.config();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
    .then(console.log('DB Connected'))
    .catch(err => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/upload");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    return res.status(200).json(file.filename);
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
    console.log('Backend is running')
})


module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://195.35.23.209',
            changeOrigin: true,
            secure: false
        })
    );
};