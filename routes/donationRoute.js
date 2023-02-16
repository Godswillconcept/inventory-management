const express = require("express");
var router = express.Router();
const {
  getDonations,
  addDonation,
  saveDonation,
  editDonation,
  updateDonation,
  deleteDonation,
} = require("../controllers/donationController");

// donation routes
router.get("/donations", getDonations);
router.get("/add-donation", addDonation);
router.post("/add-donation", saveDonation);
router.get("/donation/:id/update", editDonation);
router.post("/donation/:id/update", updateDonation);
router.get("/donation/:id/delete", deleteDonation);

module.exports = router;
