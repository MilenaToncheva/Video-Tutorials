const env = process.env.NODE_ENV;

const User = require('../models/User');
const jwt = require('./jwt');
const { cookieName } = require('../config/config')[env];

module.exports =  (justContinue = false) => {
    return async function (req, res, next) {
        const token = req.cookies[cookieName] || '';
       // console.log('token-to-verify',token);       
        try {
            const result =await jwt.verifyToken(token);
           // console.log('result-varify-token',result);
            const user = await User.findById(result._id);
            if (user) {
                req.user = user;
                
                next();
            } else {
                res.redirect('/user/login');
            }

        } catch (err) {
            if (justContinue) {
                next();
                return;
            }
            res.redirect('/user/login');
        }

    }
}