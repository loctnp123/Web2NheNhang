const model = require("../models/order.model");
class OrderController {
  getAllOrders(req, res, next) {
    model
      .find({})
      .then((data) => res.status(200).send(data))
      .catch(next);
  }
  getOrdersByUserId(req, res, next) {
    model.find({user_id:req.params.id}).then((data) => res.status(200).send(data)).catch(next);
  }
  getOrderById(req, res, next) {
    model.findOne({id:req.params.id}).then((data) => res.status(200).send(data)).catch(next);
  }
  deleteOrderById(req, res, next) {
    model
      .findOneAndDelete({id:req.params.id})
      .then((dt) => res.json({ message: "success" }))
      .catch(next);
  }
  updateOrderById(req, res, next) {
    model
      .findOneAndUpdate({id:req.params.id}, {
        $set: req.params,
      })
      .then((dt) => {
        res.json({ message: "success" });
      })
      .catch(next);
  }

  createOrder(req,res,next){
      (new model({
          user_id:req.params.id,
          delivery_info:req.body.delivery_info,
          products:req.body.products,
          init_price:req.body.init_price,
          total:req.body.total
      })).save()
        .then(dt=>res.status(200).json({message:'success'}))
        .catch(next)
  }
  deleteAll(req,res,next){
    model.deleteMany()
    .then(dt=>res.status(200).json({message:'success'}))
        .catch(next)
  }
}
module.exports = new OrderController();
