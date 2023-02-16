const ItemOut = require("./ItemOut");

class Damage extends ItemOut {
  constructor(props = {}) {
    super({ ...props, mode: "Damage" });
  }
 
}

module.exports = Damage;
