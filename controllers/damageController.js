const Item = require("../models/Item");
const Damage = require("../models/Damage");
const User = require("../models/User");
const DamageGroup = require("../models/DamageGroup");
const ItemOut = require("../models/ItemOut");

let getDamages = async (req, res) => {
  try {
    let damage_groups = await DamageGroup.find();
    for (const damage_group of damage_groups) {
      damage_group.destroyer = await damage_group.getUser();
      damage_group.damages = await damage_group.getDamages();
      damage_group.damages_description = [];
      for (const damage of damage_group.damages) {
        damage_group.damages_description.push(
          ` ${(await damage.getItem()).name} (${damage.quantity} unit)`
        );
        damage_group.damages_description.join(", ");
      }
    }
    res.render("damages", { damage_groups });
  } catch (err) {
    console.log(err);
    // res.send(err.message);
  }
};

let addDamage = async (req, res) => {
  let items = await Item.find();
  let users = await User.find();
  res.render("add-damage", { addDamage, items, users });
};

let editDamage = async (req, res) => {
  let { id } = req.params;
  let damage = await Damage.findById(id);
  let items = await Item.find();
  let users = await User.find();
  res.render("edit-damage", { damage, items, users });
};

let saveDamage = async (req, res) => {
  let { user_id, item_id, quantity, remark, date } =
    req.body;
    // console.log(req.body);return
  if (!Array.isArray(item_id)) {
    item_id = [item_id];
    quantity = [quantity];
    unit_cost = [unit_cost];
    total_cost = [total_cost];
    remark = [remark];
  }
  try {
    var totalDamagePrice = 0;
    let damages = [];
    for (let i = 0; i < item_id.length; i++) {
      let item = await Item.findById(item_id[i]);
      let selling_price = item.cost_price;
      let totalItemPrice = selling_price * quantity[i];
      damages.push(
        new Damage({
          item_id: item.id,
          quantity: quantity[i],
          selling_price,
          remark: remark[i],
          date,
        })
      );
      totalDamagePrice += totalItemPrice;
    }
    let damage_group = new DamageGroup({
      total_amount: totalDamagePrice,
      buyer_id: user_id,
      date,
    });
    await damage_group.save();
    for (const damage of damages) {
      damage.group_id = damage_group.id;
      await damage.save();
    }
    res.redirect("/damages");
  } catch (error) {
    console.log(error);
  }
};

let updateDamage = async (req, res) => {
  let { id } = req.params;
  try {
    let damage = await Damage.findById(id);
    damage.setProp(req.body);
    await damage.update();
    res.redirect("/damages");
  } catch (error) {
    res.send(error.message);
  }
};

let deleteDamage = async (req, res) => {
  let { id } = req.params;
  await Damage.delete(id);
  res.redirect("/damages");
};

let getDamagesFromGroup = async (req, res) => {
  let { group_id } = req.params;
  let ItemsOuts = await ItemOut.find(["group_id", group_id]);
  for (const itemOut of ItemsOuts) {
    itemOut.item = await Item.findById(itemOut.item_id);
  }
  res.json(ItemsOuts);
};


module.exports = {
  getDamages,
  addDamage,
  saveDamage,
  editDamage,
  updateDamage,
  deleteDamage,
  getDamagesFromGroup
};
