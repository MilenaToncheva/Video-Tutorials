const router=require('../routes');

module.exports=(app)=>{
app.use('/home', router.home);
app.use('/user',router.user);
app.use('/course',router.course);
app.use('*',(req,res,next)=>{
    res.render('404',{
        isLoggedIn: req.user !== undefined,
        username: req.user ? req.user.username : ''
    })
})
}