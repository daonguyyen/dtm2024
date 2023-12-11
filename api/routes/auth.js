const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//Register
router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        })
        //Luu user
        const user = await newUser.save()
        const { password, ...info } = user._doc
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err)
    }
})

//Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user === null) {
            return res.status(404).json("Invalid user!")
        }
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (!user) {
            return res.status(401).json("Wrong password or username!")
        }
        else if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong password or username!")
        }
        else {
            const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin, username: user.username },
                process.env.SECRET_KEY,
                { expiresIn: "2d" });
            const { password, ...info } = user._doc;
            return res.cookie("access_token", accessToken, {
                domain: "http://localhost:3000",
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            }).status(200).json({ ...info, accessToken })

        }

    } catch (err) {
        return res.status(500).json(err)
    }
})

//Logout
router.post("/logout", async (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logout!")
})

module.exports = router