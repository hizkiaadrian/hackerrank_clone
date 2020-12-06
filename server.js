const express = require('express');
const {spawn} = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.post('/run_code', (req, res) => {
    fs.writeFileSync("temp/script.py", req.body.code, (err) => console.log(err));
    let dataToSend, isSuccess;

    const python = spawn('python', ['temp/script.py']);
    python.stdout.on('data', data => {
        dataToSend = data.toString();
        isSuccess = true;
    });
    python.stderr.on('data', data => {
        dataToSend = data.toString();
        isSuccess = false;
    });
    python.stdin.write('5\n6\n');
    python.stdin.end();
    python.on('close', _ => {
        res.send({success: isSuccess, consoleOutput: dataToSend});
        fs.unlinkSync('temp/script.py');
    });
});

app.listen(process.env.PORT || 8080, () => console.log(`App running on port ${process.env.PORT || 8080}`));