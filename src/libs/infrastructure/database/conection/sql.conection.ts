import sql, { IProcedureParameter } from 'mssql'

export interface DbConfig {
    user: string;
    password: string;
    server: string;
    database: string;
    port: number;
    options: {
        encrypt: boolean;
        trustServerCertificate: boolean;
    }
    instanceName: string;
}

export class SQLConection {
    private poolPromise: sql.Promise<sql.ConnectionPool>

    constructor (private config: DbConfig) {
        this.poolPromise = sql.connect(this.config)
    }

    public async query<T>(query: string): Promise<T> {
        try {
            const pool = await this.poolPromise
            const result = await pool.request().query(query)
            return result.recordset
        } catch (error) {
            console.error('Error ejecutando la consulta: ', error)
            throw new Error('Error en la consulta SQL')
        }
    }

    public async execute (
        procedureName: string,
        parameters?: { [key: string]: any }
    ): Promise<any> {
        try {
            const pool = await this.poolPromise
            const request = pool.request()

            if (parameters) {
                Object.keys(parameters).forEach((key) => {
                    const value = parameters[key]
                    const type = this.getSqlType(value)
    
                    request.input(key, type, value)
                })
            }

            const result = await request.execute(procedureName)
            return result.recordset
        } catch (error) {
            console.error(`Error ejecutando el stored procedure: ${procedureName}`, error)
            throw new Error(`Error ejecutando el stored procedure: ${error.message}`)
        }
    }

    public async close (): Promise<void> {
        const pool = await this.poolPromise
        await pool.close()
    }

    private getSqlType (value: any): IProcedureParameter['type'] {
        if (typeof value === 'string') {
            return sql.NVarChar
        }
        if (typeof value === 'number') {
            return sql.Int
        }
        if (typeof value === 'boolean') {
            return sql.Bit
        }
        if (value instanceof Date) {
            return sql.DateTime
        }
        return sql.NVarChar
    }
}
