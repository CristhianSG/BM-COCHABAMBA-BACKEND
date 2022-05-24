const AWS = require('aws-sdk');

const getProducts = async (event) => {

    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const result = await dynamodb.scan({
            TableName: 'Products',
        }).promise()

        const products = result.Items;

        return {
            status: 200,
            body: { products }
        };
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getProducts
}