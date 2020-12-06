const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', (_, res) => res.send('pong'));

app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(process.env.PORT || 8080, () => console.log(`App running on port ${process.env.PORT || 8080}`));