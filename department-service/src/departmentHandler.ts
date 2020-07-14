import { Handler } from 'aws-lambda';
import { departmentController } from './departmentController';

const service = new departmentController();

export const create: Handler = (event, _context, _callback) => service.create(event.body);
export const update: Handler = (event, _context, _callback) => service.update(event.body);
export const remove: Handler = (event, _context, _callback) => service.remove(event.body);
export const fetch: Handler = (event, _context, _callback) => service.fetch(event.pathParameters.deptId);
export const fetchAll: Handler = (_event, _context, _callback) => service.fetchAll();