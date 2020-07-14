import { departmentController } from '../src/departmentController';
import { assert } from 'chai';

describe('departmentService', function () {
    var controller: departmentController;

    before(function () {
        // runs once before the first test in this block
        controller = new departmentController();
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
        var response = controller.create('{"deptId":"D01","deptName":"IT","deptLocation":"Unit1"}');
        assert.isNotNull(response);
    });

    /*it('update should be successfull', () => {
        deptService.update("");
        console.log(JSON.stringify(response));
    });*/

    it('remove should be successfull', () => {
        var response = controller.remove('{"deptId":"D01"}');
        assert.isNotNull(response);
    });

    it('get should be successfull', () => {
        var response = controller.fetch("D01");
        assert.isNotNull(response);
    });

    it('getAll should be successfull', () => {
        var response = controller.fetchAll();
        assert.isNotNull(response);
    });
});