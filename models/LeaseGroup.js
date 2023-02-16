const ItemOutGroup = require("./ItemOutGroup");
const User = require("./User");

class LeaseGroup extends ItemOutGroup {
  constructor(props = {}) {
    super({ ...props, mode: "LeaseGroup" });
  }

  async getLeases() {
    let itemOuts = await this.getItemOuts();
    
    return itemOuts;
  }
}

module.exports = LeaseGroup;
