const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV;
const { secretKey } = require('../config/config')[env];

const generateToken = (data) => {
    return jwt.sign({ _id: data._id }, secretKey, { expiresIn: '6h' })
}
const verifyToken = (token) => {
    return new Promise((resolve,reject)=>{
        jwt.verify(token, secretKey,(err,data)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(data);
            return;
        })
    }) 
}
module.exports = {
    generateToken,
    verifyToken
}