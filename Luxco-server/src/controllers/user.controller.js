const model = require("../models/user.model");
class UserController {
  getAllUsers(req, res, next) {
    model
      .find({})
      .then((data) => res.status(200).send(data))
      .catch(next);
  }
  getUserById(req, res, next) {
    model
      .findOne({ id: req.params.id })
      .then((data) => res.status(200).send(data));
  }
  async authenticate(req, res, next) {
    // console.log(req.body);
    const { email, password } = req.body;
    if (email == null || password == null) {
      // console.log(email, password);
      next({
        message: "You must input username and password",
      });
      return;
    }
    var user;
    await model
      .findOne({
        email: email,
        password: password,
      })
      .then((dt) => (user = dt))
      .catch(next);
    if (!user) next({ message: "Email or password is incorrect" });
    else if (user.is_banned)
      next({
        message: "The user has been banned due to some reasons",
      });
    else {
      res.status(200).send({
        success: true,
        data: user,
        token: "fake-jwt-token",
      });
    }
  }
  async register(req, res, next) {
    var user;
    await model
      .findOne({ email: req.body.email })
      .then((dt) => (user = dt))
      .catch(next);
    if (user) {
      //   console.log(user);
      res.status(400).json({ message: "This email has been used" });
      // return new Error('This email or phone number has been used')
      // return
    } else {
      new model(req.body)
        .save()
        .then((dt) =>
          res.status(200).json({ success: true, status: "success" })
        )
        .catch(next);
    }
  }
  ban(req, res, next) {
    model
      .findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            is_banned: true,
          },
        }
      )
      .then((dt) => res.status(200).json({ success: true, status: "success" }))
      .catch(next);
  }
  unban(req, res, next) {
    model
      .findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            is_banned: false,
          },
        }
      )
      .then((dt) => res.status(200).json({ success: true, status: "success" }))
      .catch(next);
  }
  deleteUserById(req, res, next) {
    model
      .findOneAndDelete({ id: req.params.id })
      .then((dt) => res.json({ message: "success" }))
      .catch(next);
  }
  updateUserById(req, res, next) {
    model
      .findOneAndUpdate(
        { id: req.params.id },
        {
          $set: req.params,
        }
      )
      .then((dt) => {
        res.json({ message: "success" });
      })
      .catch(next);
  }

  addCartItem(req, res, next) {
    model
      .findOneAndUpdate(
        { id: req.params.id },
        {
          $addToSet: {
            cart_items: {
              product_id: req.body.product_id,
            },
          },
        }
      )
      .then((dt) => {
        res.json({ message: "success" });
      })
      .catch(next);
  }
  removeCartItem(req, res, next) {
    // console.log(req.params.id, req.params.product_id);
    model
      .findOneAndUpdate(
        { id: req.params.id },
        {
          $pull: {
            cart_items: { product_id: req.body.product_id },
          },
        }
      )
      .then((dt) => {
        res.json({ message: "success" });
      })
      .catch(next);
  }
  getCartByUserId(req, res, next) {
    model
      .findOne({ id: req.params.id })
      .then((dt) => res.status(200).json(dt.cart_items))
      .catch(next);
  }

  addDelInfo(req, res, next) {
    model
      .findOneAndUpdate(
        { id: req.params.id },
        {
          $addToSet: {
            deliver_infos: req.body,
          },
        }
      )
      .then((dt) => {
        res.json({ message: "success" });
      })
      .catch(next);
  }
  deleteDelInfo(req, res, next) {
    model
      .findOneAndUpdate(
        { id: req.params.id },
        {
          $set: { deliver_infos: [] },
        }
      )
      .then((dt) => {
        res.json({ message: "success" });
      })
      .catch(next);
  }
  removeCartItems(req, res, next) {
    var ids = req.body.map((e) => new Number(e.product_id));
    console.log(ids);
    model
      .findOneAndUpdate(
        { id: req.params.id },
        { $pull: { cart_items: { product_id: { $in: ids } } } }
      )
      .then((dt) => res.status(200).json({ message: "success" }))
      .catch(next);
  }
}
module.exports = new UserController();
