const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    count: { type: Number, required: false, default: 1 }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("cart", cartSchema);