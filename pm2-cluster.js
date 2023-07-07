const express = require('express');

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // event loop is blocked
  }
}

app.get('/', (req, res) => {
  res.send('Performance example ' + process.pid);
});

app.get('/timer', (req, res) => {
  delay(5000);
  res.send('Ding ding ding ' + process.pid);
});

console.log('Worker process started ' + process.pid);
app.listen(3000);

// PM2
// npm i pm2 && npm i pm2 -g
// pm2 start server.js
// pm2 stop server.js
// pm2 delete server.js

// pm2 monit (fancy live dash in terminal of cluster processes)
// pm2 start pm2-cluster.js -i (for instance) [num/max]
// pm2 start server.js -l logs.txt (send logs to) -i max
// pm2 list (current state of the server)
// pm2 show [num id] (detailed info on cluster process)
// pm2 stop [num id] (stopping single cluster process)
// pm2 start [num id] (start single cluster process)
// pm2 logs
// pm2 logs --lines

// zero downtime restart (each server gets brought offline one by one)
// pm2 reload server

// Chrome > DevTools > Network > [x] Disable cache
// or refresh without cache
// Ctrl + Shift + R
