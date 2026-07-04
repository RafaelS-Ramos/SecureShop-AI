const db = require("../database/db");

function findByEmail(email) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
}

function createUser(name, email, password, role = "USER") {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, password, role],
            function (err) {
                if (err) {
                    return reject(err);
                }
                resolve({ id: this.lastID, name, email, role });
            }
        );
    });
}

module.exports = {
    findByEmail,
    createUser,
};