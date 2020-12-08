const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    name: String,
    email: String,
    assessmentStarted: {
        type: Date,
        default: null
    },
    submission: {
        type: String,
        default: null
    },
    submissionTime: {
        type: Date,
        default: null
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;

module.exports.createNewCandidate = (req, res) => {
    let newCandidate = new Candidate({
        name: req.body.name,
        email: req.body.email
    });

    newCandidate.save(err => {
        if (err) {
            res.send({success: false, error: err.message});
            return;
        }
        res.send({success: true, candidate: newCandidate});
    });
};

module.exports.getAllCandidates = (_, res) => {
    Candidate.find((err, candidates) => {
        if (err)
            res.send({success: false, error: err});
        else
            res.send({success: true, candidates: candidates});
    });
};

// TODO: fix error message
module.exports.validateCandidate = (req, res) => {
    Candidate.findOne({email: req.body.email}, (err, candidate) => {
        if (err) {
            res.send({success: false, error: "Something went wrong. Please contact *technical_issues mail*"});
            return;
        }
        else {
            if (!candidate) {
                res.send({success: false, error: "Candidate not registered. Please register at *provide link to application form*"});
                return;
            }

            if (candidate.submissionTime) {
                res.send({success: false, error: "Assessment completed.", userId: candidate._id});
                return;
            }
                res.send({success: true, userId: candidate._id});
                return;
        }}
    );
}

module.exports.startAssessment = (req, res) => {
    let uuid = req.body.uuid;

    Candidate.findByIdAndUpdate(uuid, {assessmentStarted: Date.now()}, {new: true}, (err, candidate) => {
        if (err)
            res.send({success: false, error: err});
        else {
            if (!candidate)
                res.send({success: false, error: "Candidate not found"});
            else
                res.send({success: true, assessmentStarted: candidate.assessmentStarted});
        }
    });
}

module.exports.checkAssessmentStarted = (req, res) => {
    let uuid = req.query.uuid;

    Candidate.findById(uuid, (err, candidate) => {
        if (err)
            res.send({success: false, error: err.message});
        else {
            if (candidate)
                res.send({success: true, assessmentStarted: candidate.assessmentStarted});
            else
                res.send({success: false, error: "Candidate not found"});
        }
    });
}

module.exports.checkSubmission = (req, res) => {
    let uuid = req.query.uuid;

    Candidate.findById(uuid, (err, candidate) => {
        if (err)
            res.send({success: false, error: err.message});
        else {
            if (candidate) 
                res.send({success: true, submitted: candidate.submission !== null});
            else
                res.send({success: false, error: "Candidate not found"});
        }
    });
}