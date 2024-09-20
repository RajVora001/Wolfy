import { runMiddlewares } from './middleware.js';

const routes = {};

export function addRoute(method, path, handler) {
    if (!routes[method]) {
        routes[method] = {};
    }
    routes[method][path] = handler;
}

export function handleRequest(req, res) {
    runMiddlewares(req, res, () => {
        const { method, url } = req;
        const routeHandler = routes[method] ? routes[method][url] : null;

        if (routeHandler) {
            routeHandler(req, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    })
}



