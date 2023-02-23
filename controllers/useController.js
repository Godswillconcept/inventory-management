const Item = require("../models/Item");
const Use = require("../models/Use");
const User = require("../models/User");
const UseGroup = require("../models/UseGroup");
const ItemOut = require("../models/ItemOut");

let getUses = async (req, res) => {
  try {
    let use_groups = await UseGroup.find();
    for (const use_group of use_groups) {
      use_group.user = await use_group.getUser();
      use_group.uses = await use_group.getUses();
      use_group.uses_description = [];
      for (const use of use_group.uses) {
        use_group.uses_description.push(
          ` ${(await use.getItem()).name} (${use.quantity} unit)`
        );
        use_group.uses_description.join(", ");
      }
    }
    res.render("uses", { use_groups });
  } catch (err) {
    console.log(err);
    // res.send(err.message);
  }
};

let addUse = async (req, res) => {
  let items = await Item.find(["usage_mode", "Use"]);
  let users = await User.find();
  res.render("add-use", { addUse, items, users });
};

let editUse = async (req, res) => {
  let { id } = req.params;
  let use = await Use.findById(id);
  let items = await Item.find();
  let users = await User.find();
  res.render("edit-use", { use, items, users });
};

let saveUse = async (req, res) => {
  let { user_id, item_id, quantity, remark, date } = req.body;
  console.log("body = ", req.body); return
  if (!Array.isArray(item_id)) {
    item_id = [item_id];
    quantity = [quantity];
    remark = [remark];
  }
  try {
    var totalUsePrice = 0;
    let uses = [];
    for (let i = 0; i < item_id.length; i++) {
      let item = await Item.findById(item_id[i]);
      let selling_price = item.cost_price;
      let totalItemPrice = selling_price * quantity[i];
      uses.push(
        new Use({
          item_id: item.id,
          quantity: quantity[i],
          selling_price,
          remark: remark[i],
          date,
        })
      );
      totalUsePrice += totalItemPrice;
    }
    let use_group = new UseGroup({
      total_amount: totalUsePrice,
      buyer_id: user_id,
      date,
    });
    await use_group.save();
    for (const use of uses) {
      use.group_id = use_group.id;
      await use.save();
    }
    res.redirect("/uses");
  } catch (error) {
    console.log(error);
  }
};

let updateUse = async (req, res) => {
  let { id } = req.params;
  try {
    let use = await Use.findById(id);
    use.setProp(req.body);
    await use.update();
    res.redirect("/uses");
  } catch (error) {
    res.send(error.message);
  }
};

let deleteUse = async (req, res) => {
  let { id } = req.params;
  await Use.delete(id);
  res.redirect("/uses");
};

let getUsesFromGroup = async (req, res) => {
  let { group_id } = req.params;
  let ItemsOuts = await ItemOut.find(["group_id", group_id]);
  for (const itemOut of ItemsOuts) {
    itemOut.item = await Item.findById(itemOut.item_id);
  }
  res.json(ItemsOuts);
};

module.exports = {
  getUses,
  addUse,
  saveUse,
  editUse,
  updateUse,
  deleteUse,
  getUsesFromGroup,
};
