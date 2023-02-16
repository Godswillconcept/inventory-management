const Item = require("../models/Item");
const Sale = require("../models/Sale");
const User = require("../models/User");
const SaleGroup = require("../models/SaleGroup");
const ItemOut = require("../models/ItemOut");

let getSales = async (req, res) => {
  try {
    let sale_groups = await SaleGroup.find();
    for (const sale_group of sale_groups) {
      sale_group.buyer = await sale_group.getUser();
      sale_group.sales = await sale_group.getSales();
      sale_group.sales_description = [];
      for (const sale of sale_group.sales) {
        sale_group.sales_description.push(
          ` ${(await sale.getItem()).name} (${sale.quantity} unit)`
        );
        sale_group.sales_description.join(", ");
      }
    }
    res.render("sales", { sale_groups });
  } catch (err) {
    console.log(err);
    // res.send(err.message);
  }
};

let addSale = async (req, res) => {
  let items = await Item.find(["usage_mode", "Sale"]);
  let users = await User.find();
  res.render("add-sale", { addSale, items, users });
};

let editSale = async (req, res) => {
  let { id } = req.params;
  let sale = await Sale.findById(id);
  let items = await Item.find();
  let users = await User.find();
  res.render("edit-sale", { sale, items, users });
};

let saveSale = async (req, res) => {
  let { user_id, item_id, quantity, unit_cost, total_cost, remark, date } =
    req.body;
  if (!Array.isArray(item_id)) {
    item_id = [item_id];
    quantity = [quantity];
    unit_cost = [unit_cost];
    total_cost = [total_cost];
    remark = [remark];
  }
  try {
    var totalSalePrice = 0;
    let sales = [];
    for (let i = 0; i < item_id.length; i++) {
      let item = await Item.findById(item_id[i]);
      let selling_price = item.selling_price;
      let totalItemPrice = selling_price * quantity[i];
      sales.push(
        new Sale({
          item_id: item.id,
          quantity: quantity[i],
          selling_price,
          total_cost: totalItemPrice,
          remark: remark[i],
          date,
        })
      );
      totalSalePrice += totalItemPrice;
    }
    let sale_group = new SaleGroup({
      total_amount: totalSalePrice,
      buyer_id: user_id,
      date,
    });
    await sale_group.save();
    for (const sale of sales) {
      sale.group_id = sale_group.id;
      await sale.save();
    }
    res.redirect("/sales");
  } catch (error) {
    console.log(error);
  }
};

let updateSale = async (req, res) => {
  let { id } = req.params;
  try {
    let sale = await Sale.findById(id);
    sale.setProp(req.body);
    await sale.update();
    res.redirect("/sales");
  } catch (error) {
    res.send(error.message);
  }
};

let deleteSale = async (req, res) => {
  let { id } = req.params;
  await Sale.delete(id);
  res.redirect("/sales");
};

let getItemFromGroup = async (req, res) => {
  let { group_id } = req.params;
  let itemsOuts = await ItemOut.find(["group_id", group_id]);
  for (const itemOut of itemsOuts) {
    itemOut.item = await Item.findById(itemOut.item_id);
  }
  res.json(itemsOuts);
};
module.exports = {
  getSales,
  addSale,
  saveSale,
  editSale,
  updateSale,
  deleteSale,
  getItemFromGroup,
};
