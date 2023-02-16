const isAjax = require("../helpers/isAjax");
const Vendor = require("../models/Vendor");

let getVendors = async (req, res) => {
  try {
    let vendors = await Vendor.find();
    res.render("vendors", { vendors });
  } catch (err) {
    res.render(err.message);
  }
};

let addVendor = async (req, res) => {
  res.render("add-vendor", { addVendor });
};

let editVendor = async (req, res) => {
  let { id } = req.params;
  let vendor = await Vendor.findById(id);

  res.render("edit-vendor", { vendor });
};

let saveVendor = async (req, res) => {
  try {
    let { name, address, email, phone } = req.body;
    if (req.files) {
      let file = req.files.photo;
      var fileName =
        Number(new Date()).toString(32) +
        Math.random().toString().slice(2) +
        "." +
        file.name.split(".").pop();

      file.mv("./uploads/vendors/" + fileName, function (err) {
        if (err) {
          res.send(err);
        } else {
        }
      });
    }
    let vendor = new Vendor({ name, address, email, phone, photo: fileName });
    await vendor.save();
    if (isAjax(req)) res.json(vendor);
    else res.redirect("/vendors");
  } catch (error) {}
};



let updateVendor = async (req, res) => {
  let { id } = req.params;
  try {
    let { name, address, email, phone } = req.body;
    if (req.files) {
      let file = req.files.photo;
      var fileName =
        Number(new Date()).toString(32) +
        Math.random().toString().slice(2) +
        "." +
        file.name.split(".").pop();

      file.mv("./uploads/vendors/" + fileName, function (err) {
        if (err) {
          res.send(err);
        } else {
          console.log('Image Uploaded Successfully!');
        }
      });
    }
    let vendor = await Vendor.findById(id);
    vendor.setProp({ name, address, email, phone, photo: fileName });
    await vendor.update();
    res.redirect("/vendors");
  } catch (error) {
    res.send(error.message);
  }
};

let deleteVendor = async (req, res) => {
  let { id } = req.params;
  await Vendor.delete(id);
  res.redirect("/vendors");
};

let vendorDetail = async (req, res) => {
  let { id } = req.params;
  let vendor = await Vendor.findById(id);

  res.render("vendor", { vendor });
};

module.exports = {
  getVendors,
  addVendor,
  saveVendor,
  editVendor,
  updateVendor,
  deleteVendor,
  vendorDetail,
};
