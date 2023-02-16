const Maintenance = require("./Maintenance");

class Replacement extends Maintenance {
  constructor(props = {}) {
    super({ ...props, mode: "Replacement" });
  }

   
}

module.exports = Replacement;
