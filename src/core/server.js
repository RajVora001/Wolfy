import { createServer } from 'http';
import { handleRequest } from './router.js';


export function server() {
  return createServer(handleRequest)
}

