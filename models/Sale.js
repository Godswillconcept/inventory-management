const ItemOut = require("./ItemOut");

class Sale extends ItemOut {
  constructor(props = {}) {
    super({ ...props, mode: "Sale" });


  }
 
}

module.exports = Sale;
