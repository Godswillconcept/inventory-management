const express = require('express');
var router = express.Router();
const { getUsers, addUser, saveUser, editUser, updateUser, deleteUser, userDetail } = require("../controllers/userController");

// user routes
router.get("/users", getUsers);
router.get("/add-user", addUser);
router.post("/add-user", saveUser);
router.get("/user/:id/update", editUser);
router.post("/user/:id/update", updateUser);
router.get("/user/:id/delete", deleteUser);
router.get("/user/:id/details", userDetail);

module.exports = router;