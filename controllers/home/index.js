const Course = require("../../models/Course");

module.exports = {
    get: {
        async home(req, res, next) {
            const isLoggedIn = req.user !== undefined;

            const limit = isLoggedIn ? 0 : 3;
            const criteria = isLoggedIn ? { createdAt: '-1' } : { usersEnrolled: -1 };
            const courses = await Course
                .find({ isPublic: true })
             .sort(criteria)
            .limit(limit)
            .lean();

           // if (isLoggedIn) {
           //     courses.sort((a, b) => b.enrolledUsers.length - a.enrolledUsers.length);
           // } else {
           //     courses.sort((a, b) =>new Date( a.createdAt) - new Date(b.createdAt));
           // }
            //attached isLoggedIn to each course in courses
            const coursesWithIsLoggedIn = courses.reduce((acc, curr) => {
                acc.push({ ...curr, isLoggedIn });
                return acc;
            }, []);

            res.render('home', {
                isLoggedIn: req.user !== undefined,
                username: req.user ? req.user.username : '',
                courses: coursesWithIsLoggedIn

            });
        }
    },
    post: {

    }
}