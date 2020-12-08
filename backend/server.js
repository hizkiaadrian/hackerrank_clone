const express = require('express');
const {spawn} = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const events = require('events');
const mongoose = require('mongoose');

const User = require('./db_schemas/user');
const e = require('express');

const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
            testCaseResults.push({success: isSuccess, stdin: testCases[i].input, stdout: stdout, expected: testCases[i].expectedOutput});
            if (i === testCases.length - 1) emitter.emit('end');
        });
    }

    emitter.on('end', () => {
        res.send({testCaseResults: testCaseResults});
        fs.unlinkSync('temp/script.py');
    });
});

app.post('/submit', (req, res) => {
    let userId = req.body.userId;

    fs.writeFile(`submissions/script_${userId}.py`, req.body.code, err => {
        if (err) res.send({success: false, error: err});
        else {
            User.findByIdAndUpdate(userId, {
                submission: `script_${userId}.py`,
                submissionTime: Date.now()
            }, (err) => {
                if (err) res.send({success: false, error: err});
                else res.send({success: true});
            });
        }
    });
});

// TODO: protect route
app.post('/create_new_user', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email
    });

    newUser.save(err => {
        if (err) {
            res.send({success: false, error: err.message});
            return;
        }
        res.send({success: true, user: newUser});
    });
});

// TODO: fix error message
app.post('/validate_user', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            res.send({success: false, error: "Something went wrong. Please contact *technical_issues mail*"});
            return;
        }
        else {
            if (!user) {
                res.send({success: false, error: "User not registered. Please register at *provide link to application form*"});
                return;
            }

            if (user.submissionTime) {
                res.send({success: false, error: "Assessment completed."});
                return;
            }
                res.send({success: true, userId: user._id});
                return;
        }}
    );
});

app.get('/check_assessment_started', async (req, res) => {
    let uuid = req.query.uuid;

    User.findById(uuid, (err, user) => {
        if (err)
            res.send({success: false, error: err.message});
        else {
            if (user)
                res.send({success: true, assessmentStarted: user.assessmentStarted});
            else
                res.send({success: false, error: "User not found"});
        }
    });
});

app.post('/start_assessment', async (req, res) => {
    let uuid = req.body.uuid;

    User.findByIdAndUpdate(uuid, {assessmentStarted: Date.now()}, {new: true}, (err, user) => {
        if (err)
            res.send({success: false, error: err});
        else {
            if (!user)
                res.send({success: false, error: "User not found"});
            else
                res.send({success: true, user});
        }
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App running on port ${port}`));