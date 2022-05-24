const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addProduct = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const {
    name,
    category,
    provider,
    price,
    finalPrice,
    discount,
    stock,
    description,
    instructions,
    targetedPublic,
    content,
  } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4();

  const newProduct = {
    id,
    name,
    category,
    provider,
    price,
    finalPrice,
    discount,
    stock,
    description,
    instructions,
    targetedPublic,
    content,
    createdAt,
  };

  await dynamodb
    .put({
      TableName: "Products",
      Item: newProduct,
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify(newProduct),
  };
};

module.exports = {
  addProduct,
};
