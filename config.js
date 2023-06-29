require("dotenv").config();

module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET,
        option:{
            algorithm: "HS256",
            expiresIn: "1d",
        },
    },
};