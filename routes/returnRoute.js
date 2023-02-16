const express = require("express");
var router = express.Router();
const {
  getReturns,
  addReturn,
  saveReturn,
  editReturn,
  updateReturn,
  deleteReturn,
} = require("../controllers/returnController");

// return routes
router.get("/returns", getReturns);
router.get("/add-return", addReturn);
router.post("/add-return", saveReturn);
router.get("/return/:id/update", editReturn);
router.post("/return/:id/update", updateReturn);
router.get("/return/:id/delete", deleteReturn);

module.exports = router;
