const router = require("express").Router();

router.use("/admin", require("./admin"));
router.use("/assessment", require("./assessment"));
router.use("/candidate", require("./candidate"));

module.exports = router;