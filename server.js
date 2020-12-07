const express = require('express');
const {spawn} = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const events = require('events');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.post('/run_code', (req, res) => {
    fs.writeFileSync("temp/script.py", req.body.code, (err) => console.log(err));
    const testCases = req.body.testCases;

    let testCaseResults = [];
    const emitter = new events.EventEmitter();

    for (let i=0; i < testCases.length; i++) {
        const python = spawn('python', ['temp/script.py']);

        let stdout, isSuccess;
        python.stdout.on('data', data => {
            stdout = data.toString();
            isSuccess = true;
        });
        python.stderr.on('data', data => {
            stdout = data.toString();
            isSuccess = false;
        });
        python.stdin.write(testCases[i].input);
        python.stdin.end();
        python.on('close', () => {
            testCaseResults.push({success: isSuccess, stdin: testCases[i].input, stdout: stdout, expected: testCases[i].expectedOutput});
            if (i === testCases.length) emitter.emit('end');
        });
    }

    emitter.on('end', () => {
        res.send({testCaseResults: testCaseResults});
        fs.unlinkSync('temp/script.py');
    });
});

app.post('/submit', (req, res) => {
    fs.writeFile("submissions/script.py", req.body.code, err => {
        if (err) res.send({success: false, error: err});
        else res.send({success: true});
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App running on port ${port}`));