const express = require("express");
const Cart = require("../models/cart.model")

const router = express.Router();

router.post("", async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        return res.status(201).send(cart);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});


router.get("/:u_id", async (req, res) => {
    try {
        const cart = await Cart.find({ user_id: req.params.u_id }).populate('product_id').lean().exec();
        return res.status(201).send(cart);
    } catch (err) {
        return res.status(500).send({ err: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        return res.status(201).send(cart);
    } catch (err) {
        return res.status(500).send({ err: err.message });
    }
});


router.patch("/:u_id", async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate( {
            $and: [
               { user_id: { $eq:  req.params.u_id} },
               { $product_id: { $eq: req.body.product_id } }
            ]
         }, { $inc: { count: 1} });
        res.status(201).send(cart);
    } catch (err) {
        res.send(500).send({ err: err.message });
    }
});


router.patch("/dec/:u_id", async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate( {
            $and: [
               { user_id: { $eq:  req.params.u_id} },
               { $product_id: { $eq: req.body.product_id } }
            ]
         }, { $inc: { count: -1} });
        res.status(201).send(cart);
    } catch (err) {
        res.send(500).send({ err: err.message });
    }
});




module.exports = router;

