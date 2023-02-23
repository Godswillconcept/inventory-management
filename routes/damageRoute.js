const express = require("express");
var router = express.Router();
const {
  getDamages,
  addDamage,
  saveDamage,
  editDamage,
  updateDamage,
  getDamagesFromGroup,
} = require("../controllers/damageController");

// damage routes
router.get("/damages", getDamages);
router.get("/add-damage", addDamage);
router.post("/add-damage", saveDamage);
router.get("/damage/:id/update", editDamage);
router.post("/damage/:id/update", updateDamage);
router.get("/get-damages-from-group/:group_id", getDamagesFromGroup);


module.exports = router;
