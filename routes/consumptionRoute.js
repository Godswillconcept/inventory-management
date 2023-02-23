const express = require("express");
var router = express.Router();
const {
  getConsumptions,
  addConsumption,
  saveConsumption,
  editConsumption,
  updateConsumption,
  getConsumptionsFromGroup
} = require("../controllers/consumptionController");

// consumption routes
router.get("/consumptions", getConsumptions);
router.get("/add-consumption", addConsumption);
router.post("/add-consumption", saveConsumption);
router.get("/consumption/:id/update", editConsumption);
router.post("/consumption/:id/update", updateConsumption);
router.get("/get-consumptions-from-group/:group_id", getConsumptionsFromGroup);

module.exports = router;
