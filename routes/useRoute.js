const express = require("express");
var router = express.Router();
const {
  getUses,
  addUse,
  saveUse,
  editUse,
  updateUse,
  getItemFromGroup
} = require("../controllers/useController");

// use routes
router.get("/uses", getUses);
router.get("/add-use", addUse);
router.post("/add-use", saveUse);
router.get("/use/:id/update", editUse);
router.post("/use/:id/update", updateUse);
router.get("/get-items-from-group/:group_id", getItemFromGroup);

module.exports = router;
