const User = require('../../models/User');
const { validationResult } = require('express-validator');
const jwt = require('../../utils/jwt');
const env = process.env.NODE_ENV;
const { cookieName } = require('../../config/config')[env];
module.exports = {
    get: {
        register(req, res, next) {
            res.render('register', {
                isLoggedIn: req.user !== undefined,
                username: req.user !== undefined ? req.user.username : ''
            })
        },
        login(req, res, next) {
            res.render('login', {
                isLoggedIn: req.user !== undefined,
                username: req.user !== undefined ? req.user.username : ''
            })
        },
        logout(req, res, next) {
            req.user=null;
            res.clearCookie(cookieName).redirect('/home/');
        }
    },
    post: {
        //POST REGISTER
        async register(req, res, next) {
            const { username, password, repeatPassword } = req.body;
            console.log(req.body);
            if (password !== repeatPassword) {
                return res.render('register', {
                    message: 'Both passwords do not match!',
                    oldInput: { username, password, repeatPassword }
                })
            }
            if (password.length < 6) {
                return res.render('register', {
                    message: 'Password should be at least 6 symbols!',
                    oldInput: { username, password, repeatPassword }
                })
            }
            const errors = validationResult(req);
            //console.log(errors);
            if (!errors.isEmpty()) {

                return res.render('register', {
                    message: errors.array()[0].msg,
                    oldInput: { username, password, repeatPassword }
                });
            }
            const user = await User.findOne({ username });
            if (user) {
                return res.render('register', {
                    message: 'The username already exists!',
                    oldInput: { username, password, repeatPassword }

                })
            }

            await User.create({ username, password });
            res.redirect('/user/login');

        },
        //POST LOGIN
         async login(req, res, next) {
            const { username, password } = req.body
            //console.log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('login', {
                    message: errors.array()[0].msg,
                    oldInput: { username, password }
                })
            }
            const userDb = await User.findOne({ username });
            //console.log('user', userDb);
            if (!userDb) {
                return res.render('login', {
                    message: 'No such user in database! ',
                    oldInput: { username, password }
                });

            }
            const result = await userDb.passwordsMatch(password);
            //console.log('passwordMatchResult',result);
            if (!result) {
                return res.render('login', {
                    message: 'Invalid credentials! ',
                    oldInput: { username, password }
                });

            }
            const token = jwt.generateToken(userDb);
            res.status(201)
                .cookie(cookieName, token, { maxAge: 3600000 })
                .redirect('/home/');

        }

    }
}
