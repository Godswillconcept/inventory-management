const express = require("express");
var router = express.Router();
const {
  getItems,
  addItem,
  saveItem,
  editItem,
  updateItem,
  deleteItem,
  itemDetail,
  setPrice,
  itemSupply,
} = require("../controllers/itemController");

// item routes
router.get("/items", getItems);
router.get("/add-item", addItem);
router.post("/add-item", saveItem);
router.get("/item/:id/update", editItem);
router.post("/item/:id/update", updateItem);
router.get("/item/:id/delete", deleteItem);
router.get("/item/:id/details", itemDetail);
router.post("/item/:id/price", setPrice);

module.exports = router;
