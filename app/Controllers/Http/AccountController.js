"use strict";

const Account = use("App/Models/Account");
const Database = use("Database");

class AccountController {
  async store({ request }) {
    const data = request.only(["login", "email", "password"]);
    const account = await Account.create(data);
    return account;
  }

  async show({ params, response }) {
    const login = new String(params.login).trim().split("=")[1];
    const account = await Account.find(login);
    return response.json(account);
  }

  async update({ request, response }) {
    let login = request.input("login");
    let oldPassword = request.input("oldPassword");
    let newPassword = request.input("newPassword");
    let account = await Account.find(login);

    if (account.password !== Account.hash_sha1(oldPassword)) {
      return response.json({ error: "A senha antiga não está correta." });
    } else if (account) {
      account.password = newPassword;
      await account.save();
    }
    return response.json(account);
  }

  async index() {
    return await Account.query().select("email").fetch();
  }
}

module.exports = AccountController;
