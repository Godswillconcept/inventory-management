const ItemIn = require("./ItemIn");

class Return extends ItemIn {
  constructor(prop = {}) {
    super({ ...prop, mode: "Return", });
  }

 
}
module.exports = Return;

