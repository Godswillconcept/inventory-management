const ItemOut = require("./ItemOut");
const Model = require("./Model");
const User = require("./User");

class ItemOutGroup extends Model {
  constructor(obj = {}) {
    super(obj);
    
  }

  static get tableName() {
    return "item_out_groups";
  }

  static get classField() {
    return `mode = '${this.name}'`;
  }

  async getUser() {
    return await User.findById(this.buyer_id);
  }
 

  async getItemOuts() {
    return await ItemOut.find(["group_id", this.id]);
  }
}

module.exports = ItemOutGroup;
