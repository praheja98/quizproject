const mongoose = require("mongoose");

const moduleSchema = mongoose.Schema({
  moduleCode: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  public: {
    type: Boolean,
    default: false,
    require: true
  }
});

const Module = mongoose.model("Module", moduleSchema);
module.exports = Module;
