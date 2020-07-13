var express = require("express");
var router = express.Router();
let station = require("../models/stationsModel");
const jwtStrategy = require("../middlewares/passportJWT");

// Create tables

router.get("/getAllStations", function (req, res, next) {
  station.getAllStations({
    then: (rows) => {
      res.status(202).json({ code: 1, rows });
    },
    catch: (err) => {
      res.status(500).json({ code: 1, err });
    },
  });
});

router.post("/insertData", function (req, res, next) {
  station.insertData({
    then: (rows) => {
      res.status(202).json({ code: 1, rows });
    },
    catch: (err) => {
      res.status(202).json({ code: 1, err });
    },
  });
});

router.post(
  "/startCharging/:UUID",
  jwtStrategy.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.params.UUID) {
      station.startCharging(req.params.UUID, req.user.id, {
        then: (rows) => {
          res.status(202).json({ code: 1, rows });
        },
        catch: (err) => {
          res.status(500).json({ code: 0, err });
        },
      });
    } else {
      res.status(500).json({ code: 0, message: "Not valid UUID" });
    }
  }
);

router.put(
  "/stopCharging/:idCharging",
  jwtStrategy.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.params.idCharging) {
      station.stopCharging(req.params.idCharging, req.user.id, {
        then: (rows) => {
          res.status(202).json({ code: 1, rows });
        },
        catch: (err) => {
          res.status(500).json({ code: 0, err });
        },
      });
    } else {
      res.status(500).json({ code: 0, message: "Not valid idCharging" });
    }
  }
);

router.put(
  "/chargingProcess/:idCharging",
  jwtStrategy.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.params.idCharging) {
      station.chargingProcess(req.params.idCharging, {
        then: (rows) => {
          res.status(202).json({ code: 1, rows });
        },
        catch: (err) => {
          res.status(500).json({ code: 0, err });
        },
      });
    } else {
      res.status(500).json({ code: 0, message: "Not valid idCharging" });
    }
  }
);

module.exports = router;
