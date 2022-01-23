const express = require("express");
const Product = require("../models/product.model");
const ejs = require("ejs");

const router = express.Router();

router.post("", async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).send({ data: product });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

router.get("", async(req, res) => {
    try {
        const products = await Product.find().lean().exec();
        res.status(200).send( products );
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

router.get("/:id", async(req, res) => {

    try {
        const product = await Product.findById(req.params.id).lean().exec();
        
        
        // res.render("items_page/items.ejs", {item: product});
       return  res.send( product );
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

module.exports = router;