const ItemIn = require("./ItemIn");

class Supply extends ItemIn {
  constructor(prop = {}) {
    super({ ...prop, mode: "Supply", item_out_id: null });
  }
}
module.exports = Supply;
