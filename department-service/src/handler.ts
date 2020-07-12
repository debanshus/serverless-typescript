import { Handler } from 'aws-lambda';
import { departmentService } from './departmentService';

const service = new departmentService();

export const insert: Handler = (event, _context, _callback) => service.insert(event.body);
export const update: Handler = (event, _context, _callback) => service.update(event.body);
export const remove: Handler = (event, _context, _callback) => service.remove(event.body);
export const get: Handler = (event, _context, _callback) => service.get(event.pathParameters.deptId);
export const getAll: Handler = (_event, _context, _callback) => service.getAll();