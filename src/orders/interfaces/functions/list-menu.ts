import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { DbConfig, OrderRepository, SQLConection } from '../../../libs/infrastructure/database'

export const handler = async (event: APIGatewayProxyHandler): Promise<APIGatewayProxyResult> => {
    try {
        const config: DbConfig = {
            user: 'usrdev',
            password: 'u$$2r0d2e3v',
            server: '10.92.108.20',
            database: 'SIAN2_PRD',
            options: {
                encrypt: false,
                trustServerCertificate: true
            },
            port: 14333,
            instanceName: 'MSSQLSERVER_DEV'
        }
        const conection = new SQLConection(config)
        const orderRepository = new OrderRepository(conection)
        const resultado = await orderRepository.listMenu()
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Resultado:' + ' ' + resultado,
                input: event,
            }),
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: error.message
            })
        }
    }
}