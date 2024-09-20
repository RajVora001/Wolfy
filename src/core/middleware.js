const middlewares = [];

export function use(middleware) {
    middlewares.push(middleware);
}

export function runMiddlewares(req, res, next) {
    let idx = -1;

    function run(i) {
        idx = i;
        if (middlewares[i]) {
            middlewares[i](req, res, () => run(i + 1));
        } else {
            next();
        }
    }
    run(0);
}

