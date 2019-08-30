"use strict";

const GrandBoss = use("App/Models/GrandbossDatum");

class GrandbossDatumController {
  async index() {
    const grandbosses = await GrandBoss.query()
      .select("boss_id", "status")
      .fetch();

    return grandbosses;
  }
}

module.exports = GrandbossDatumController;
