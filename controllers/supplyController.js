const Item = require("../models/Item");
const Supply = require("../models/Supply");
const Vendor = require("../models/Vendor");
const SupplyGroup = require("../models/SupplyGroup");
const ItemIn = require("../models/ItemIn");

let getSupplies = async (req, res) => {
  try {
    let supply_groups = await SupplyGroup.find();
    for (const supply_group of supply_groups) {
      supply_group.seller = await supply_group.getVendor();
      supply_group.supplies = await supply_group.getSupplies();
      supply_group.supplies_description = [];
      for (const supply of supply_group.supplies) {
        supply_group.supplies_description.push(
          ` ${(await supply.getItem()).name} (${supply.quantity} unit)`
        );
        supply_group.supplies_description.join(", ");
      }
    }
    res.render("supplies", { supply_groups });
  } catch (err) {
    console.log(err);
    // res.send(err.message);
  }
};

let addSupply = async (req, res) => {
  let items = await Item.find();
  let vendors = await Vendor.find();
  res.render("add-supply", { addSupply, items, vendors });
};

let editSupply = async (req, res) => {
  let { id } = req.params;
  let supply = await Supply.findById(id);
  let items = await Item.find();
  let vendors = await Vendor.find();
  res.render("edit-supply", { supply, items, vendors });
};

let saveSupply = async (req, res) => {
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
    var totalSupplyPrice = 0;
    let supplies = [];
    for (let i = 0; i < item_id.length; i++) {
      let totalItemPrice = price[i] * quantity[i];
      supplies.push(
        new Supply({
          item_id: item_id[i],
          quantity: quantity[i],
          price: price[i],
          remark: remark[i],
          date,
        })
      );
      totalSupplyPrice += totalItemPrice;
    }
    let supply_group = new SupplyGroup({
      total_amount: totalSupplyPrice,
      vendor_id,
      date,
    });
    await supply_group.save();
    for (const supply of supplies) {
      supply.group_id = supply_group.id;
      await supply.save();
    }
    res.redirect("/supplies");
  } catch (error) {
    console.log(error);
  }
};

let updateSupply = async (req, res) => {
  let { id } = req.params;
  try {
    let supply = await Supply.findById(id);
    supply.setProp(req.body);
    await supply.update();
    res.redirect("/supplies");
  } catch (error) {
    res.send(error.message);
  }
};

let deleteSupply = async (req, res) => {
  let { id } = req.params;
  await Supply.delete(id);
  res.redirect("/supplies");
};

let getSuppliesFromGroup = async (req, res) => {
  let { group_id } = req.params;
  let ItemsIns = await ItemIn.find(["group_id", group_id]);
  for (const itemIn of ItemsIns) {
    itemIn.item = await Item.findById(itemIn.item_id);
  }
  res.json(ItemsIns);
};
module.exports = {
  getSupplies,
  addSupply,
  saveSupply,
  editSupply,
  updateSupply,
  deleteSupply,
  getSuppliesFromGroup,
};
