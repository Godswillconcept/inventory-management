const express = require("express");
var router = express.Router();
const {
  getConsumptions,
  addConsumption,
  saveConsumption,
  editConsumption,
  updateConsumption,
  getItemFromGroup
} = require("../controllers/consumptionController");

// consumption routes
router.get("/consumptions", getConsumptions);
router.get("/add-consumption", addConsumption);
router.post("/add-consumption", saveConsumption);
router.get("/consumption/:id/update", editConsumption);
router.post("/consumption/:id/update", updateConsumption);
router.get("/get-items-from-group/:group_id", getItemFromGroup);

module.exports = router;
