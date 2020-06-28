const Course = require("../../models/Course");
const { validationResult } = require('express-validator');
const User = require("../../models/User");
module.exports = {
    get: {
        createCourse(req, res, next) {
            return res.render('create-course', {
                isLoggedIn: req.user !== undefined,
                username: req.user ? req.user.username : ''
            })
        },

        async detailsCourse(req, res, next) {
            const _id = req.params._id;
            const currentUserId = JSON.stringify(req.user._id);

            const tripp = await Tripp.findById(_id).lean().populate('buddies');
            const availableSeats = tripp.seats - tripp.buddies.length;
            console.log('seats av:', availableSeats);
            res.render('details-tripp', {
                isLoggedIn: req.user !== undefined,
                username: req.user !== undefined ? req.user.username : '',
                tripp,
                isDriver: JSON.stringify(tripp.driver) === currentUserId,
                isAlreadyJoined: JSON.stringify(tripp.buddies).includes(currentUserId),
                areSeatsAvailable: availableSeats > 0,
                availableSeats
            })
        },

        async detailsCourse(req, res, next) {
            const courseId = req.params._id;
            const currentUserId = JSON.stringify(req.user._id);
            try {
                const course = await Course.findById(courseId).populate('usersEnrolled').lean();
                res.render('details-course', {
                    isLoggedIn: req.user !== undefined,
                    username: req.user !== undefined ? req.user.username : '',
                    course,
                    checked: course.isPublic ? 'on' : undefined,
                    isTheCreator: currentUserId === JSON.stringify(course.creator),
                    isAlreadyEnrolled: JSON.stringify(course.usersEnrolled).includes(currentUserId)
                })
            } catch (err) {
                res.render('home', {
                    isLoggedIn: req.user !== undefined,
                    username: req.user !== undefined ? req.user.username : '',
                    message: err.message
                })
            }


        },
        async editCourse(req, res, next) {
            const _id = req.params._id;
            try {
                const course = await Course.findById(_id).lean();

                return res.render('edit-course', {
                    isLoggedIn: req.user !== undefined,
                    username: req.user !== undefined ? req.user.username : '',
                    course,
                    checked: course.isPublic === true ? '' : undefined
                });
            } catch (err) {
                res.render('home', {
                    isLoggedIn: req.user !== undefined,
                    username: req.user !== undefined ? req.user.username : '',
                    message: err.message
                });
            }



        },
        async enrollCourse(req, res, next) {
            const courseId = req.params._id;
            const currentUserId = req.user.id;

            await Course.updateOne({ _id: courseId }, { $push: { usersEnrolled: currentUserId } });
            await User.updateOne({ _id: currentUserId }, { $push: { enrolledCourses: courseId } });
            return res.redirect(`/course/details-course/${courseId}`);

        },
        async deleteCourse(req, res, next) {
            const _id = req.params._id;
            try {

                await Course.deleteOne({ _id });
                return res.redirect('/home/')

            } catch (err) {
                const courses = await Course.find().lean();
                return res.redirect('home', {
                    isLoggedIn: req.user !== undefined,
                    username: req.user !== undefined ? req.user.username : '',
                    message: err.message,
                    courses
                })
            }


        }

    },
    post: {
        async createCourse(req, res, next) {
            const { title, description, imageUrl, isPublic: isChecked } = req.body;
            console.log(req.body);
            console.log('isPublic::', isChecked);
          
            const isPublicc = isChecked === '' ? true : false;

            console.log(isPublicc);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('create-course', {
                    isLoggedIn: req.user !== undefined,
                    username: req.user !== undefined ? req.user.username : '',
                    message: errors.array()[0].msg,
                    oldInput: { title, description, imageUrl, isPublicc }
                })
            }

            const createdAt = (new Date() + "").slice(0, 24);

            const creator = req.user._id;

            await Course.create({ title, description, imageUrl, isPublic: isPublicc, createdAt, creator });
            res.redirect('/home/');
        },
        async editCourse(req, res, next) {
            const _id = req.params._id;
            const { title, description, imageUrl, isPublic: isChecked } = req.body;
            console.log('isChecked:',isChecked);
            const isPublic = isChecked === 'on' ? true : false;
            console.log(isPublic);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('create-course', {
                    isLoggedIn: req.user !== undefined,
                    username: req.user !== undefined ? req.user.username : '',
                    message: errors.array()[0].msg,
                    oldInput: { title, description, imageUrl, isPublic: isChecked }
                })
            }

            await Course.updateOne({ _id }, { title, description, imageUrl, isPublic });
            res.redirect('/home');
        }
    }

}