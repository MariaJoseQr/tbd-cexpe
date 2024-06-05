const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const danceWorkshopController = require("../controllers/workshops/danceWorkshopController");

router.get("/", indexController.home);

router.get("/programs/:param?", indexController.programs);
router.get("/workshops/:param?", indexController.workshops);
router.get("/advice/:param?", indexController.advice);
router.get("/contact", indexController.contact);

router.get("workshops/dance", danceWorkshopController.getAllDances);
router.post("workshops/dance", danceWorkshopController.createDance);
router.get("workshops/dance/:id", danceWorkshopController.getDance);
router.put("workshops/dance/:id", danceWorkshopController.updateDance);
router.delete("workshops/dance/:id", danceWorkshopController.deleteDance);

module.exports = router;
