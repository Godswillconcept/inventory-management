const ItemOutGroup = require("./ItemOutGroup");
const User = require("./User");

class DamageGroup extends ItemOutGroup {
  constructor(props = {}) {
    super({ ...props, mode: "DamageGroup" });
  }

  async getDamages() {
    let itemOuts = await this.getItemOuts();
    
    return itemOuts;
  }
}

module.exports = DamageGroup;
