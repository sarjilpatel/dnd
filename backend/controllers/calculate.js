const Character = require("../models/characterModel");

const evaluate = async (str) => {
  let newStr = "";

  for (let index = 0; index < str.length; index++) {
    const c = str[index];
    const char = await Character.findOne({ character: c });
    if (char) {
      newStr += char.value;
    }
  }
  console.log(newStr);
  return eval(newStr);
};

exports.calculate = async (req, res) => {
  try {
    const { str } = req.body;
    console.log(str);

    let strArr = [];
    let operator = "";
    let ans = false;

    if (str.includes(">")) {
      strArr = str.split(">");
      operator = ">";
    } else if (str.includes("<")) {
      strArr = str.split("<");
      operator = "<";
    } else if (str.includes("=")) {
      strArr = str.split("=");
      operator = "=";
    }

    const ans1 = evaluate(strArr[0]);
    console.log(operator);
    const ans2 = evaluate(strArr[1]);

    if (operator == ">") {
      ans = ans1 > ans2;
    } else if (operator == "<") {
      ans = ans1 < ans2;
    } else if (operator == "=") {
      ans = ans1 == ans2;
    }

    res.status(200).json({
      success: true,
      ans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.postCharacter = async (req, res) => {
  try {
    const { character, value, isOperator } = req.body;

    let char = await Character.findOne({ character });
    if (char) {
      return res
        .status(400)
        .json({ success: false, message: "Character already exists" });
    }

    char = await Character.create({
      character,
      value,
      isOperator,
    });
    res.status(201).json({
      success: true,
      char,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCharacters = async (req, res) => {
  try {
    let chars = await Character.find({ isOperator: false });

    res.status(201).json({
      success: true,
      chars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllOperators = async (req, res) => {
  try {
    let ops = await Character.find({ isOperator: true });

    res.status(201).json({
      success: true,
      ops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
