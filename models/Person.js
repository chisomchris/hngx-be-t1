const mongoose = require("mongoose");
mongoose.ObjectId.get((v) => v.toString());
const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    about: { type: String },
    hobbies: { type: String },
  },
  {
    virtuals: {
      id: {
        get() {
          return this._id;
        },
      },
    },
  }
);

module.exports = mongoose.model("Person", personSchema);
