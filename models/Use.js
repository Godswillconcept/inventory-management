const ItemOut = require("./ItemOut");

class Use extends ItemOut {
  constructor(props = {}) {
    super({ ...props, mode: "Use" });
  }
}

module.exports = Use;
