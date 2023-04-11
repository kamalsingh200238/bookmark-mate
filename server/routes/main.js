const express = require("express");
const app = express();
const router = express.Router();
const mainController=require("../controllers/main")

router.get("/", mainController.getTest);
router.post("/bookmark",mainController.addToBookmark);

module.exports = router;
