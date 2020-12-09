const router = require("express").Router();

const Candidate = require("../models/candidate");

router.post('/validate_user', Candidate.validateCandidate);
router.get('/check_assessment_started', Candidate.checkAssessmentStarted);
router.get('/check_submission', Candidate.checkSubmission);
router.post('/start_assessment', Candidate.startAssessment);

module.exports = router;