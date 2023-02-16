const Item = require("./Item");
const Vendor = require("./Vendor");
const Model = require("./Model");

class ItemIn extends Model {
  constructor(obj = {}) {
    super(obj);
  }

  static get tableName() {
    return "item_ins";
  }

  static get classField() {
    return `mode = '${this.name}'`;
  }

  async getItem() {
    return await Item.findById(this.item_id);
  }
  async getVendor() {
    return await Vendor.findById(this.vendor_id);
  }

 
}

module.exports = ItemIn;
