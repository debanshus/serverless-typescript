import { departmentService } from './departmentService';
import { departmentDto } from './departmentDto';

export class departmentController {

    service = new departmentService("Departments", "us-east-1");

    constructor() {
        //no op
    }

    async create(data: string) {
        const item = JSON.parse(data);
        try {
            await this.service.create(item);
        } catch (error) {
            console.error("Error in creating deparment: ", error)
            return error;
        }
        return this.successResponse(200, "Data inserted successfully!");
    }

    async update(data: string) {
        var department: any;
        try {
            department = JSON.parse(data) as departmentDto;
        } catch (error) {
            console.error("Error in request body while updating deparment: ", error)
            return error;
        }
        var updateExpression = "set ";
        var expressionAttributeValues = "{";
        if (department.deptName != null) {
            updateExpression = updateExpression + "deptName = :deptName";
            expressionAttributeValues = expressionAttributeValues + "\":deptName\" : \"" + department.deptName + "\"";
        }
        if (department.deptLocation != null) {
            updateExpression = updateExpression + ", deptLocation = :deptLocation";
            expressionAttributeValues = expressionAttributeValues + ", \":deptLocation\" : \"" + department.deptLocation + "\"";
        }
        expressionAttributeValues = expressionAttributeValues + "}";

        console.log("updateExpression:", updateExpression);
        console.log("expressionAttributeValues:", expressionAttributeValues);

        try {
            await this.service.update({ deptId: department.deptId }, updateExpression, expressionAttributeValues);
        } catch (error) {
            console.error("Error in updating deparment: ", error)
            return error;
        }
        return this.successResponse(200, "Data updated successfully!");
    }

    async remove(data: string) {
        const department = JSON.parse(data) as departmentDto
        try {
            await this.service.remove({ deptId: department.deptId });
        } catch (error) {
            console.error("Error in removing deparment: ", error)
            return error;
        }
        return this.successResponse(200, "Data removed successfully!");
    }


    async fetch(deptId: string) {
        var response: any;
        try {
            response = await this.service.fetch({ deptId: deptId });
        } catch (error) {
            console.error("Error in fetching deparment: ", error)
            return error;
        }
        return this.successResponse(200, response.Item);
    }

    async fetchAll() {
        var response: any;
        try {
            response = await this.service.fetchAll();
        } catch (error) {
            console.error("Error in fetching all deparments: ", error)
            return error;
        }
        return this.successResponse(200, response.Items);
    }

    private successResponse(statusCode: number, message: any) {
        var messageBody: string;
        if (typeof message == undefined || message == null) messageBody = '';
        else if (typeof message != 'string') messageBody = JSON.stringify(message);
        else messageBody = message;

        var lambdaResponse = {
            'statusCode': statusCode,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': '*'
            },
            'body': messageBody
        };
        console.log("Lambda Response: ", lambdaResponse);
        return lambdaResponse;
    }
}