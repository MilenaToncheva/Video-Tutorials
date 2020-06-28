const router=require('express').Router();
const controller=require('../controllers/course');
const isAuth=require('../utils/isAuth');
const validations=require('../utils/validator');

router.get('/create-course',isAuth(),controller.get.createCourse);
router.get('/details-course/:_id',isAuth(),controller.get.detailsCourse);
router.get('/edit-course/:_id',isAuth(),controller.get.editCourse);
router.get('/enroll-course/:_id',isAuth(),controller.get.enrollCourse);
router.get('/delete-course/:_id',isAuth(),controller.get.deleteCourse);


router.post('/create-course',isAuth(),validations['course'],controller.post.createCourse);
router.post('/edit-course/:_id',isAuth(),validations['course'],controller.post.editCourse);


module.exports=router;