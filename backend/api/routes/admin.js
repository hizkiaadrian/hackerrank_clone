const router = require("express").Router();

const Admin = require("../models/admin");
const Candidate = require("../models/candidate");

const {authenticate} = require("../middlewares/authentication");

router.post('/register', Admin.addAdmin);
router.post('/authenticate', Admin.getUserByEmail);
router.get('/download_submission', authenticate(), Candidate.downloadSubmission);
router.post('/create_new_candidate', authenticate(), Candidate.createNewCandidate);
router.get('/get_all_candidates', authenticate(), Candidate.getAllCandidates);

module.exports = router;