import { dynamoDBClient } from '../../database-service/src/dynamoDBClient';
import { departmentDto } from '../../database-service/src/departmentDto';

export class departmentService {

    dynamoDb = new dynamoDBClient("us-east-1");
    tableName = "Departments";

    private createResponse(statusCode: number, message: any) {
        var lambdaResponse = {
            statusCode: statusCode,
            body: (typeof message == undefined || message == null) ? '' : JSON.stringify(message)
        };
        console.log("Lambda Response: ", lambdaResponse);
        return lambdaResponse;
    }

    async insert(data: string) {
        const item = JSON.parse(data);
        await this.dynamoDb.insert(this.tableName, item);
        this.createResponse(200, "Data inserted successfully!");
    }

    async update(data: string) {
        const department = JSON.parse(data) as departmentDto
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

        var response = await this.dynamoDb.update(this.tableName, { deptId: department.deptId },
            updateExpression, JSON.parse(expressionAttributeValues));
        this.createResponse(200, response.Attributes);
    }

    async remove(data: string) {
        const department = JSON.parse(data) as departmentDto
        var response = await this.dynamoDb.remove(this.tableName, { deptId: department.deptId });
        this.createResponse(200, response.Attributes);
    }


    async get(deptId: string) {
        var response = await this.dynamoDb.get(this.tableName, { deptId: deptId });
        this.createResponse(200, response.Item);
    }

    async getAll() {
        var response = await this.dynamoDb.getAll(this.tableName);
        this.createResponse(200, response.Items);
    }
}