'use-strict';

require('dotenv').config();
const jwt = require("jsonwebtoken");

/**
 * Verify makes sure that the token hasn't expired and has been issued
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const authorizationJWT = (req, res, next) => {

    const authorizationHeader = req.headers.authorization;
    let result;
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1]; // Bearer <token>
        const options = {
            expiresIn: '2d',
        }
        try {
            result = jwt.verify(token, process.env.JWT_SECRET, options);
            req.decoded = result;
            next();
        } catch (err) {
            return res.status(500).json({
                message: 'Something wrong with verification'
            })
        }
    }
    else {
        result = {
            status: 401,
            error: `Authentication error. Token required.`
        };
        res.status(401).json(result);
    }
}

module.exports = {
    authorizationJWT
}