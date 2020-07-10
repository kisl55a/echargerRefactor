var express = require("express");
var router = express.Router();
var user = require("../models/usersModel");
const jwtStrategy = require("../middlewares/passportJWT");
const basicStrategy = require("../middlewares/passportBasic");
const jwt = require("jsonwebtoken");
const jwtSecretKey = require("../secretKey.json");

// Create tables

user
  .createTableUsers()
  .then(user.createTableStations().then(user.createTableCharging()));

router.get("/:id?", function (req, res, next) {
  if (req.params.id) {
    user.getById(req.params.id, {
      then: (rows) => {
        res.status(202).json({ code: 1, rows });
      },
      catch: (err) => {
        res.status(500).json({ code: 0, err });
      },
    });
  } else {
    user.get({
      then: (rows) => {
        res.status(202).json({ code: 1, rows });
      },
      catch: (err) => {
        res.status(500).json({ code: 0, err });
      },
    });
  }
});

router.post("/register", function (req, res) {
  user.add(req.body, {
    then: (rows) => {
      res.status(202).json({ code: 1, rows });
    },
    catch: (err) => {
      res.status(500).json({ code: 0, err });
    },
  });
});

router.post(
  "/login",
  basicStrategy.authenticate("basic", { session: false }),
  async function (req, res, next) {
    const response = {
      id: req.user.id,
      username: req.user.username,
    };
    const payload = {
      user: response,
    };
    const options = {
      expiresIn: "36w",
    };
    const token = jwt.sign(payload, jwtSecretKey.secret, options);
    return res.json({ token });
  }
);

router.delete("/:id", function (req, res, next) {
  user.delete(req.params.id, {
    then: (rows) => {
      res.status(202).json({ code: 1, rows });
    },
    catch: (err) => {
      res.status(500).json({ code: 0, err });
    },
  });
});
router.put("/:id", function (req, res, next) {
  user.update(req.params.id, req.body, {
    then: (rows) => {
      res.status(202).json({ code: 1, rows });
    },
    catch: (err) => {
      res.status(500).json({ code: 0, err });
    },
  });
});

module.exports = router;
