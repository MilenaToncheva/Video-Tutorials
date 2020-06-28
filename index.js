require('dotenv').config();
const env = process.env.NODE_ENV;

require('./config/database')().then(() => {
    const config = require('./config/config')[env];
    const app = require('express')();
    const appString = `***** Server is ready and listen on port ${config.port}! *****`;


    require('./config/express')(app);
    require('./config/routes')(app);


    app.listen(config.port, ((err) => {
        if (err) {
            return console.error(err);
        }
        console.log(appString);
    }));
});
