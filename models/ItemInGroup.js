const ItemIn = require("./ItemIn");
const Model = require("./Model");
const Vendor = require("./Vendor");

class ItemInGroup extends Model {
  constructor(obj = {}) {
    super(obj);
    
  }

  static get tableName() {
    return "item_in_groups";
  }

  static get classField() {
    
    return `mode = '${this.name}'`;
  }

  async getVendor() {
    return await Vendor.findById(this.vendor_id);
  }
 

  async getItemIns() {
    return await ItemIn.find(["group_id", this.id]);
  }
}

module.exports = ItemInGroup;
