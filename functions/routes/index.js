const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.home);

router.get("/programs/:param?", indexController.programs);
router.get("/workshops/:param?", indexController.workshops);
router.get("/advice/:param?", indexController.advice);
router.get("/contact", indexController.contact);

module.exports = router;
