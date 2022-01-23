// let u_id = "61ea74acf936c55301d7c7b5";

var u_id = JSON.parse( localStorage.getItem("userId") );
console.log(u_id)
let item;
let cart;


// let y = JSON.parse(localStorage.getItem("BAG")) || [];

async function getData(items) {
    item = JSON.parse(items);

    let response = await fetch(`/carts/${u_id}`);
    cart = await response.json();

    // let x = localStorage.setItem("itemArr", JSON.stringify(item)));
    // let y =localStorage.setItem("BAG", JSON.stringify(cart)));
    console.log(item);
    totalfunc(item, cart);
}


function totalfunc(item, cart) {
    console.log(cart);
    // *************left part****************
    var arr1 = item.img;
    var arr2 = item.r_img;

    var item_left_container = document.getElementById("item_left_container");

    for (var i = 0; i < arr1.length; i++) {
        var image = document.createElement("img");
        image.src = arr1[i];
        item_left_container.append(image);
    }


    // *************right part***************
    let item_title = document.getElementById("item_title");
    let item_price = document.getElementById("item_price");
    let item_ref = document.getElementById("item_ref");
    let item_desc = document.getElementById("item_desc");

    item_title.textContent = item.name;
    item_price.textContent = `${item.price} €`;
    item_ref.textContent = item.ref;
    item_desc.textContent = item.desc;


    let size_price_low = document.querySelectorAll(".size_price_low");
    size_price_low.forEach(element => {
        element.textContent = `${item.sPrice} €`;
    });
    let size_price_high = document.querySelectorAll(".size_price_high");
    size_price_high.forEach(element => {
        element.textContent = `${item.dPrice} €`;
    });

    // ****TWO IMAGES IN BOTTOM ****
    var img1 = document.getElementById("img1");

    var image1 = document.createElement("img");
    image1.src = arr2[0];

    var name1 = document.createElement("p");

    name1.innerText = "(180 THREAD COUNT) COTTON PERCAL";

    var price1 = document.createElement("p");
    price1.innerHTML = `${item.r_price[0]} €`

    img1.append(image1, name1, price1);

    if (arr2.length === 2) {
        var image2 = document.createElement("img");
        image2.src = arr2[1];

        var name2 = document.createElement("p");
        name2.innerText = "(180 THREAD COUNT) COTTON PERCAL";

        var price2 = document.createElement("p");
        price2.innerHTML = `${item.r_price[1]} €`

        img2.append(image2, name2, price2);
    }

    // ****update btn and filling section****
    let add_to_basket_btn = document.getElementById("addToBasket");
    let filling_div = document.getElementById("filling");
    let doable = document.getElementsByClassName("doable");
    for (let i = 0; i < doable.length; i++) {
        doable[i].addEventListener("click", function () {
            updateContainer(item.sPrice);
        });
    }
    function updateContainer(price) {
        add_to_basket_btn.innerHTML = `ADD TO BASKET (${price}) &#8364;`;
        filling_div.style.display = "block";
    }

    // **** on click add to basket buttton****
    let goToBasket_btn = document.getElementById("goToBasket");
    add_to_basket_btn.addEventListener("click", displayBtn)
    function displayBtn() {
        // if(add_to_basket_btn.textContent != )
        goToBasket_btn.style.display = "block";
        document.getElementById("addCart").style.right = "0px";
    }

    goToBasket_btn.addEventListener("click", function () {

        // console.log(x["count"]);
        // if (!x["count"]) {
        //     x["count"] = 1;
        // } else {
        //     x["count"]++;
        // }
        // localStorage.setItem("itemArr", JSON.stringify(x));
        // // adding to cart in local storage

        // y.push(x);
        // localStorage.setItem("BAG", JSON.stringify(y));
        let flag = false;
        for(let i=0; i<cart.length; i++) {
            if(cart[i].product_id === item._id) {
                flag = true;
                break;
            }
        }

        if (!flag) {
            async function posting() {
                let response = await fetch("/carts", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: u_id,
                        product_id: item._id,
                        count: 1
                    })
                });
                console.log(await response.json());
            }
            posting();
        } else {
            async function patching() {
                let response = await fetch(`/carts/${u_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                            product_id : item._id,
                    })
                });
                console.log(await response.json());
                
            }
            patching();
        }

        console.log(cart.length);
        window.location.href = `/cart_page`;
    })

    // side bar

    // function addRemove() {
    //     document.getElementById("addCart").style.right = "-400px";
    // }

    let item_product_details = document.getElementById("item_product_details");
    item_product_details.addEventListener("click", productDetalis);
    function productDetalis() {
        document.getElementById("proDetails").style.right = "0px";
    }

    let headerPro = document.querySelectorAll(".headerPro>i");
    headerPro[0].addEventListener("click", proRemove);
    function proRemove() {
        document.getElementById("proDetails").style.right = "-400px";
    }

    let item_shipping_returns = document.getElementById("item_shipping_returns");
    item_shipping_returns.addEventListener("click", deliveryRetun);
    function deliveryRetun() {
        document.getElementById("deliveryR").style.right = "0px";
    }

    headerPro[1].addEventListener("click", proDelivery);
    function proDelivery() {
        document.getElementById("deliveryR").style.right = "-400px";
    }


    // login
    let loginDisplay = localStorage.getItem("loginDisplay") || null;
    console.log(loginDisplay);
    if (loginDisplay !== null) {
        document.getElementById("modallogin").innerHTML = loginDisplay;
    }

    //BASKET
    let countItem = localStorage.getItem("countItem") || 0;
    document.getElementById("basketCount").innerText = countItem;


    //TITLE
    document.title = item.name;

}

let modallogin = document.getElementById("modallogin")

let username = JSON.parse(localStorage.getItem("username"));

modallogin.innerHTML = username;





