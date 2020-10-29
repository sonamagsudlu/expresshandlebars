const Table = require('./Table')

class Burger extends Table {
    constructor(params) {
        let defaults = { id: null, name: null }
        let { id, name } = params ? params : defaults
        super(id, 'burgers')
        this.id = id
        this.name = name
        this.devoured = false
    }
    async cook() {
        return await this.dbCreate({
            name: this.name,
            devoured: this.devoured
        })
    }
    async menu() {
        return await this.dbReadAll(['id', 'name', 'devoured'])
    }
}

module.exports = Burger;