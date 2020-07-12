import { departmentService } from '../src/departmentService';
import { assert } from 'chai';

describe('departmentService', function () {
    var deptService: departmentService;

    before(function () {
        // runs once before the first test in this block
        deptService = new departmentService();
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


    it('insert should be successfull', () => {
        var response = deptService.insert('{"deptId":"D01","deptName":"IT","deptLocation":"Unit1"}');
        assert.isNotNull(response);
    });

    /*it('update should be successfull', () => {
        deptService.update("");
        console.log(JSON.stringify(response));
    });*/

    it('remove should be successfull', () => {
        var response = deptService.remove('{"deptId":"D01"}');
        assert.isNotNull(response);
    });

    it('get should be successfull', () => {
        var response = deptService.get("D01");
        assert.isNotNull(response);
    });

    it('getAll should be successfull', () => {
        var response = deptService.getAll();
        assert.isNotNull(response);
    });
});