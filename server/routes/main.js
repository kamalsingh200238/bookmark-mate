const express = require("express");
const app = express();
const router = express.Router();
const mainController=require("../controllers/main")

router.get("/", mainController.getTest);

module.exports = router;
