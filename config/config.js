module.exports = {
    development: {
        port: process.env.PORT,
        databaseUrl: process.env.DB_URL,
        secretKey: process.env.SECRET_KEY,
        cookieName: process.env.COOKIE
    },
    production: {

    }
}