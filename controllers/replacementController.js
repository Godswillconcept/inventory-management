const Item = require("../models/Item");
const Replacement = require("../models/Replacement");
const Vendor = require("../models/Vendor");

let getReplacements = async (req, res) => {
  try {
    let replacements = await Replacement.find();
    for (const replacement of replacements) {
      replacement.item = await replacement.getItem();
      replacement.vendor = await replacement.getVendor();
    }
    let items = await Item.find();
    let vendors = await Vendor.find();
    res.render("replacements", { replacements, items, vendors });
  } catch (err) {
    res.send(err.message);
  }
};

let addReplacement = async (req, res) => {
  let items = await Item.find();
  let vendors = await Vendor.find();
  res.render("add-replacement", { addReplacement, items, vendors });
};

let saveReplacement = async (req, res) => {
  try {
    let replacement = new Replacement(req.body);
    
    await replacement.save();
    res.redirect("/replacements");
  } catch (error) {
    
  }
};

let editReplacement = async (req, res) => {
  let { id } = req.params;
  let replacement = await Replacement.findById(id);
  let items = await Item.find();
  let vendors = await Vendor.find();
  
  res.render("edit-replacement", { replacement, items, vendors });
};

let updateReplacement = async (req, res) => {
  let { id } = req.params;
  try {
    let replacement = await Replacement.findById(id);
    replacement.setProp(req.body);
    await replacement.update();
    res.redirect("/replacements");
  } catch (error) {
    res.send(error.message);
  }
};

let deleteReplacement = async (req, res) => {
  let { id } = req.params;
  await Replacement.delete(id);
  res.redirect("/replacements");
};

module.exports = {
  getReplacements,
  addReplacement,
  saveReplacement,
  editReplacement,
  updateReplacement,
  deleteReplacement,
};
