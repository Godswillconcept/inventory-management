const Item = require("../models/Item");
const Repair = require("../models/Repair");
const Vendor = require("../models/Vendor");

let getRepairs = async (req, res) => {
  try {
    let repairs = await Repair.find();
    for (const repair of repairs) {
      repair.item = await repair.getItem();
      repair.vendor = await repair.getVendor();
    }
    let items = await Item.find();
    let vendors = await Vendor.find();
    res.render("repairs", { repairs, items, vendors });
  } catch (err) {
    res.send(err.message);
  }
};

let addRepair = async (req, res) => {
  let items = await Item.find();
  let vendors = await Vendor.find();
  res.render("add-repair", { addRepair, items, vendors });
};

let saveRepair = async (req, res) => {
  try {
    let repair = new Repair(req.body);
    
    await repair.save();
    res.redirect("/repairs");
  } catch (error) {
    
  }
};

let editRepair = async (req, res) => {
  let {id} = req.params;
  let repair = await Repair.findById(id);
  let items = await Item.find();
  let vendors = await Vendor.find();
  
  res.render("edit-repair", { repair, items, vendors });
};

let updateRepair = async (req, res) => {
  let { id } = req.params;
  try {
    let repair = await Repair.findById(id);
    repair.setProp(req.body);
    await repair.update();
    res.redirect("/repairs");
  } catch (error) {
    res.send(error.message);
  }
};

let deleteRepair = async (req, res) => {
  let { id } = req.params;
  await Repair.delete(id);
  res.redirect("/repairs");
};

module.exports = {
  getRepairs,
  addRepair,
  saveRepair,
  editRepair,
  updateRepair,
  deleteRepair,
};
