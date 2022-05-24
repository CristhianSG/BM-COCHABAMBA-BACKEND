const AWS = require('aws-sdk');

const updateProduct = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const { checked, description, provider } = JSON.parse(event.body)

    await dynamodb.update({
        TableName: 'Products',
        Key: { id },
        UpdateExpression: 'set checked = :checked, description = :description, provider = :provider',
        ExpressionAttributeValues: {
            ':checked': checked,
            ':description' : description,
            ':provider' : provider,
        },
        ReturnValues: 'ALL_NEW'
    }).promise()

    return {
        status: 200,
        body: JSON.stringify({
            message: 'Product updated successfully'
        })
    }

}

module.exports = {
    updateProduct
}