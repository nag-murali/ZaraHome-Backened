const express = require("express");
const ejs = require("ejs");
const productController = require("./controllers/product.controller");
const addressController = require("./controllers/address.controller");
const cartController = require("./controllers/cart.controller");

const registerController= require("./controllers/auth.controller");




const app = express();
app.use(express.json());

app.use(express.static("public"));

app.set("viewengine", "ejs");

app.get("/", (req, res) => {
    res.render("home_page/home.ejs")
})

app.get("/products_page", (req, res) => {
    res.render("products_page/products.ejs")
})

app.get("/items_page", (req, res) => {
    res.render("items_page/items.ejs")
})

app.get("/cart_page", (req, res) => {
    res.render("cart_page/cart.ejs") 
})
app.get("/story_page", (req, res) => {
    res.render("story_page/story.ejs") 
})
app.get("/checkout_page", (req, res) => {

    res.render("check_pay_summary/checkoutpage/checkout.ejs") 
})

app.get("/paymentpage", (req, res) => {
    res.render("check_pay_summary/paymentpages/payment.ejs") 
})

app.get("/summerypage", (req, res) => {
    res.render("check_pay_summary/summerypages/summery.ejs") 
})

app.get("/thankyoupage", (req, res) => {
    res.render("thankyoupage/thanks.ejs") 
})
app.use("/products", productController);
app.use("/address", addressController);
app.use("/home",registerController);
app.use("/carts", cartController);


module.exports = app;