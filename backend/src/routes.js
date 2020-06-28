const { Router } = require("express");
const DeveloperController = require("./controllers/DeveloperController");
const SearchController = require("./controllers/SearchController");

const router = new Router();

router.get("/developers", DeveloperController.index);
router.get("/search", SearchController.index);
router.post("/developers", DeveloperController.store);

module.exports = router;