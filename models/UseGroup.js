const ItemOutGroup = require("./ItemOutGroup");
const User = require("./User");

class UseGroup extends ItemOutGroup {
  constructor(props = {}) {
    super({ ...props, mode: "UseGroup" });
  }

  async getUses() {
    let itemOuts = await this.getItemOuts();
    
    return itemOuts;
  }
}

module.exports = UseGroup;
