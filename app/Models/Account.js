"use strict";

const Model = use("Model");
const crypto = require("crypto");

class Account extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async accountInstance => {
      if (accountInstance.dirty.password) {
        accountInstance.password = Account.hash_sha1(accountInstance.password);
      }
    });
  }

  static hash_sha1(password) {
    const hash = crypto.createHash("sha1");
    let data = hash.update(password, "utf-8");
    return data.digest("base64");
  }

  static get primaryKey() {
    return "login"; 
  }

  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }
}

module.exports = Account;
