const ItemOutGroup = require("./ItemOutGroup");


class SaleGroup extends ItemOutGroup {
  constructor(props = {}) {
    super({ ...props, mode: "SaleGroup" });
  }

  async getSales() {
    let itemOuts = await this.getItemOuts();
    
    return itemOuts;
  }
}

module.exports = SaleGroup;
