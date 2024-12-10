import { SQLConection } from '../conection/sql.conection'

export class OrderRepository {

    constructor (private sqlConexion: SQLConection) { }

    async listMenu () {
        return this.sqlConexion.query('SELECT 1')
    }
}