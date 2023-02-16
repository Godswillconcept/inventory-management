const isAjax = require("../helpers/isAjax");
const Item = require("../models/Item");
const Vendor = require("../models/Vendor");
const User = require("../models/User");
const Supply = require("../models/Supply");
const Sale = require("../models/Sale");
const SaleGroup = require("../models/SaleGroup");
const Damage = require("../models/Damage");
const Consumption = require("../models/Consumption");
const conn = require("../models/connection");

let getItems = async (req, res) => {
  try {
    let items = await Item.find();
    res.render("items", { items });
  } catch (err) {
    res.render(err.message);
  }
};

let addItem = async (req, res) => {
  res.render("add-item", { addItem });
};

let editItem = async (req, res) => {
  let { id } = req.params;
  let item = await Item.findById(id);
  res.render("edit-item", { item });
};

let saveItem = async (req, res) => {
  try {
    let {
      name,
      description,
      model,
      brand,
      manufacturer,
      usage_mode,
      cost_price,
      useful_life,
      manufacture_date,
      procurement_date,
      color,
      serial_number,
      type,
      selling_price,
    } = req.body;

    if (req.files) {
      let file = req.files.photo;
      var fileName =
        Number(new Date()).toString(32) +
        Math.random().toString().slice(2) +
        "." +
        file.name.split(".").pop();

      file.mv("./uploads/items/" + fileName, function (err) {
        if (err) {
          res.send(err);
        } else {
        }
      });
    }
    let item = new Item({
      name,
      description,
      model,
      brand,
      manufacturer,
      usage_mode,
      cost_price,
      useful_life,
      manufacture_date,
      procurement_date,
      color,
      serial_number,
      type,
      selling_price,
      photo: fileName,
    });

    await item.save();
    if (isAjax(req)) res.json(item);
    else res.redirect("/items");
    console.log("Item saved successfully!");
  } catch (error) {
    console.log(error);
  }
};

let updateItem = async (req, res) => {
  let { id } = req.params;
  try {
    let {
      name,
      description,
      model,
      brand,
      manufacturer,
      usage_mode,
      cost_price,
      useful_life,
      manufacture_date,
      procurement_date,
      color,
      serial_number,
      type,
      price,
    } = req.body;
    if (req.files) {
      let file = req.files.photo;
      var fileName =
        Number(new Date()).toString(32) +
        Math.random().toString().slice(2) +
        "." +
        file.name.split(".").pop();

      file.mv("./uploads/items/" + fileName, function (err) {
        if (err) {
          res.send(err);
        } else {
          console.log("Image Uploaded Successfully!");
        }
      });
    }
    let item = await Item.findById(id);
    item.setProp({
      name,
      description,
      model,
      brand,
      manufacturer,
      usage_mode,
      cost_price,
      useful_life,
      manufacture_date,
      procurement_date,
      color,
      serial_number,
      type,
      price,
      photo: fileName,
    });
    await item.update();
    res.redirect("/items");
    console.log("Item updated successfully!");
  } catch (error) {
    res.send(error.message);
  }
};

let deleteItem = async (req, res) => {
  let { id } = req.params;
  await Item.delete(id);
  res.redirect("/items");
  console.log("Item deleted successfully!");
};

let setPrice = (req, res) => {
  try {
    let { selling_price, item_id } = req.body;
    let sql = "UPDATE items SET selling_price = ? WHERE id = ?";
    let values = [selling_price, item_id];
    try {
      conn.query(sql, values, function (err, result, fields) {
        try {
          console.log("err = ", err, "result = ", result, "fields = ", fields);
          if (err) {
            console.log(result);
            res.json({
              code: 0,
              error:
                "Oops! you may have to check back as the selling_price could not be set at the moment. Apologies.",
            });
          } else {
            res.json({ code: 1, message: "selling_price set successfully" });
          }
        } catch (error) {}
      });
    } catch (error) {
      console.log(error);
    }
    res.json({ code: 1, message: "selling_price set successfully" });
  } catch (error) {
    console.error(error);
    res.json({
      code: -1,
      error:
        "Aww Snap! We're currently going through some maintenance and hence some features may not work properly.",
    });
  }
};

let itemDetail = async (req, res) => {
  let { id } = req.params;
  let item = await Item.findById(id);
  item.supplies = await Supply.find(["item_id", item.id]);
  item.damages = await Damage.find(["item_id", item.id]);
  item.consumptions = await Consumption.find(["item_id", item.id]);
  item.sales = await Sale.find(["item_id", item.id]);
  for (const supply of item.supplies) {
    supply.item = await supply.getItem();
    supply.vendor = await supply.getVendor();
  }

  for (const sale of item.sales) {
    sale.item = await sale.getItem();
  }

  // for (const sale_group of item.sale_groups) {
  //   sale_group.user = await sale_group.getUser();
  // }

  for (const damage of item.damages) {
    damage.item = await damage.getItem();
  }

  // for (const damage_group of item.damage_groups) {
  //   damage_group.user = await damage_group.getUser();
  // }

  for (const consumption of item.consumptions) {
    consumption.item = await consumption.getItem();
  }
  // for (const consumption_group of item.consumption_groups) {
  //   consumption_group.user = await consumption_group.getUser();
  // }

  let vendors = await Vendor.find();
  let users = await User.find();

  res.render("item", { item, vendors, users });
};

module.exports = {
  getItems,
  addItem,
  saveItem,
  editItem,
  updateItem,
  deleteItem,
  itemDetail,
  setPrice,
};
