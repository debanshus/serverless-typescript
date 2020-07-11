import { Handler } from 'aws-lambda';
import { dynamoDBClient } from '../../database-service/src/dynamoDBClient';
import { departmentDto } from '../../database-service/src/departmentDto';

const dynamoDb = new dynamoDBClient("us-east-1");
const tableName = "Departments";

function createResponse(statusCode: number, message: any) {
  var lambdaResponse = {
    statusCode: statusCode,
    body: (typeof message == undefined || message == null) ? '' : JSON.stringify(message)
  };
  console.log("Lambda Response: ", lambdaResponse);
  return lambdaResponse;
}

export const insert: Handler = async (event, _context) => {
  const item = JSON.parse(event.body);
  await dynamoDb.insert(tableName, item);
  createResponse(200, "Data inserted successfully!");
}

export const update: Handler = async (event, _context) => {
  const data = JSON.parse(event.body);
  const department = data as departmentDto
  var updateExpression = "set ";
  var expressionAttributeValues = "{";
  if (department.deptName != null) {
    updateExpression = updateExpression + "deptName = :deptName";
    expressionAttributeValues = expressionAttributeValues + "':deptName' : '" + department.deptName + "'";
  }
  if (department.deptLocation != null) {
    updateExpression = updateExpression + ", deptLocation = :deptLocation";
    expressionAttributeValues = expressionAttributeValues + ", ':deptLocation' : '" + department.deptLocation + "'";
  }
  expressionAttributeValues = expressionAttributeValues + "}";

  console.log("updateExpression:", updateExpression);
  console.log("expressionAttributeValues:", expressionAttributeValues);

  var response = await dynamoDb.update(tableName, { deptId: department.deptId },
    updateExpression, JSON.parse(expressionAttributeValues));
  createResponse(200, response.Attributes);
}

export const remove: Handler = async (event, _context) => {
  const data = JSON.parse(event.body);
  const department = data as departmentDto
  var response = await dynamoDb.remove(tableName, { deptId: department.deptId });
  createResponse(200, response.Attributes);
}

export const get: Handler = async (event, _context) => {
  const deptId = event.pathParameters.deptId;
  var response = await dynamoDb.get(tableName, { deptId: deptId });
  createResponse(200, response.Item);
}

export const getAll: Handler = async (_event, _context) => {
  var response = await dynamoDb.getAll(tableName);
  createResponse(200, response.Items);
}
