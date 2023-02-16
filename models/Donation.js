const ItemIn = require("./ItemIn");

class Donation extends ItemIn {
  constructor(prop = {}) {
    super({ ...prop, mode: "Donation", item_out_id: null });
  }

  
}
module.exports = Donation;
