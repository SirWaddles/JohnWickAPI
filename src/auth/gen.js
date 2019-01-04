const crypto = require('crypto');

function hashPassword(password, salt) {
    console.log(password.length);
    return crypto.pbkdf2Sync(password, salt, 5000, 64, 'sha512').toString('hex');
}

function createSalt() {
    return crypto.randomBytes(6).toString('hex');
}

let salt = createSalt();
let password = hashPassword('test-password', salt);
console.log(salt);
console.log(password);
