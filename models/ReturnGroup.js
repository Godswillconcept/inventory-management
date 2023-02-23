const ItemInGroup = require("./ItemInGroup");

class ReturnGroup extends ItemInGroup {
  constructor(prop = {}) {
    super({ ...prop, mode: "ReturnGroup" });
  }

  async getReturns() {
    let itemIns = await this.getItemIns();
    return itemIns;
  }
}
module.exports = ReturnGroup;
