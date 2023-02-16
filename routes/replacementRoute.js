const express = require("express");
var router = express.Router();
const {
  getReplacements,
  addReplacement,
  saveReplacement,
  editReplacement,
  updateReplacement,
  deleteReplacement,
} = require("../controllers/replacementController");

// replacement routes
router.get("/replacements", getReplacements);
router.get("/add-replacement", addReplacement);
router.post("/add-replacement", saveReplacement);
router.get("/replacement/:id/update", editReplacement);
router.post("/replacement/:id/update", updateReplacement);
router.get("/replacement/:id/delete", deleteReplacement);

module.exports = router;
