let sqlite = require('sqlite3');

const db = new sqlite.Database('./store.db', initialDb);

function initialDb(err) {
    if (err) return;
    db.run("CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER, `username` TEXT, `password` TEXT, `salt` TEXT, PRIMARY KEY(`id`));");
}

function getUserData(username) {
    return new Promise((resolve, reject) => {
        db.get('SELECT id, username, password, salt FROM users WHERE username=?', username, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    });
}

process.on('exit', function() {
    db.close();
});

exports.getUserData = getUserData;
