const crypto = require('crypto');
const app = require('../app');
const { getUserData } = require('../db');

const USERNAME_HEADER = 'x-jw-username';
const TOKEN_HEADER = 'x-jw-token';

function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 5000, 64, 'sha512').toString('hex');
}

function createSalt() {
    return crypto.randomBytes(6).toString('hex');
}

exports.hashPassword = hashPassword;
exports.createSalt = createSalt;

app.use('/', async function(req, res, next) {
    if (!req.headers.hasOwnProperty(USERNAME_HEADER)) {
        res.status(500).json({error: 'No username specified'});
        return;
    }

    let username = req.headers[USERNAME_HEADER];
    let user = false;
    try {
        user = await getUserData(username);
    } catch (e) {
        res.status(500).json({error: e});
        return;
    }

    if (!user) {
        res.status(500).json({error: 'User does not exist'});
        return;
    }

    let password = req.headers[TOKEN_HEADER];
    let hash = hashPassword(password, user.salt);
    if (hash !== user.password) {
        res.status(500).json({error: 'User does not exist'});
        return;
    }

    res.locals.user = user;
    next();
});
