import { server } from './core/server.js'
import { addRoute } from './core/router.js'
import { use, runMiddlewares } from './core/middleware.js'

export function createApp() {
    return {
        use,
        get: (path, handler) => addRoute('GET', path, handler),
        post: (path, handler) => addRoute('POST', path, handler),
        listen: (port, callback) => {
            const newServer = server();
            newServer.listen(port, callback);
        }
    }
}

