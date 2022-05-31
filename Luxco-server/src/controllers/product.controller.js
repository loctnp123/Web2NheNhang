const { default: mongoose } = require("mongoose");
const model = require("../models/product.model");
class ProductController {
  getAllProducts(req, res, next) {
    model
      .find({})
      .then((data) => res.status(200).send(data))
      .catch(next);
  }
  getProducts(req,res,next){
    var ids = req.body.map(e => new Number(e.product_id))
    model
      .find({id:{$in:ids}})
      .then((data) => res.status(200).send(data))
      .catch(next);
  }
  getCategoryCount(req, res, next) {
    model
      .aggregate([
        {
          $group: {
            _id: "$category_id",
            count: { $sum: 1 },
          },
        },
      ])
      .then((data) => res.status(200).send(data))
      .catch(next);
  }
  getProductById(req, res, next) {
    model.findOne({id:req.params.id}).then((data) => res.status(200).send(data));
  }
  addProduct(req, res, next) {
    new model(req.body)
      .save()
      .then((dt) => res.json({ message: "success" }))
      .catch(next);
  }
  deleteProductById(req, res, next) {
    model
      .findOneAndDelete({id:req.params.id})
      .then((dt) => res.json({ message: "success" }))
      .catch(next);
  }
  updateProductById(req, res, next) {
    console.log(req.body)
    model
      .findOneAndUpdate({id:req.params.id}, {
        
        $set: req.body,
      })
      .then((dt) => {
        res.json({ message: "success" });
      })
      .catch(next);
  }
}
module.exports = new ProductController();
