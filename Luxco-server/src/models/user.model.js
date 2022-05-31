const mongoose = require("mongoose");
const auto = require("mongoose-auto-increment");
const userSchema = mongoose.Schema({
  id: Number,
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now() },
  deliver_infos: [
    {
      _id: false,
      name: { type: String, required: [true, "This field is required"] },
      phone: { type: String, required: [true, "This field is required"] },
      street_address: {
        type: String,
        required: [true, "This field is required"],
      },
      city: { type: String, required: [true, "This field is required"] },
      state: { type: String, required: [true, "This field is required"] },
      country: { type: String, required: [true, "This field is required"] },
    },
  ],
  email: {
    type: String,
    required: [true, "This field is required"],
    unique: true,
  },
  first_name: { type: String, required: [true, "This field is required"] },
  middle_name: { type: String, required: [true, "This field is required"] },
  last_name: { type: String, required: [true, "This field is required"] },
  phone: { type: String, required: [true, "This field is required"] },
  password: { type: String, required: [true, "This field is required"] },
  payment_infos: [],
  cart_items: [
    {
      _id: false,
      product_id: { type: Number, unique: true },
    },
  ],
  is_banned: { type: Boolean, default: false },
});
auto.initialize(mongoose.connection);
userSchema.plugin(auto.plugin, {
  model: "User",
  field: "id",
  startAt: 51,
  incrementBy: 1,
});
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
