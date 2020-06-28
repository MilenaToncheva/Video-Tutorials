const express=require('express');
const cookieParser=require('cookie-parser');
const handlebars=require('express-handlebars');


module.exports=(app)=>{
    app.engine('hbs',handlebars({
        layoutsDir:'views',
        defaultLayout:'layouts/main',
        partialsDir:'views/partials',
        extname:'hbs'
    }));
    app.set('view engine','.hbs');
    
    app.use(express.static('static'));
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({extended:false}));

  
}