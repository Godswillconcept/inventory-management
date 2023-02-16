const Maintenance = require("./Maintenance");

class Repair extends Maintenance {
  constructor(props = {}) {
    super({ ...props, mode: "Repair" });
  }

  static async query(sql, params = []) {
    await super.query(sql, params);
  }
}

module.exports = Repair;
