const mongo = require("mongoose");
const type1Schema = new mongo.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});
const type1 = mongo.model("type1", type1Schema);
module.exports = type1;
