const jwt = require("jsonwebtoken");
const config = require("./config");

function auth(req, res, next) {
    try {
        console.log("aaa");
        //setting up tokens for authorization
        const token = req;
        console.log(token);
        //decode data from tokens
        const decoded = jwt.verify(token, config.jwt.secret);
        console.log(decoded);
        next();
    } catch (err) {
        return res.send(401).json({
            msg: "Cannot authenticate.",
        });
    }
}

module.exports = auth;