const {spawn} = require('child_process');
const fs = require('fs');
const events = require('events');

const router = require("express").Router();

const Candidate = require("../models/candidate");

router.post('/run_code', async (req, res) => {
    fs.writeFileSync("temp/script.py", req.body.code, (err) => console.log(err));
    const testCases = req.body.testCases;

    let testCaseResults = [];
    const emitter = new events.EventEmitter();

    for (let i=0; i < testCases.length; i++) {
        const python = spawn('python', ['temp/script.py']);

        let stdout, isSuccess;
        python.stdout.on('data', data => { // jshint ignore:line
            stdout = data.toString();
            isSuccess = true;
        });
        python.stderr.on('data', data => { // jshint ignore:line
            stdout = data.toString();
            isSuccess = false;
        });
        python.stdin.write(testCases[i].input);
        python.stdin.end();
        python.on('close', () => { // jshint ignore:line
            testCaseResults.push({success: isSuccess, caseNum: i, stdin: testCases[i].input, stdout: stdout, expected: testCases[i].expectedOutput});
            if (testCaseResults.length === testCases.length) emitter.emit('end');
        });
    }

    emitter.on('end', () => {
        testCaseResults.sort((a, b) => (a.caseNum > b.caseNum) ? 1 : -1);
        testCaseResults.forEach(result => delete result.caseNum);
        res.send({testCaseResults: testCaseResults});
        fs.unlinkSync('temp/script.py');
    });
});

router.post('/submit', (req, res) => {
    let userId = req.body.userId;

    fs.writeFile(`submissions/script_${userId}.py`, req.body.code, err => {
        if (err) res.send({success: false, error: err});
        else {
            Candidate.findByIdAndUpdate(userId, {
                submission: `script_${userId}.py`,
                submissionTime: Date.now()
            }, (err) => {
                if (err) res.send({success: false, error: err});
                else res.send({success: true});
            });
        }
    });
});

module.exports = router;
