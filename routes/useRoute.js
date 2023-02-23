const express = require("express");
var router = express.Router();
const {
  getUses,
  addUse,
  saveUse,
  editUse,
  updateUse,
  getUsesFromGroup
} = require("../controllers/useController");

// use routes
router.get("/uses", getUses);
router.get("/add-use", addUse);
router.post("/add-use", saveUse);
router.get("/use/:id/update", editUse);
router.post("/use/:id/update", updateUse);
router.get("/get-uses-from-group/:group_id", getUsesFromGroup);

module.exports = router;
