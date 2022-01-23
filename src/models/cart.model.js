const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: "product", required: true},
});

module.exports = mongoose.model("user", userSchema);