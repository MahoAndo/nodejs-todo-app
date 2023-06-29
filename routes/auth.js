const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
const auth = require("../auth");
const User = require("../models/User")

//register
router.post("/register", async(req, res) => {
    console.log(req.body.username);
    const payload = {
        username: req.body.username,
        email: req.body.email,
    };
    //issue token
    const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);
    const body = {
        username: req.body.username,
        email: req.body.email,
        token: token,
    };
    const register = await User.create(body);
    res.status(200).json(body);
});

//login
router.get("/login", async(req, res) => {
    try {
        res.status(200);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async(req, res) => {
    console.log(req.body.username);
    try {
        console.log(req.body);
        // check if the user exists
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            //check if password matches
            const result = req.body.email === user.email;
            if (result) {
                console.log("OK");
                const body = {
                    username: user.username,
                    email: user.email,
                    token: user.token,
                };
                res.status(200).json(body);
            } else {
                res.status(400).json({ error: "password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});
module.exports = router;