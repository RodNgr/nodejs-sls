import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyHandler): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: '¡Hola desde Lambda!',
            input: event,
        }),
    }
}