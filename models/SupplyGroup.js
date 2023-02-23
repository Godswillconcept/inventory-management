const ItemInGroup = require("./ItemInGroup");


class SupplyGroup extends ItemInGroup {
  constructor(props = {}) {
    super({ ...props, mode: "SupplyGroup" });
  }

  async getSupplies() {
    let itemIns = await this.getItemIns();
    
    return itemIns;
  }
}

module.exports = SupplyGroup;
