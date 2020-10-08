const mongoose = require("mongoose");

var Liste = mongoose.model("Liste", {
  name: { type: String },
  status: { type: String },
});

module.exports = { Liste };
