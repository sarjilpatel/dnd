const mongoose = require("mongoose");

const charSchema = mongoose.Schema({
  character: {
    type: String,
    unique: [true, "Character already in use"],
  },
  value: {
    type: String,
  },
  isOperator: {
    type: Boolean,
  },
});

const Character = mongoose.model("Character", charSchema);
module.exports = Character;
