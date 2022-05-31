const mongoose = require("mongoose");
const auto = require("mongoose-auto-increment");
const orderSchema = mongoose.Schema({
  id: Number,
  user_id: Number,
  products: [
    {
      _id: false,
      product_id: Number,
      product_price: Number,
      quantity: {type:Number,default:1},
    },
  ],
  delivery_info: {
    name: String,
    phone: String,
    street_address: String,
    city: String,
    state: String,
    country: String,
  },
  coupons: [],
  init_price: Number,
  total: Number,
  order_date: { type: Date, default: Date.now() },
  delivery_status: {
    type: [
      {
        _id: false,
        code: Number,
        description: String,
        updated_date: { type: Date, default: Date.now() },
      },
    ],
    default: [
      {
        code: 0,
        description: "Waiting for confirmation",
      },
    ],
  },
  paid: { type: Boolean, default: false },
  method: {
    type: String,
    default: "cod",
    required: [true, "This field is required"],
  },
});
auto.initialize(mongoose.connection);
orderSchema.plugin(auto.plugin, {
  model: "Order",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});
const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
