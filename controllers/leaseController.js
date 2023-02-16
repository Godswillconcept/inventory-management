const Item = require("../models/Item");
const Lease = require("../models/Lease");
const User = require("../models/User");
const LeaseGroup = require("../models/LeaseGroup");
const ItemOut = require("../models/ItemOut");

let getLeases = async (req, res) => {
  try {
    let lease_groups = await LeaseGroup.find();
    for (const lease_group of lease_groups) {
      lease_group.buyer = await lease_group.getUser();
      lease_group.leases = await lease_group.getLeases();
      lease_group.leases_description = [];
      for (const lease of lease_group.leases) {
        lease_group.leases_description.push(
          ` ${(await lease.getItem()).name} (${lease.quantity} unit)`
        );
        lease_group.leases_description.join(", ");
      }
    }
    res.render("leases", { lease_groups });
  } catch (err) {
    console.log(err);
    // res.send(err.message);
  }
};

let addLease = async (req, res) => {
  let items = await Item.find(["usage_mode", "Lease"]);
  let users = await User.find();
  res.render("add-lease", { addLease, items, users });
};

let editLease = async (req, res) => {
  let { id } = req.params;
  let lease = await Lease.findById(id);
  let items = await Item.find();
  let users = await User.find();
  res.render("edit-lease", { lease, items, users });
};

let saveLease = async (req, res) => {
  let { user_id, item_id, quantity, unit_cost, total_cost, remark, date } =
    req.body;
  if (!Array.isArray(item_id)) {
    item_id = [item_id];
    quantity = [quantity];
    unit_cost = [unit_cost];
    total_cost = [total_cost];
    remark = [remark];
  }
  try {
    var totalLeasePrice = 0;
    let leases = [];
    for (let i = 0; i < item_id.length; i++) {
      let item = await Item.findById(item_id[i]);
      let selling_price = item.selling_price;
      let totalItemPrice = selling_price * quantity[i];
      leases.push(
        new Lease({
          item_id: item.id,
          quantity: quantity[i],
          selling_price,
          total_cost: totalItemPrice,
          remark: remark[i],
          date,
        })
      );
      totalLeasePrice += totalItemPrice;
    }
    let lease_group = new LeaseGroup({
      total_amount: totalLeasePrice,
      buyer_id: user_id,
      date,
    });
    await lease_group.save();
    for (const lease of leases) {
      lease.group_id = lease_group.id;
      await lease.save();
    }
    res.redirect("/leases");
  } catch (error) {
    console.log(error);
  }
};

let updateLease = async (req, res) => {
  let { id } = req.params;
  try {
    let lease = await Lease.findById(id);
    lease.setProp(req.body);
    await lease.update();
    res.redirect("/leases");
  } catch (error) {
    res.send(error.message);
  }
};

let deleteLease = async (req, res) => {
  let { id } = req.params;
  await Lease.delete(id);
  res.redirect("/leases");
};

let getItemFromGroup = async (req, res) => {
  let { group_id } = req.params;
  let itemsOuts = await ItemOut.find(["group_id", group_id]);
  for (const itemOut of itemsOuts) {
    itemOut.item = await Item.findById(itemOut.item_id);
  }
  res.json(itemsOuts);
};
module.exports = {
  getLeases,
  addLease,
  saveLease,
  editLease,
  updateLease,
  deleteLease,
  getItemFromGroup,
};
