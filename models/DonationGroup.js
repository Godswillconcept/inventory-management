const ItemInGroup = require("./ItemInGroup");

class DonationGroup extends ItemInGroup {
  constructor(prop = {}) {
    super({ ...prop, mode: "DonationGroup"});
  }

  async getDonations() {
    let itemIns = await this.getItemIns();
    return itemIns;
  }
}
module.exports = DonationGroup;
