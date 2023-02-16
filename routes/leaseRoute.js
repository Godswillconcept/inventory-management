const express = require("express");
var router = express.Router();
const {
  getLeases,
  addLease,
  saveLease,
  editLease,
  updateLease,
  getItemFromGroup
} = require("../controllers/leaseController");

// lease routes
router.get("/leases", getLeases);
router.get("/add-lease", addLease);
router.post("/add-lease", saveLease);
router.get("/lease/:id/update", editLease);
router.post("/lease/:id/update", updateLease);
router.get("/get-items-from-group/:group_id", getItemFromGroup);

module.exports = router;
