const ItemOutGroup = require("./ItemOutGroup");
const User = require("./User");

class ConsumptionGroup extends ItemOutGroup {
  constructor(props = {}) {
    super({ ...props, mode: "ConsumptionGroup" });
  }

  async getConsumptions() {
    let itemOuts = await this.getItemOuts();
    
    return itemOuts;
  }
}

module.exports = ConsumptionGroup;
