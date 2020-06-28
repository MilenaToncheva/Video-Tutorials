const env = process.env.NODE_ENV;
const { verifyToken } = require('./jwt');
const User = require('../models/User');

const { cookieName } = require('../config/config')[env];

module.exports = () => {
    return async function (req, res, next) {
        const token = req.cookies[cookieName] || '';
        if (token === '') {
            next();
            return;

        }
       res.redirect('/home/');
    }
}
