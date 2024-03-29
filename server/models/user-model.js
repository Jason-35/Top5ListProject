const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
