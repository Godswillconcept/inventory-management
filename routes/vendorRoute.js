const express = require('express');
var router = express.Router();
const { getVendors, addVendor, saveVendor, editVendor, updateVendor, deleteVendor, vendorDetail } = require("../controllers/vendorController");

// Vendor routes
router.get("/vendors", getVendors);
router.get("/add-vendor", addVendor);
router.post("/add-vendor", saveVendor);
router.get("/vendor/:id/update", editVendor);
router.post("/vendor/:id/update", updateVendor);
router.get("/vendor/:id/delete", deleteVendor);
router.get("/vendor/:id/details", vendorDetail);

module.exports = router;