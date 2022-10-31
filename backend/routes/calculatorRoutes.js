const express = require("express");
const {
  calculate,
  postCharacter,
  getAllCharacters,
  getAllOperators,
} = require("../controllers/calculate");

const router = express.Router();

router.route("/calculate").post(calculate);
router.route("/post/character").post(postCharacter);
router.route("/characters").get(getAllCharacters);
router.route("/operators").get(getAllOperators);

module.exports = router;
