const Item = require("../models/Item");
const Donation = require("../models/Donation");
const Vendor = require("../models/Vendor");

let getDonations = async (req, res) => {
  try {
    let donations = await Donation.find();
    for (const donation of donations) {
      donation.item = await donation.getItem();
      donation.vendor = await donation.getVendor();
    }
    let items = await Item.find();
    let vendors = await Vendor.find();
    res.render("donations", { donations, items, vendors });
  } catch (err) {
    res.send(err.message);
  }
};

let addDonation = async (req, res) => {
  let items = await Item.find();
  let vendors = await Vendor.find();
  res.render("add-donation", { addDonation, items, vendors });
};

let saveDonation = async (req, res) => {
  try {
    let donation = new Donation(req.body);
    
    await donation.save();
    res.redirect("/donations");
  } catch (error) {
    
  }
};

let editDonation = async (req, res) => {
  let {id} = req.params;
  let donation = await Donation.findById(id);
  let items = await Item.find();
  let vendors = await Vendor.find();
  
  res.render("edit-donation", { donation, items, vendors });
};

let updateDonation = async (req, res) => {
  let { id } = req.params;
  try {
    let donation = await Donation.findById(id);
    donation.setProp(req.body);
    await donation.update();
    res.redirect("/donations");
  } catch (error) {
    res.send(error.message);
  }
};

let deleteDonation = async (req, res) => {
  let { id } = req.params;
  await Donation.delete(id);
  res.redirect("/donations");
};

module.exports = {
  getDonations,
  addDonation,
  saveDonation,
  editDonation,
  updateDonation,
  deleteDonation,
};
