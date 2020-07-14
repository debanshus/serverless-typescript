import { DynamoDB } from 'aws-sdk'

export class departmentService {
    private table: string;
    private dynamoDbClient: DynamoDB.DocumentClient;

    constructor(table: string, region: string) {
        this.table = table;
        this.dynamoDbClient = new DynamoDB.DocumentClient({ "region": region });
    }

    async create(item: any) {
        console.log("Inserting into table", this.table, " values", JSON.stringify(item));
        return await this.dynamoDbClient.put({ TableName: this.table, Item: item }).promise();
    };

    async update(key: any, updateExpression: any, expressionAttributeValues: any) {
        console.log("Updating table", this.table, ", where key", JSON.stringify(key), ", with data", expressionAttributeValues);
        return await this.dynamoDbClient.update({TableName: this.table, Key: key, UpdateExpression: updateExpression, 
            ExpressionAttributeValues: JSON.parse(expressionAttributeValues)}).promise();
    };

    async remove(key: any) {
        console.log("Deleting from table", this.table, ", item", JSON.stringify(key));
        return await this.dynamoDbClient.delete({ TableName: this.table, Key: key }).promise();
    };
      
    async fetch(key: any) {
        console.log("Fetching data from table", this.table, ", where key is", JSON.stringify(key));
        return await this.dynamoDbClient.get({ TableName: this.table, Key: key }).promise();
    };

    async fetchAll() {
        console.log("Fetching all data from table", this.table);
        return await this.dynamoDbClient.scan({ TableName: this.table }).promise();
    }; 
}