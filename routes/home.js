const router=require('express').Router();
const controller=require('../controllers/home');
const isAuth=require('../utils/isAuth');

router.get('/',isAuth(true),controller.get.home);



module.exports=router;