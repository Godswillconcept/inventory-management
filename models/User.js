const Model = require("./Model");

class User extends Model {
    get name() {
      return `${this.first_name} ${this.last_name}`;
    }

  get age() {
    return Math.floor((new Date() - this.dob) / (1000 * 60 * 60 * 24 * 365.25));
  }
}

module.exports = User;
