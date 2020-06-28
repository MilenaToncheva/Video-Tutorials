const { body } = require('express-validator');

module.exports = {
    user:[
        body('username')
        .isAlphanumeric()
        .withMessage('Username should contain only english letters and digits!')
        .isLength({min:5})
        .withMessage('Username should be at least 5 symbols!'),
       
        body('password')
        .isAlphanumeric()
        .withMessage('Password should contain only english letters and digits!')
        .isLength({min:5})
        .withMessage('Password should be at least 5 symbols!')
        
    ],
    course:[
        body('title')
        .isLength({min:4})
        .withMessage('Title should be at least 4 symbols!'),
        
    body('description')
    .isLength({min:20})
    .withMessage('Description should be at least 20 symbols!')
    .isLength({max:50})
    .withMessage('Description should be 50 symbols at maximum!'),
    body('imageUrl')
        .custom((value) => {
            if(value===undefined){
                
                    throw new Error('Image URL field is required!');
            
            }
            if (!value.startsWith('https://')&&!value.startsWith('http://')) {
                throw new Error('Invalid URL! Please enter a valid one!');
            }
            return true;
        }),
    
    
    ]
}

