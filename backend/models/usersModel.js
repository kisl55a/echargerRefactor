const knex = require("../database/database");
const passwordHash = require("password-hash");
const user = {
  createTableUsers: async () => {
    await knex.schema
      .hasTable("users")
      .then(function (exists) {
        if (!exists) {
          return knex.schema.createTable("users", function (t) {
            t.increments("idUser").primary();
            t.string("username", 255).unique();
            t.string("email", 255);
            t.string("password", 255);
          });
        } else {
          return null;
        }
      })
      .catch((err) => console.log(err));
  },
  createTableCharging: async () => {
    await knex.schema.hasTable("charging").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("charging", function (t) {
          t.increments("idCharging").primary();
          t.integer("idUser", 10)
            .unsigned()
            .notNullable()
            .references("idUser")
            .inTable("users");
          t.integer("stationId", 10)
            .unsigned()
            .notNullable()
            .references("stationId")
            .inTable("stations");
          t.dateTime("timeOfStart").notNullable();
          t.integer("timeOfUsage", 10).notNullable();
          t.float("cost", 10, 3).notNullable();
          t.float("energy", 10, 3).notNullable();
          t.string("measure").notNullable();
        });
      } else {
        return null;
      }
    });
  },
  createTableStations: async () => {
    await knex.schema
      .hasTable("stations")
      .then(function (exists) {
        if (!exists) {
          return knex.schema.createTable("stations", function (t) {
            t.increments("stationId").primary();
            t.string("stationName", 100).notNullable();
            t.string("address", 100).notNullable();
            t.float("lat", 50, 5).notNullable();
            t.float("lng", 50, 5).notNullable();
            t.string("type", 40).notNullable();
            t.float("power", 10, 5).notNullable();
            t.float("price", 10, 3).notNullable();
            t.string("measure", 10).notNullable();
            t.boolean("isTaken").defaultTo(false);
            t.string("UUID", 4).notNullable();
          });
        } else {
          return null;
        }
      })
      .catch((err) => console.log(err));
  },
  getUserByName: async function (username, callback) {
    return knex
      .from("users")
      .select("*")
      .where("username", username)
      .then((data) => {
        callback.then(data[0]);
      })
      .catch((err) => {
        callback.catch(err);
      });
  },

  getById: async function (id, callback) {
    return knex
      .from("users")
      .select()
      .where("idUser", id)
      .then((data) => {
        callback.then(data);
      })
      .catch((err) => {
        callback.catch(err);
      });
  },

  add: async function (user, callback) {
    let hashedPassword = await passwordHash.generate(user.password);
    return knex("users")
      .insert([{ ...user, password: hashedPassword }])
      .then((data) => {
        callback.then(data);
      })
      .catch((err) => {
        callback.catch(err);
        console.log(err);
      });
  },

  history: async function (idUser, callback) {
    return knex()
      .select(
        "charging.idCharging",
        "charging.timeOfUsage",
        "stations.type",
        "charging.energy",
        "charging.timeOfStart",
        "stations.UUID",
        "charging.cost"
      )
      .from("charging")
      .innerJoin("stations", "charging.stationId", "stations.stationId")
      .where("idUser", idUser)
      .then((data) => callback.then(data))
      .catch((err) => callback.catch(err));
  },
};
module.exports = user;
