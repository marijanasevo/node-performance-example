const express = require('express');
const cluster = require('cluster');
const os = require('os');

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

console.log('Running native-cluster.js...');
if (cluster.isMaster) {
  console.log('Master has been started');
  const NUM_WORKERS = os.cpus().length;

  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log('Worker process started ' + process.pid);
  app.listen(3000);
}

// Chrome > DevTools > Network > [x] Disable cache
// or refresh without cache
// Ctrl + Shift + R
