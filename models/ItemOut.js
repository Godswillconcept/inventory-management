const Item = require("./Item");
const Model = require("./Model");

class ItemOut extends Model {
  constructor(obj = {}) {
    super(obj);
  }

  static get tableName() {
    return "item_outs";
  }


  async getItem() {
    return await Item.findById(this.item_id);
  }
}

module.exports = ItemOut;
