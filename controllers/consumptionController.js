const Item = require("../models/Item");
const Consumption = require("../models/Consumption");
const User = require("../models/User");
const ConsumptionGroup = require("../models/ConsumptionGroup");
const ItemOut = require("../models/ItemOut");

let getConsumptions = async (req, res) => {
  try {
    let consumption_groups = await ConsumptionGroup.find();
    for (const consumption_group of consumption_groups) {
      consumption_group.buyer = await consumption_group.getUser();
      consumption_group.consumptions = await consumption_group.getConsumptions();
      consumption_group.consumptions_description = [];
      for (const consumption of consumption_group.consumptions) {
        consumption_group.consumptions_description.push(
          ` ${(await consumption.getItem()).name} (${consumption.quantity} unit)`
        );
        consumption_group.consumptions_description.join(", ");
      }
    }
    res.render("consumptions", { consumption_groups });
  } catch (err) {
    console.log(err);
    // res.send(err.message);
  }
};

let addConsumption = async (req, res) => {
  let items = await Item.find(["usage_mode", "Use"]);
  let users = await User.find();
  res.render("add-consumption", { addConsumption, items, users });
};

let editConsumption = async (req, res) => {
  let { id } = req.params;
  let consumption = await Consumption.findById(id);
  let items = await Item.find();
  let users = await User.find();
  res.render("edit-consumption", { consumption, items, users });
};

let saveConsumption = async (req, res) => {
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
    var totalUsePrice = 0;
    let consumptions = [];
    for (let i = 0; i < item_id.length; i++) {
      let item = await Item.findById(item_id[i]);
      let selling_price = item.selling_price;
      let totalItemPrice = selling_price * quantity[i];
      consumptions.push(
        new Consumption({
          item_id: item.id,
          quantity: quantity[i],
          selling_price,
          total_cost: totalItemPrice,
          remark: remark[i],
          date,
        })
      );
      totalUsePrice += totalItemPrice;
    }
    let consumption_group = new ConsumptionGroup({
      total_amount: totalUsePrice,
      buyer_id: user_id,
      date,
    });
    await consumption_group.save();
    for (const consumption of consumptions) {
      consumption.group_id = consumption_group.id;
      await consumption.save();
    }
    res.redirect("/consumptions");
  } catch (error) {
    console.log(error);
  }
};

let updateConsumption = async (req, res) => {
  let { id } = req.params;
  try {
    let consumption = await Consumption.findById(id);
    consumption.setProp(req.body);
    await consumption.update();
    res.redirect("/consumptions");
  } catch (error) {
    res.send(error.message);
  }
};

let deleteConsumption = async (req, res) => {
  let { id } = req.params;
  await Consumption.delete(id);
  res.redirect("/consumptions");
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
  getConsumptions,
  addConsumption,
  saveConsumption,
  editConsumption,
  updateConsumption,
  deleteConsumption,
  getItemFromGroup
};
