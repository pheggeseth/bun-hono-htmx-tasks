import { Hono } from 'hono';
import { tasks } from './tasks';

export const api = new Hono().route('/tasks', tasks);
