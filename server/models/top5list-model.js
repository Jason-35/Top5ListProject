const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Top5ListSchema = new Schema(
  {
    name: { type: String, required: true },
    items: { type: [String], required: true },
    ownerEmail: { type: String, required: true },
    published: { type: Boolean, required: true },
    userName: { type: String, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    //AlreadyLiked: {type: Boolean, required: true},
    //AlreadyDisliked: {type: Boolean, required: true}
  },
  { timestamps: true },
);

module.exports = mongoose.model("Top5List", Top5ListSchema);
