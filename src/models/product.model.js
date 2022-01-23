const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: {type: Number, required: true},
    ref: { type: String, required: true },
    desc: { type: String, required: true },
    sPrice: {type: Number, required: true},
    dPrice: {type: Number, required: true},
    main_img: { type: String, required: true },
    img: [{ type: String, required: true }],
    r_img: [{ type: String, required: true }],
    r_price: [{type: Number, required: true}]
});

module.exports = mongoose.model("product", productSchema);