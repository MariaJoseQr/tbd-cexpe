const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const programsRouter = require("./program");
const categoriesRouter = require("./category");

router.get("/", indexController.home);

router.use("/programs", programsRouter);
router.use("/categories", categoriesRouter);
router.get("/workshops/:param?", indexController.workshops);
router.get("/advice/:param?", indexController.advice);
router.get("/contact", indexController.contact);

module.exports = router;
