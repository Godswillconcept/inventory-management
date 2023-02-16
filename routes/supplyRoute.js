const express = require("express");
var router = express.Router();
const {
  getSupplies,
  addSupply,
  saveSupply,
  editSupply,
  updateSupply,
  deleteSupply,
} = require("../controllers/supplyController");

// supply routes
router.get("/supplies", getSupplies);
router.get("/add-supply", addSupply);
router.post("/add-supply", saveSupply);
router.get("/supply/:id/update", editSupply);
router.post("/supply/:id/update", updateSupply);
router.get("/supply/:id/delete", deleteSupply);

module.exports = router;
