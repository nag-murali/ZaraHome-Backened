const mongoose = require("mongoose");

    const addressSchema = new mongoose.Schema({
           delivery_ads: {type: Object, required: false, default: null},
           billing_ads: {type: Object, required: false, default: null},
        //    user_id : {type: String, required: true}
           user_id: { type: mongoose.Schema.Types.ObjectId,
                       ref: "user",
                      required: true    }
     
    },{
        versionKey: false,
        timestamps: true
    });

    const Address = new mongoose.model("address", addressSchema);
    
    module.exports = Address;