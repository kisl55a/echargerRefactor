var knex = require("../database/database");
const { data } = require("../database/data");

var station = {
  insertData: async function (callback) {
    let stationsInfo = await knex("stations").select();
    if (stationsInfo.length == 0) {
      await knex("stations")
        .insert(data)
        .then((res) => callback.then(res))
        .catch((err) => callback.catch(err));
    }
  },
  startCharging: async function (UUID, userId, callback) {
    let stationInfo = await knex("stations")
      .select("stationId", "measure", "isTaken")
      .where("UUID", UUID);
    if (stationInfo.length != 0 && stationInfo[0].isTaken == 0) {
      await knex("charging").insert({
        stationId: stationInfo[0].stationId,
        idUser: userId,
        timeOfStart: knex.raw("CURRENT_TIMESTAMP"),
        timeOfUsage: 0,
        measure: stationInfo[0].measure,
        energy: 0,
        cost: 0,
      });
      await knex("stations")
        .update("isTaken", 1)
        .where("stationId", stationInfo[0].stationId);
      return knex("charging")
        .max("idCharging", { as: "id" })
        .then((data) => callback.then(data))
        .catch((err) => callback.err(err));
    } else {
      callback.catch("The station is taken already");
    }
  },
  stopCharging: async function (idCharging, idUser, callback) {
    let station = await knex()
      .select("charging.stationId", "charging.idUser")
      .from("charging")
      .innerJoin("stations", "charging.stationId", "stations.stationId")
      .where("idCharging", idCharging);
    if (station[0].idUser == idUser) {
      return knex("stations")
        .update("isTaken", 0)
        .where("stationId", station[0].stationId)
        .then((data) => callback.then(data))
        .catch((err) => callback.catch(err));
    } else {
      callback.catch("userId is wrong");
    }
  },
  chargingProcess: async function (idCharging, callback) {
    let chargingInfo = await knex("charging")
      .select(
        "charging.idCharging",
        "stations.power",
        "charging.stationId",
        "stations.price",
        "stations.type",
        knex.raw(
          "TIMESTAMPDIFF(MINUTE, timeOfStart, CURRENT_TIMESTAMP()) as 'time'"
        )
      )
      .innerJoin("stations", "charging.stationId", "stations.stationId")
      .where("idCharging", idCharging);
    if (chargingInfo[0].type == "Fast") {
      let currentCost =
        (chargingInfo[0].time / 60) *
        chargingInfo[0].power *
        chargingInfo[0].price;
      await knex("charging")
        .update({
          cost: currentCost,
          timeOfUsage: chargingInfo[0].time,
          energy: (chargingInfo[0].time / 60) * chargingInfo[0].power,
        })
        .where("idCharging", idCharging);
    } else {
      let currentCost = chargingInfo[0].time * chargingInfo[0].price;
      await knex("charging")
        .update({
          cost: currentCost,
          timeOfUsage: chargingInfo[0].time,
          energy: (chargingInfo[0].time / 60) * chargingInfo[0].power,
        })
        .where("idCharging", idCharging);
    }
    return await knex("charging")
      .select("cost", "timeOfUsage", "energy")
      .where("idCharging", idCharging)
      .then((data) => callback.then(data))
      .catch((err) => callback.catch(err));
  },
};
module.exports = station;
