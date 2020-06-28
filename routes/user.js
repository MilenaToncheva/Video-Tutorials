const router=require('express').Router();
const controller=require('../controllers/user');
const isAuth=require('../utils/isAuth');
const isGuest = require('../utils/isGuest');

const validations=require('../utils/validator');

router.get('/register',isGuest(),controller.get.register);
router.get('/login',isGuest(),controller.get.login);
router.get('/logout',isAuth(),controller.get.logout);


router.post('/register',validations['user'], controller.post.register);
router.post('/login',validations['user'],controller.post.login);

module.exports=router;