const express = require("express");
var router = express.Router();
const {
  getSales,
  addSale,
  saveSale,
  editSale,
  updateSale,
  getItemFromGroup
} = require("../controllers/saleController");

// sale routes
router.get("/sales", getSales);
router.get("/add-sale", addSale);
router.post("/add-sale", saveSale);
router.get("/sale/:id/update", editSale);
router.post("/sale/:id/update", updateSale);
router.get("/get-items-from-group/:group_id", getItemFromGroup);

module.exports = router;
