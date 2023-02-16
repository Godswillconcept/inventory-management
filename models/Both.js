const Maintenance = require("./Maintenance");

class Both extends Maintenance {
  constructor(props = {}) {
    super({ ...props, mode: "Both" });
  }

  static async query(sql, params = []) {
    await super.query(sql, params);
  }
}

module.exports = Both;
