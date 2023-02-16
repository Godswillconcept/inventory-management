const Item = require("../models/Item");
const Supply = require("../models/Supply");
const Vendor = require("../models/Vendor");

let getSupplies = async (req, res) => {
  try {
    let supplies = await Supply.find();
    for (const supply of supplies) {
      supply.item = await supply.getItem();
      supply.vendor = await supply.getVendor();
    }
    let items = await Item.find();
    let vendors = await Vendor.find();
    res.render("supplies", { supplies, items, vendors });
  } catch (err) {
    res.send(err.message);
  }
};

let addSupply = async (req, res) => {
  let items = await Item.find();
  let vendors = await Vendor.find();
  res.render("add-supply", { addSupply, items, vendors });
};

let saveSupply = async (req, res) => {
  try {
    let supply = new Supply(req.body);    
    await supply.save();
    console.log(supply);
    if (req.headers.referer.endsWith('/details')) res.redirect('back');
    else res.redirect("/supplies");
  } catch (error) {
    console.log(error);
  }
};

let editSupply = async (req, res) => {
  let {id} = req.params;
  let supply = await Supply.findById(id);
  let items = await Item.find();
  let vendors = await Vendor.find();
  
  res.render("edit-supply", { supply, items, vendors });
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

module.exports = {
  getSupplies,
  addSupply,
  saveSupply,
  editSupply,
  updateSupply,
  deleteSupply,
};
