const AWS = require('aws-sdk')

const getProduct = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters;

    const result = await dynamodb.get({
        TableName: 'Products',
        Key: {
            id
        }
    }).promise()

    const product = result.Item

    console.log(product)

    return {
        status: 200,
        body: product
    }

}

module.exports = {
    getProduct,
}