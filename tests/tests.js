import { get } from 'http';

const totalReq = 10000;
const concurrency = 100;
const url = 'http://localhost:3000/hello';

let completedReq = 0;
let startTime = Date.now();
let totalRes = 0;

function sendReq() {
    const reqStart = Date.now();

    get(url, (res) => {
        const duration = Date.now() - reqStart;
        totalRes += duration;

        res.on('data', () => { });
        res.on('end', () => {
            completedReq++;
            if (completedReq < totalReq) {
                sendReq();
            } else {
                const totalTime = Date.now() - startTime;
                console.log(`Completed ${completedReq} Req`);
                console.log(`Total time: ${totalTime} ms`);
                console.log(`Avg test time: ${totalRes / totalReq} ms`);
                console.log(' ')
            }
        });
    }).on('error', (err) => {
        console.error('Error:-', err.message);
    });
}

for (let i = 0; i < concurrency; i++) {
    sendReq()
}

