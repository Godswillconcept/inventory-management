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


  async getItem() {
    return await Item.findById(this.item_id);
  }

 
}

module.exports = ItemIn;
