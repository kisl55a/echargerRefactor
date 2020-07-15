const express = require("express");
const router = express.Router();
const user = require("../models/usersModel");
const jwtStrategy = require("../middlewares/passportJWT");
const basicStrategy = require("../middlewares/passportBasic");
const jwt = require("jsonwebtoken");
const jwtSecretKey = require("../secretKey.json");

// Create tables

(async () => await user.createTableUsers())().catch((err) => console.log(err));
(async () => await user.createTableStations())().catch((err) =>
  console.log(err)
);
(async () => await user.createTableCharging())().catch((err) =>
  console.log(err)
);

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
    let userInfo;
    await user.getUserByName(req.user.username, {
      then: (rows) => (userInfo = rows),
      catch: (err) => console.log(err),
    });
    const response = {
      id: userInfo.idUser,
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
router.get(
  "/history/userHistory",
  jwtStrategy.authenticate("jwt", { session: false }),
  function (req, res, next) {
    user.history(req.user.id, {
      then: (rows) => {
        res.status(202).json({ code: 1, rows });
      },
      catch: (err) => {
        res.status(500).json({ code: 0, err });
      },
    });
  }
);

module.exports = router;
