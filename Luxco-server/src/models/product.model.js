const auto = require("mongoose-auto-increment");
const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  id: Number,
  brand: String,
  images: [],
  title: { type: String, required: [true, "This field is required"] },
  price: { type: Number, required: [true, "This field is required"] },
  current_price: { type: Number, required: [true, "This field is required"] },
  thumbnail: String,
  description: String,
  category_id: Number,
  tags: [],
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  view: Number,
  stock: { type: Number, required: [true, "This field is required"] },
  sold: Number,
  comments: [
    {
      user_id: Number,
      content: String,
      images: [],
      comment_date: Date,
    },
  ],
});
auto.initialize(mongoose.connection);
productSchema.plugin(auto.plugin, {
  model: "Product",
  field: "id",
  startAt: 100,
  incrementBy: 1,
});
const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
