'use-strict';

require('dotenv').config();
const service = require('../service/index');
const hashPass = require('../lib/hash');
const jwt = require('jsonwebtoken');

const getHomepage = async (req, res) => {
    return res.status(200).json({data:'Phan Hai Dang'});
}

const register = async (req, res) => {
    try {

        let isEmail = await service.isEmailExist(req.body.email);

        if (isEmail) {

            return res.status(200).json({
                message: `User's email: ${req.body.email} already exist`
            });

        } else {
            //hash password with bcrypt
            let hashPassword = await hashPass.hashPassword(req.body.password);
            await service.createUser(req.body.email, hashPassword);

            return res.status(200).json({
                message: `Success`,
                authorizationJWT: hashPassword,
            });

        }
    } catch (error) {

        return res.status(404).json({
            Error: error
        });
    }
};

const login = async (req, res) => {
    try {

        let result = await service.login(req.body.email, req.body.password);
        let payload = { user: result.email };
        let options = { expiresIn: '2d' };
        let secret = process.env.JWT_SECRET;
        let token = jwt.sign(payload, secret, options);

        return res.status(200).json({
            message: 'Success',
            jwt: token
        });
        
    } catch (error) {
        return res.status(401).json({
            Error: error
        });
    }
};

const getInfoEmployees = async (req, res) => {
    try {
        
        let result = await service.getInfoEmployees();
        return res.status(200).json({
            data: result
        });
        
    } catch (error) {
        return res.status(400).json({
            Error: error
        });
    }
}

module.exports = {
    getHomepage,
    register,
    login,
    getInfoEmployees
}