const Model = require("./Model");

class Maintenance extends Model {
  constructor(obj = {}) {
    super(obj);
  }

  static get tableName() {
    return "maintenances";
  }

  static get classField() {
    return `mode = '${this.name}`;
  }
}

module.exports = Maintenance;
