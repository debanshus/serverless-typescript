import { departmentHandler } from '../src/departmentHandler';
import { expect, assert } from 'chai';

class reponse {
    statusCode: number;
    body: string
}

describe('departmentHandler', function () {
    before(function () {
        // runs once before the first test in this block
    });

    after(function () {
        // runs once after the last test in this block
    });

    beforeEach(function () {
        // runs before each test in this block
    });

    afterEach(function () {
        // runs after each test in this block
    });


    it('insert should be successfull', async () => {
        const event = {
            httpMethod: 'POST',
            body: '{"deptId":"D10","deptName":"IT","deptLocation":"Unit10"}'
        };
        var response: reponse = await departmentHandler.create(event, null, null);

        expect(response).to.have.property("statusCode");
        expect(response).to.have.property("body");
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.equal("Data inserted successfully!");
    });

    it('update should be successfull', async () => {
        const event = {
            httpMethod: 'PUT',
            body: '{"deptId":"D10","deptName":"MECH","deptLocation":"Unit15"}'
        };
        var response: reponse = await departmentHandler.update(event, null, null);

        assert.hasAnyKeys(response, ["statusCode", "body"]);
        assert.isNotNull(response.statusCode)
        assert.isNotNull(response.body)
        assert.equal(response.statusCode, 200);
        assert.equal(response.body, "Data updated successfully!");
    });

    it('remove should be successfull', async () => {
        const event = {
            httpMethod: 'POST',
            body: '{"deptId":"D01"}'
        };
        var response: reponse = await departmentHandler.remove(event, null, null);

        assert.hasAnyKeys(response, ["statusCode", "body"]);
        assert.isNotNull(response.statusCode)
        assert.isNotNull(response.body)
        assert.equal(response.statusCode, 200);
        assert.equal(response.body, "Data removed successfully!");
    });

    it('get should be successfull', async () => {
        const event = {
            httpMethod: 'GET',
            pathParameters: {
                deptId: 'D10'
            }
        };
        var response: reponse = await departmentHandler.fetch(event, null, null);

        assert.hasAnyKeys(response, ["statusCode", "body"]);
        assert.isNotNull(response.statusCode)
        assert.isNotNull(response.body)
        assert.equal(response.statusCode, 200);
        assert.equal(response.body, '{"deptLocation":"Unit15","deptName":"MECH","deptId":"D10"}');
    });

    it('getAll should be successfull', async () => {
        const event = {
            httpMethod: 'GET'
        };
        var response: reponse = await departmentHandler.fetchAll(event, null, null);

        assert.hasAnyKeys(response, ["statusCode", "body"]);
        assert.isNotNull(response.statusCode)
        assert.isNotNull(response.body)
        assert.equal(response.statusCode, 200);
        assert.equal(response.body, '[{"deptLocation":"Unit15","deptName":"MECH","deptId":"D10"}]');
    });
});