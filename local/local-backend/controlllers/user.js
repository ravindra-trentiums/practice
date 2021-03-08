const validate = require('../validation/index')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
module.exports = {
    register: register,
    login: login
};

async function login(req, res, next) {
    try {
        let reqBody = req.body
        let vUser = validate.VALIDATE_LOGIN.validateLoginReq(reqBody);
        if (vUser.refused) {
            if (!vUser.errors) {
                res.status(400).send(
                    {
                        message: null
                    }
                );
            } else {
                res.status(400).send(
                    {
                        message: vUser.errors.request,
                    }
                );
            }
        } else {
            let user = await User.findOne({ email: reqBody.email, password: reqBody.password });
            if (user) {
                console.log(user)
                let payload = {
                    id: user._id,
                    email: user.email
                }
                let token = jwt.sign(payload, 'tokenKey', {
                    expiresIn: 30 * 24 * 60 * 60,
                });
                res.json({ token: token })
            } else {
                res.status(400).send(
                    { message: 'Error while registration.' }
                );
            }
        }
    } catch (errors) {
        return res.status(500).json(errors.message);
    }
}
async function register(req, res, next) {
    try {
        let reqBody = req.body
        let vUser = validate.VALIDATE_REGISTER.validateRegisterReq(reqBody);
        if (vUser.refused) {
            console.log(vUser, "kkkk")
            if (!vUser.errors) {
                res.status(400).send(
                    {
                        message: null
                    }
                );
            } else {
                res.status(400).send(
                    {
                        message: vUser.errors.request,
                    }
                );
            }
        } else {
            var register = await User.create(reqBody);
            if (register) {
                res.json({
                    message: 'User created successfully',
                });
            } else {
                res.status(400).send(
                    { message: 'Error while registration.' }
                );
            }
        }
    } catch (errors) {
        return res.status(500).json(errors.message);
    }
}
