const ItemOut = require("./ItemOut");

class Consumption extends ItemOut {
  constructor(props = {}) {
    super({ ...props, mode: "Consumption" });
  }

}

module.exports = Consumption;
