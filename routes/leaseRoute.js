const express = require("express");
var router = express.Router();
const {
  getLeases,
  addLease,
  saveLease,
  editLease,
  updateLease,
  getLeasesFromGroup
} = require("../controllers/leaseController");

// lease routes
router.get("/leases", getLeases);
router.get("/add-lease", addLease);
router.post("/add-lease", saveLease);
router.get("/lease/:id/update", editLease);
router.post("/lease/:id/update", updateLease);
router.get("/get-leases-from-group/:group_id", getLeasesFromGroup);

module.exports = router;
