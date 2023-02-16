const ItemOut = require("./ItemOut");

class Lease extends ItemOut {
  constructor(props = {}) {
    super({ ...props, mode: "Lease" });
  }
}

module.exports = Lease;
