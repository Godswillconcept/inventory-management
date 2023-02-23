const User = require("../models/User");
const bcrypt = require("bcrypt");
const isAjax = require("../helpers/isAjax");

let getUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.render("users", { users });
  } catch (err) {
    res.render(err.message);
  }
};

let addUser = async (req, res) => {
  res.render("add-user", { addUser });
};

let editUser = async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id);
  res.render("edit-user", { user });
};

let saveUser = async (req, res) => {
  try {
    let {
      first_name,
      last_name,
      username,
      email,
      address,
      password,
      phone,
      gender,
      dob,
    } = req.body;
    let hash = await bcrypt.hash(password, 13);
    if (req.files) {
      let file = req.files.photo;
      var fileName =
        Number(new Date()).toString(32) +
        Math.random().toString().slice(2) +
        "." +
        file.name.split(".").pop();
      file.mv("./uploads/users/" + fileName, function (err) {
        if (err) {
          res.send(err);
        } else {
          console.log("User Saved Successfully");
        }
      });
    }
    let user = new User({
      first_name,
      last_name,
      username,
      email,
      address,
      password: hash,
      phone,
      gender,
      dob,
      photo: fileName,
    });
    await user.save();
    if (isAjax(req)) res.json(user);
    else res.redirect("/users");
  } catch (error) {
    res.send(err);
  }
};

let updateUser = async (req, res) => {
  let { id } = req.params;
  try {
    let {
      first_name,
      last_name,
      username,
      email,
      address,
      password,
      phone,
      gender,
      dob,
    } = req.body;
    let hash = await bcrypt.hash(password, 13);
    if (req.files) {
      let file = req.files.photo;
      var fileName =
        Number(new Date()).toString(32) +
        Math.random().toString().slice(2) +
        "." +
        file.name.split(".").pop();
      file.mv("./uploads/users/" + fileName, function (err) {
        if (err) {
          res.send(err);
        } else {
          console.log("image uploaded!");
        }
      });
    }
    let user = await User.findById(id);
    user.setProp({
      first_name,
      last_name,
      username,
      email,
      address,
      password: hash,
      phone,
      gender,
      dob,
      photo: fileName,
    });
    // console.log(user); return
    await user.update();
    res.redirect("/users");
  } catch (error) {
    res.send(error.message);
  }
};

let deleteUser = async (req, res) => {
  let { id } = req.params;
  await User.delete(id);
  res.redirect("/users");
};

let userDetail = async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id);

  res.render("user", { user });
};

module.exports = {
  getUsers,
  addUser,
  saveUser,
  editUser,
  updateUser,
  deleteUser,
  userDetail,
};
