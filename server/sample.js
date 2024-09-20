import { createApp } from '../src/index.js'
import { parseJson } from '../src/utils/parser.js';

const app = createApp();
let num = 0;
app.use((req, res, next) => {
    console.log(req.url + ' ' + num);
    num += 1;
    next();
});

app.use(parseJson);

app.get('/hello', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome Genius');
});

app.post('/data', (req, res) => {
    console.log('data:-' + req.body);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ msg: 'Data received', data: req.body }));
})

app.listen(3000, () => {
    console.log('Server running on 3000');
})

