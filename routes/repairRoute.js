const express = require("express");
var router = express.Router();
const {
  getRepairs,
  addRepair,
  saveRepair,
  editRepair,
  updateRepair,
  deleteRepair,
} = require("../controllers/repairController");

// repair routes
router.get("/repairs", getRepairs);
router.get("/add-repair", addRepair);
router.post("/add-repair", saveRepair);
router.get("/repair/:id/update", editRepair);
router.post("/repair/:id/update", updateRepair);
router.get("/repair/:id/delete", deleteRepair);

module.exports = router;
