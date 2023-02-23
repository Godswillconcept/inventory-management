const Item = require("../models/Item");
const Return = require("../models/Return");
const Vendor = require("../models/Vendor");
const ReturnGroup = require("../models/ReturnGroup");
const ItemIn = require("../models/ItemIn");

let getReturns = async (req, res) => {
  try {
    let return_groups = await ReturnGroup.find();
    for (const return_group of return_groups) {
      return_group.returnee = await return_group.getVendor();
      return_group.returns = await return_group.getReturns();
      return_group.returns_description = [];
      for (const returnObj of return_group.returns) {
        return_group.returns_description.push(
          ` ${(await returnObj.getItem()).name} (${returnObj.quantity} unit)`
        );
        return_group.returns_description.join(", ");
      }
    }
    res.render("returns", { return_groups });
  } catch (err) {
    console.log(err);
    // res.send(err.message);
  }
};

let addReturn = async (req, res) => {
  let items = await Item.find(["usage_mode", "Lease"]);
  let vendors = await Vendor.find();
  res.render("add-return", { addReturn, items, vendors });
};

let editReturn = async (req, res) => {
  let { id } = req.params;
  let returnObj = await Return.findById(id);
  let items = await Item.find();
  let vendors = await Vendor.find();
  res.render("edit-return", { returnObj, items, vendors });
};

let saveReturn = async (req, res) => {
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
    var totalReturnPrice = 0;
    let returns = [];
    for (let i = 0; i < item_id.length; i++) {
      let item = await Item.findById(item_id[i]);
      let price = item.price;
      let totalItemPrice = price * quantity[i];
      returns.push(
        new Return({
          item_id: item.id,
          quantity: quantity[i],
          price,
          total_cost: totalItemPrice,
          remark: remark[i],
          date,
        })
      );
      totalReturnPrice += totalItemPrice;
    }
    let return_group = new ReturnGroup({
      total_amount: totalReturnPrice,
      returnee_id: vendor_id,
      date,
    });
    await return_group.save();
    for (const returnObj of returns) {
      returnObj.group_id = return_group.id;
      await returnObj.save();
    }
    res.redirect("/returns");
  } catch (error) {
    console.log(error);
  }
};

let updateReturn = async (req, res) => {
  let { id } = req.params;
  try {
    let returnObj = await Return.findById(id);
    returnObj.setProp(req.body);
    await returnObj.update();
    res.redirect("/returns");
  } catch (error) {
    res.send(error.message);
  }
};

let deleteReturn = async (req, res) => {
  let { id } = req.params;
  await Return.delete(id);
  res.redirect("/returns");
};

let getItemFromGroup = async (req, res) => {
  let { group_id } = req.params;
  let ItemsIns = await ItemIn.find(["group_id", group_id]);
  for (const itemIn of ItemsIns) {
    itemIn.item = await Item.findById(itemIn.item_id);
  }
  res.json(ItemsIns);
};
module.exports = {
  getReturns,
  addReturn,
  saveReturn,
  editReturn,
  updateReturn,
  deleteReturn,
  getItemFromGroup,
};
