const Item = require("../models/Item");
const Donation = require("../models/Donation");
const Vendor = require("../models/Vendor");
const DonationGroup = require("../models/DonationGroup");
const ItemIn = require("../models/ItemIn");

let getDonations = async (req, res) => {
  try {
    let donation_groups = await DonationGroup.find();
    for (const donation_group of donation_groups) {
      donation_group.donor = await donation_group.getVendor();
      donation_group.donations = await donation_group.getDonations();
      donation_group.donations_description = [];
      for (const donation of donation_group.donations) {
        donation_group.donations_description.push(
          ` ${(await donation.getItem()).name} (${donation.quantity} unit)`
        );
        donation_group.donations_description.join(", ");
      }
    }
    res.render("donations", { donation_groups });
  } catch (err) {
    console.log(err);
    // res.send(err.message);
  }
};

let addDonation = async (req, res) => {
  let items = await Item.find();
  let vendors = await Vendor.find();
  res.render("add-donation", { addDonation, items, vendors });
};

let editDonation = async (req, res) => {
  let { id } = req.params;
  let donation = await Donation.findById(id);
  let items = await Item.find();
  let vendors = await Vendor.find();
  res.render("edit-donation", { donation, items, vendors });
};

let saveDonation = async (req, res) => {
  let { vendor_id, item_id, quantity, price, total_cost, remark, date } =
    req.body;
  if (!Array.isArray(item_id)) {
    item_id = [item_id];
    quantity = [quantity];
    price = [price];
    total_cost = [total_cost];
    remark = [remark];
  }
  try {
    var totalDonationPrice = 0;
    let donations = [];
    for (let i = 0; i < item_id.length; i++) {
      let totalItemPrice = price[i] * quantity[i];
      donations.push(
        new Donation({
          item_id: item_id[i],
          quantity: quantity[i],
          price: price[i],
          remark: remark[i],
          date,
        })
      );
      totalDonationPrice += totalItemPrice;
    }
    let donation_group = new DonationGroup({
      total_amount: totalDonationPrice,
      vendor_id,
      date,
    });
    await donation_group.save();
    for (const donation of donations) {
      donation.group_id = donation_group.id;
      await donation.save();
    }
    res.redirect("/donations");
  } catch (error) {
    console.log(error);
  }
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

let getDonationsFromGroup = async (req, res) => {
  let { group_id } = req.params;
  let itemsIns = await ItemIn.find(["group_id", group_id]);
  for (const itemIn of itemsIns) {
    itemIn.item = await Item.findById(itemIn.item_id);
  }
  res.json(itemsIns);
};
module.exports = {
  getDonations,
  addDonation,
  saveDonation,
  editDonation,
  updateDonation,
  deleteDonation,
  getDonationsFromGroup,
};
