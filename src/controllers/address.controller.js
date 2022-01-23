const express = require("express");
const router = express.Router();
const Address = require("../models/address.model.js")


router.get("/:id", async(req, res) => {
    try {
        const address = await Address.findOne({user_id: req.params.id}).lean().exec();
     
        if(address){
            return res.status(200).send( {address: address, success: true} );
        }
            return  res.status(200).send( {address: "Empty", success: false});
        
        
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

router.post("", async(req, res) => {
    console.log("in post ")
    console.log(req.body)
    try {
        const address = await Address.create(req.body);
        res.status(201).send({ data: address });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

router.patch("/del/:id", async(req, res) => {
    console.log("in patch del")
    try {
        const address = await Address.findOneAndUpdate(
            { user_id: req.params.id },
          { $set: { delivery_ads: req.body.delivery_ads } },
           
           )
        
  
            return res.status(201).send( address );
         
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

router.patch("/bil/:id", async(req, res) => {
    console.log("bl in patch")
    try {
        const address = await Address.findOneAndUpdate(
             { user_id: req.params.id },
           { $set: { billing_ads: req.body.billing_ads } },
            
            )
        
  
            return res.status(201).send( address );
         
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

module.exports = router;