"use strict";

const Database = use("Database");
const Character = use("App/Models/Character");

class CharacterController {
  async index({ params }) {
    let filter = new String(params.filter).trim().split("=")[1];

    if (filter == "players_online") {
      return await Database.select(
        "char_name",
        "level",
        "fame",
        "pvpkills",
        "pkkills",
        "clanid",
        "race",
        "base_class",
        "onlinetime"
      )
        .from("characters")
        .where("online", "=", "1");
    } else if (filter == "total_players") {
      return await Character.query().select("char_name", "level").fetch();
    } else {
      let direction = "desc";
      let column = "pvpkills";

      if (filter == "top_pk") column = "pkkills";
      else if (filter == "top_online") column = "onlinetime";

      return await Database.select(
        "char_name",
        "level",
        "fame",
        "online",
        "pvpkills",
        "pkkills",
        "clanid",
        "race",
        "base_class",
        "onlinetime"
      )
        .from("characters")
        .limit(10)
        .orderBy(column, direction);
    }
  }
}

module.exports = CharacterController;
