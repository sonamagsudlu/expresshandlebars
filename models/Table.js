const Connection = require('../config/Connection'),
    CONFIG = process.env.PORT ?　process.env : require('../config.json').dev,
    connection = new Connection(CONFIG);

class Table {
    constructor(id, table) {
        this.id = id
        this.table = table
    }
    // Handles errors and closing db connection
    async dbAction(db, method) {
        try {
            let [ results ] = await method;
            return results
        } catch (error) {
            console.trace(error)
        } finally {
            await db.end();
        }
    }
    async dbReadAll(values) {
        let db = await connection.dbConnect();
        return await this.dbAction(
            db,
            db.query('SELECT ?? FROM ??', [values, this.table])
        )
    }
    async dbReadSpecific(values) {
        let db = await connection.dbConnect()
        return await this.dbAction(
            db,
            db.query('SELECT ?? FROM ?? WHERE ?', [values, this.table, {
                id: this.id
            }])
        )
    }
    async dbCreate(values) {
        let db = await connection.dbConnect()
        return await this.dbAction(
            db,
            db.query('INSERT INTO ?? SET ?', [this.table, values])
        )
    }
    async dbUpdate(values) {
        let db = await connection.dbConnect()
        return await this.dbAction(
            db,
            db.query('UPDATE ?? SET ? WHERE ?', [this.table, values, {
                id: this.id
            }])
        )
    }
    async dbDelete() {
        let db = await connection.dbConnect()
        return await this.dbAction(
            db,
            db.query('DELETE FROM ?? WHERE ?', [this.table, {
                id: this.id
            }])
        )
    }
}

module.exports = Table;