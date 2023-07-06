const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

const generateJWT = async (uId, username, email) => {
    const payload = {uId, username, email};
    try{
        const token = await jwt.sign(payload, secret, {expiresIn: "12h",});
        return token;
    }catch(err){
        console.error(err);
        throw new Error(err + 'No se pudo generar el token')
    }
};

module.exports = {generateJWT};