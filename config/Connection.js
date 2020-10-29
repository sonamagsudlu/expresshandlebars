const mysql = require('mysql2/promise');

class Connection {
    constructor(config) {
        const { DATABASE, HOST, USER, PASSWORD } = config
        this.database = DATABASE
        this.host = HOST
        this.user = USER
        this.password = PASSWORD
    }
    async dbConnect() {
        return await mysql.createPool({
            database: this.database,
            host: this.host,
            user: this.user,
            password: this.password
        });
    }
}

module.exports = Connection;