const Item = require("../models/Item");
const Return = require("../models/Return");
const Vendor = require("../models/Vendor");

let getReturns = async (req, res) => {
  try {
    let returns = await Return.find();
    for (const returnObj of returns) {
      returnObj.item = await returnObj.getItem();
      returnObj.vendor = await returnObj.getVendor();
    }
    let items = await Item.find();
    let vendors = await Vendor.find();
    res.render("returns", { returns, items, vendors });
  } catch (err) {
    res.send(err.message);
  }
};

let addReturn = async (req, res) => {
  let items = await Item.find();
  let vendors = await Vendor.find();
  res.render("add-return", { addReturn, items, vendors });
};

let saveReturn = async (req, res) => {
  try {
    let returnObj = new Return(req.body);
    
    await returnObj.save();
    res.redirect("/returns");
  } catch (error) {
    
  }
};

let editReturn = async (req, res) => {
  let {id} = req.params;
  let returnObj = await Return.findById(id);
  let items = await Item.find();
  let vendors = await Vendor.find();
  
  res.render("edit-return", { returnObj, items, vendors });
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

module.exports = {
  getReturns,
  addReturn,
  saveReturn,
  editReturn,
  updateReturn,
  deleteReturn,
};
