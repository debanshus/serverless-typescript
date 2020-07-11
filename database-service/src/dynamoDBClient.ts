import { DynamoDB } from 'aws-sdk'

export class dynamoDBClient {
    private dynamoDbClient: DynamoDB.DocumentClient;

    constructor(region: string) {
        this.dynamoDbClient = new DynamoDB.DocumentClient({ "region": region });
    }

    insert(tableName: string, item: any) {
        console.log("Inserting into table", tableName, " values", JSON.stringify(item));
        return this.dynamoDbClient.put({ TableName: tableName, Item: item }).promise();
    };

    update(tableName: string, key: any, updateExpression: any, expressionAttributeValues: any) {
        console.log("Updating table", tableName, ", where key", JSON.stringify(key), ", with data", JSON.stringify(expressionAttributeValues));
        return this.dynamoDbClient.update({TableName: tableName, Key: key, UpdateExpression: updateExpression, 
            ExpressionAttributeValues: expressionAttributeValues}).promise();
    };

    remove(tableName: string, key: any) {
        console.log("Deleting from table", tableName, ", item", JSON.stringify(key));
        return this.dynamoDbClient.delete({ TableName: tableName, Key: key }).promise();
    };
      
    get(tableName: string, key: any) {
        console.log("Fetching data from table", tableName, ", where key is", JSON.stringify(key));
        return this.dynamoDbClient.get({ TableName: tableName, Key: key }).promise();
    };

    getAll(tableName: string) {
        console.log("Fetching all data from table", tableName);
        return this.dynamoDbClient.scan({ TableName: tableName }).promise();
    }; 

}

